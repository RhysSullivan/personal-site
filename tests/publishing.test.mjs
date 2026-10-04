import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkProductionSource } from '../scripts/check-production-source.mjs';
import { photoRoutes, assertPreserved, checkGallery } from '../scripts/check-gallery.mjs';

const sha = 'a'.repeat(40);
const production = { VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'main', VERCEL_GIT_COMMIT_SHA: sha };
const main = async () => Response.json({ object: { sha } });

test('production rejects a photo branch, absent metadata, and a stale main revision', async () => {
  await assert.rejects(checkProductionSource({ ...production, VERCEL_GIT_COMMIT_REF: 'photos' }, main));
  await assert.rejects(checkProductionSource({ VERCEL_ENV: 'production' }, main));
  await assert.rejects(checkProductionSource({ ...production, VERCEL_GIT_COMMIT_SHA: 'b'.repeat(40) }, main));
});
test('current main passes; previews do not require production metadata', async () => {
  await checkProductionSource(production, main);
  await checkProductionSource({ VERCEL_ENV: 'preview' }, () => { throw Error('unexpected request'); });
});
test('unverifiable production source fails closed', async () => {
  await assert.rejects(checkProductionSource(production, async () => new Response('', { status: 503 })));
  await assert.rejects(checkProductionSource(production, async () => { throw Error('offline'); }));
});
test('new feature deployment cannot drop a live photo; additions pass', () => {
  const before = photoRoutes('<a href="/photos/wizard/"><a href="/photos/owl"><a href="/photos/rss.xml">');
  assert.throws(() => assertPreserved(before, photoRoutes('<a href="/photos/owl">')), /wizard/);
  assertPreserved(before, photoRoutes('<a href="/photos/wizard"><a href="/photos/owl"><a href="/photos/moon">'));
  assert.throws(() => photoRoutes('<h1>Unavailable</h1>'), /no photo links/);
});
test('built gallery verifies pages and assets and rejects missing output or unreadable baseline', async () => {
  const root = await mkdtemp(join(tmpdir(), 'gallery-check-'));
  try {
    await mkdir(join(root, 'photos/wizard'), { recursive: true });
    await mkdir(join(root, '_astro'));
    await writeFile(join(root, 'photos/index.html'), '<a href="/photos/wizard">Wizard</a>');
    const live = async () => new Response('<a href="/photos/wizard">Wizard</a>');
    await assert.rejects(checkGallery(root, live), /ENOENT/);
    await writeFile(join(root, 'photos/wizard/index.html'), '<img src="/_astro/wizard.png">');
    await assert.rejects(checkGallery(root, live), /ENOENT/);
    await writeFile(join(root, '_astro/wizard.png'), 'test asset');
    await checkGallery(root, live);
    await assert.rejects(checkGallery(root, async () => new Response('', { status: 503 })), /503/);
    await assert.rejects(checkGallery(root, async () => new Response('<h1>Maintenance</h1>')), /no photo links/);
    await assert.rejects(checkGallery(root, async () => { throw Error('offline'); }), /offline/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
