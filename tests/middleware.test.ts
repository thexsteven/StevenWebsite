import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { middleware } from '@/middleware';
import {
  ARCHIVE_LOGIN_PATH,
  ARCHIVE_PATH,
  SESSION_COOKIE_NAME,
  createSessionToken,
} from '@/lib/travelAuth';

/**
 * Tests für den Torwächter vor der Reise-Galerie.
 *
 * Geprüft wird das Verhalten, nicht die Implementierung: Wer kommt durch, wer
 * landet auf dem Login, und wohin geht es danach weiter?
 */

const PASSWORD = 'ein-langes-test-passwort';
const ORIGIN = 'https://braun-steven.de';

function request(pathname: string, token?: string): NextRequest {
  const nextRequest = new NextRequest(new URL(pathname, ORIGIN));
  if (token !== undefined) {
    nextRequest.cookies.set(SESSION_COOKIE_NAME, token);
  }
  return nextRequest;
}

/** Zielpfad einer Weiterleitung, oder `null` wenn durchgelassen wurde. */
function redirectTarget(response: Response): URL | null {
  const location = response.headers.get('location');
  return location === null ? null : new URL(location);
}

describe('middleware', () => {
  const original = process.env.TRAVEL_PAGE_PASSWORD;
  let gueltigesToken: string;

  beforeEach(async () => {
    process.env.TRAVEL_PAGE_PASSWORD = PASSWORD;
    gueltigesToken = await createSessionToken(PASSWORD);
  });

  afterEach(() => {
    if (original === undefined) delete process.env.TRAVEL_PAGE_PASSWORD;
    else process.env.TRAVEL_PAGE_PASSWORD = original;
  });

  describe('ohne gültige Session', () => {
    it('schickt die Galerie auf den Login', async () => {
      const response = await middleware(request(ARCHIVE_PATH));
      expect(redirectTarget(response)?.pathname).toBe(ARCHIVE_LOGIN_PATH);
    });

    it('merkt sich eine Unterseite als Ziel für nach dem Login', async () => {
      const response = await middleware(request('/reisen/archiv/2025'));
      const target = redirectTarget(response);

      expect(target?.pathname).toBe(ARCHIVE_LOGIN_PATH);
      expect(target?.searchParams.get('weiter')).toBe('/reisen/archiv/2025');
    });

    it('hängt kein Ziel an, wenn die Galerie selbst gemeint war', async () => {
      const response = await middleware(request(ARCHIVE_PATH));
      expect(redirectTarget(response)?.searchParams.get('weiter')).toBeNull();
    });

    it('lässt den Login durch', async () => {
      const response = await middleware(request(ARCHIVE_LOGIN_PATH));
      expect(redirectTarget(response)).toBeNull();
    });

    it('weist ein gefälschtes Cookie ab', async () => {
      const response = await middleware(request(ARCHIVE_PATH, 'eingeloggt'));
      expect(redirectTarget(response)?.pathname).toBe(ARCHIVE_LOGIN_PATH);
    });

    it('weist ein fremd signiertes Token ab', async () => {
      const fremd = await createSessionToken('anderes-passwort');
      const response = await middleware(request(ARCHIVE_PATH, fremd));
      expect(redirectTarget(response)?.pathname).toBe(ARCHIVE_LOGIN_PATH);
    });
  });

  describe('mit gültiger Session', () => {
    it('lässt die Galerie durch', async () => {
      const response = await middleware(request(ARCHIVE_PATH, gueltigesToken));
      expect(redirectTarget(response)).toBeNull();
    });

    it('lässt Unterseiten durch', async () => {
      const response = await middleware(
        request('/reisen/archiv/2025', gueltigesToken),
      );
      expect(redirectTarget(response)).toBeNull();
    });

    it('schickt vom Login weiter in die Galerie', async () => {
      const response = await middleware(
        request(ARCHIVE_LOGIN_PATH, gueltigesToken),
      );
      expect(redirectTarget(response)?.pathname).toBe(ARCHIVE_PATH);
    });
  });

  describe('ohne konfiguriertes Passwort', () => {
    it('bleibt zu, auch für ein sonst gültiges Token', async () => {
      // Fail closed: eine vergessene Environment-Variable auf Vercel darf die
      // private Galerie nicht öffnen.
      delete process.env.TRAVEL_PAGE_PASSWORD;

      const response = await middleware(request(ARCHIVE_PATH, gueltigesToken));
      expect(redirectTarget(response)?.pathname).toBe(ARCHIVE_LOGIN_PATH);
    });
  });
});
