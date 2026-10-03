import type { APIRoute } from 'astro';
import { generateCodeVerifier, generateState } from 'arctic';
import { google, safeReturnTo } from '../../lib/notes/google';
import { OWNER_EMAIL } from '../../lib/notes/session';

export const prerender = false;

const TEN_MINUTES = 60 * 10;

export const GET: APIRoute = ({ cookies, url, redirect }) => {
  const state = generateState();
  const verifier = generateCodeVerifier();
  const authUrl = google(url.origin).createAuthorizationURL(state, verifier, ['openid', 'email']);
  authUrl.searchParams.set('login_hint', OWNER_EMAIL);

  const options = { path: '/auth', httpOnly: true, sameSite: 'lax', secure: url.protocol === 'https:', maxAge: TEN_MINUTES } as const;
  cookies.set('oauth_state', state, options);
  cookies.set('oauth_verifier', verifier, options);
  cookies.set('oauth_return_to', safeReturnTo(url.searchParams.get('returnTo')), options);
  return redirect(authUrl.toString());
};
