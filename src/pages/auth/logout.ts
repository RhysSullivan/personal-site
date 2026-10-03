import type { APIRoute } from 'astro';
import { endSession } from '../../lib/notes/session';

export const prerender = false;

export const POST: APIRoute = ({ cookies, redirect }) => {
  endSession(cookies);
  return redirect('/notes', 303);
};
