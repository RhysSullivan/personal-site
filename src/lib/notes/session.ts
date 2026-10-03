import type { AstroCookies } from 'astro';
import { SESSION_SECRET } from 'astro:env/server';

export const OWNER_EMAIL = 'rhys@rhyssullivan.com';

const COOKIE = 'notes_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type Session = { email: string; exp: number };

const encoder = new TextEncoder();

const toBase64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromBase64Url = (value: string) =>
  Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

const key = () =>
  crypto.subtle.importKey('raw', encoder.encode(SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);

const sign = async (payload: string) =>
  toBase64Url(new Uint8Array(await crypto.subtle.sign('HMAC', await key(), encoder.encode(payload))));

const verify = async (payload: string, signature: string) => {
  try {
    return await crypto.subtle.verify('HMAC', await key(), fromBase64Url(signature), encoder.encode(payload));
  } catch {
    return false;
  }
};

export async function startSession(cookies: AstroCookies, email: string, secure: boolean) {
  const session: Session = { email, exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS };
  const payload = toBase64Url(encoder.encode(JSON.stringify(session)));
  cookies.set(COOKIE, `${payload}.${await sign(payload)}`, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure,
    maxAge: MAX_AGE_SECONDS,
  });
}

export function endSession(cookies: AstroCookies) {
  cookies.delete(COOKIE, { path: '/' });
}

/** True only when the request carries a valid, unexpired session for the owner. */
export async function isOwner(cookies: AstroCookies): Promise<boolean> {
  const value = cookies.get(COOKIE)?.value;
  if (!value) return false;
  const [payload, signature] = value.split('.');
  if (!payload || !signature || !(await verify(payload, signature))) return false;
  const session = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as Session;
  return session.email === OWNER_EMAIL && session.exp > Date.now() / 1000;
}
