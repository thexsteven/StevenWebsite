import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  ARCHIVE_LOGIN_PATH,
  REDIRECT_PARAM,
  SESSION_COOKIE_NAME,
  hasValidSession,
} from '@/lib/travelAuth';

/**
 * Session-Prüfung für Server Components.
 *
 * Getrennt von `lib/travelAuth.ts`, weil `next/headers` in der Edge-Runtime
 * der Middleware nicht verfügbar ist – `travelAuth` muss dort importierbar
 * bleiben.
 */

/** Liest das Session-Cookie, ohne zu entscheiden. */
export async function readSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE_NAME)?.value ?? null;
}

/** Ist gerade jemand eingeloggt? */
export async function hasArchiveSession(): Promise<boolean> {
  return hasValidSession(await readSessionToken());
}

/**
 * Zweite Verteidigungslinie hinter der Middleware.
 *
 * Die Middleware fängt den Request schon vorher ab – aber sie hängt an einem
 * `matcher`, und ein Vertipper darin würde die Galerie stillschweigend
 * öffnen. Deshalb prüft jede geschützte Seite selbst noch einmal.
 */
export async function requireArchiveSession(
  currentPath?: string,
): Promise<void> {
  if (await hasArchiveSession()) return;

  const target = new URLSearchParams();
  if (currentPath) target.set(REDIRECT_PARAM, currentPath);
  const query = target.toString();
  redirect(query === '' ? ARCHIVE_LOGIN_PATH : `${ARCHIVE_LOGIN_PATH}?${query}`);
}
