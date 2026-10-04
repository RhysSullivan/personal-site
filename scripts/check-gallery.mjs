import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function photoRoutes(html) {
  const routes = new Set();
  for (const match of html.matchAll(/href=["'](\/photos\/[^"'?#]+)["']/g)) {
    const route = match[1].replace(/\/$/, '');
    if (/^\/photos\/[a-z0-9-]+$/.test(route)) routes.add(route);
  }
  if (routes.size === 0) throw new Error('Gallery contains no photo links; refusing to treat it as an empty baseline.');
  return routes;
}

export function assertPreserved(previous, next) {
  const missing = [...previous].filter(route => !next.has(route));
  if (missing.length) throw new Error(`Build would remove published photos:\n${missing.join('\n')}\nRestore these entries before deploying. Intentional removals need an explicitly reviewed change to this guard.`);
}

export async function checkGallery(root = resolve('dist/client'), fetcher = fetch) {
  const current = photoRoutes(await readFile(resolve(root, 'photos/index.html'), 'utf8'));
  // Read the actual gallery, so every future publication automatically becomes protected.
  const response = await fetcher('https://rhys.dev/photos', { cache: 'no-store', signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Cannot verify the live gallery (${response.status}); deployment stopped.`);
  const previous = photoRoutes(await response.text());
  assertPreserved(previous, current);
  for (const route of current) {
    const page = await readFile(resolve(root, `.${route}/index.html`), 'utf8');
    const images = [...page.matchAll(/(?:src|href)=["'](\/_astro\/[^"']+\.(?:png|jpg|jpeg|webp|avif))["']/g)];
    if (!images.length) throw new Error(`No local photo asset in ${route}`);
    for (const [, image] of images) await access(resolve(root, `.${image}`));
  }
  console.log(`Gallery verified: ${current.size} photo pages and assets; all ${previous.size} live photos retained.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkGallery();
}
