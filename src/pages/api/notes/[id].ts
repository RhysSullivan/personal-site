import type { APIRoute } from 'astro';
import { deleteNote, updateNote } from '../../../lib/notes/db';
import { json, readJson, unauthorized, updateBody } from '../../../lib/notes/api';
import { isOwner } from '../../../lib/notes/session';

export const prerender = false;

export const PATCH: APIRoute = async ({ cookies, params, request }) => {
  if (!(await isOwner(cookies))) return unauthorized();
  const input = readJson(request);
  if (!input) return json({ error: 'expected application/json' }, 415);
  const body = updateBody.safeParse(await input);
  if (!body.success) return json({ error: body.error.flatten() }, 400);
  const note = await updateNote(params.id!, body.data);
  return note ? json({ id: note.id, updatedAt: note.updatedAt, isPublic: note.isPublic }) : json({ error: 'not found' }, 404);
};

export const DELETE: APIRoute = async ({ cookies, params }) => {
  if (!(await isOwner(cookies))) return unauthorized();
  return (await deleteNote(params.id!)) ? new Response(null, { status: 204 }) : json({ error: 'not found' }, 404);
};
