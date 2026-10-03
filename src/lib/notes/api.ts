import { z } from 'astro/zod';
import { assertValidDoc } from './schema';

const doc = z.custom<import('@tiptap/core').JSONContent>((value) => {
  try {
    assertValidDoc(value);
    return true;
  } catch {
    return false;
  }
}, 'Invalid document');

export const createBody = z.object({ title: z.string().max(500), doc });

export const updateBody = z
  .object({ title: z.string().max(500), doc, isPublic: z.boolean() })
  .partial();

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export const unauthorized = () => json({ error: 'unauthorized' }, 401);

/** Requiring a JSON content type forces a CORS preflight, so other sites cannot submit writes. */
export const readJson = (request: Request): Promise<unknown> | null =>
  request.headers.get('content-type')?.startsWith('application/json') ? request.json() : null;
