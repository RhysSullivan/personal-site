import type { APIRoute } from 'astro';
import { createNote } from '../../../lib/notes/db';
import { createBody, json, readJson, unauthorized } from '../../../lib/notes/api';
import { isOwner } from '../../../lib/notes/session';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request }) => {
  if (!(await isOwner(cookies))) return unauthorized();
  const input = readJson(request);
  if (!input) return json({ error: 'expected application/json' }, 415);
  const body = createBody.safeParse(await input);
  if (!body.success) return json({ error: body.error.flatten() }, 400);
  const note = await createNote(body.data);
  return json({ id: note.id, updatedAt: note.updatedAt }, 201);
};
