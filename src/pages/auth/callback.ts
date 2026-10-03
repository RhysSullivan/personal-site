import type { APIRoute } from 'astro';
import { decodeIdToken } from 'arctic';
import { google, safeReturnTo } from '../../lib/notes/google';
import { OWNER_EMAIL, startSession } from '../../lib/notes/session';

export const prerender = false;

type IdTokenClaims = { email?: string; email_verified?: boolean };

export const GET: APIRoute = async ({ cookies, url, redirect }) => {
  const state = cookies.get('oauth_state')?.value;
  const verifier = cookies.get('oauth_verifier')?.value;
  const returnTo = safeReturnTo(cookies.get('oauth_return_to')?.value);
  for (const name of ['oauth_state', 'oauth_verifier', 'oauth_return_to']) cookies.delete(name, { path: '/auth' });

  const code = url.searchParams.get('code');
  if (!code || !state || !verifier || url.searchParams.get('state') !== state) {
    return new Response('Sign-in failed. Please try again.', { status: 400 });
  }

  // The ID token comes straight from Google's token endpoint over TLS, so its claims can be trusted without re-verifying the signature.
  const tokens = await google(url.origin).validateAuthorizationCode(code, verifier);
  const claims = decodeIdToken(tokens.idToken()) as IdTokenClaims;
  if (claims.email !== OWNER_EMAIL || claims.email_verified !== true) {
    return new Response('This account is not allowed to edit notes.', { status: 403 });
  }

  await startSession(cookies, OWNER_EMAIL, url.protocol === 'https:');
  return redirect(returnTo);
};
