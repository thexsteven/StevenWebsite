'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  ARCHIVE_PATH,
  SESSION_COOKIE_NAME,
  createSessionToken,
  getArchivePassword,
  safeRedirectTarget,
  verifyPassword,
} from '@/lib/travelAuth';

import type { LoginState } from './loginState';

const WRONG_PASSWORD = 'Das Passwort stimmt nicht.';

/**
 * Prüft das eingegebene Passwort und setzt bei Erfolg das Session-Cookie.
 *
 * Die Fehlermeldung ist bewusst immer dieselbe und nennt nie den Grund
 * genauer – ob das Feld leer war oder das Passwort falsch, geht niemanden
 * etwas an, der es nicht ohnehin weiß.
 */
export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const expected = getArchivePassword();
  if (expected === null) {
    return {
      error:
        'Die Galerie ist noch nicht konfiguriert (TRAVEL_PAGE_PASSWORD fehlt).',
    };
  }

  const input = formData.get('password');
  if (typeof input !== 'string') return { error: WRONG_PASSWORD };

  if (!(await verifyPassword(input, expected))) {
    return { error: WRONG_PASSWORD };
  }

  const store = await cookies();
  store.set({
    name: SESSION_COOKIE_NAME,
    value: await createSessionToken(expected),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    // Kein `maxAge`/`expires`: Session-Cookie, es stirbt mit dem Browser.
    // Die serverseitige Obergrenze steckt im Token selbst.
    path: ARCHIVE_PATH,
  });

  const target = formData.get('weiter');
  redirect(safeRedirectTarget(typeof target === 'string' ? target : null));
}

/** Meldet ab, indem das Cookie gelöscht wird. */
export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete({ name: SESSION_COOKIE_NAME, path: ARCHIVE_PATH });
  redirect('/reisen');
}
