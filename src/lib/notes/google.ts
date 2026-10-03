import { Google } from 'arctic';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from 'astro:env/server';

export const google = (origin: string) =>
  new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, `${origin}/auth/callback`);

/** Only same-site paths are allowed as post-login destinations. */
export const safeReturnTo = (value: string | null | undefined) =>
  value && value.startsWith('/') && !value.startsWith('//') ? value : '/notes';
