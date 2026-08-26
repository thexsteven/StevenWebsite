import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  ARCHIVE_PATH,
  SESSION_MAX_AGE_MS,
  createSessionToken,
  getArchivePassword,
  hasValidSession,
  safeRedirectTarget,
  verifyPassword,
  verifySessionToken,
} from '@/lib/travelAuth';

/**
 * Tests für die Auth der Reise-Galerie.
 *
 * Das ist der sicherheitsrelevante Teil der Subpage: hier hängt dran, ob der
 * private Bereich privat bleibt. Entsprechend liegt der Schwerpunkt auf den
 * Fällen, in denen jemand *nicht* durchkommen darf.
 */

const PASSWORD = 'ein-langes-test-passwort';
const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);

describe('getArchivePassword', () => {
  const original = process.env.TRAVEL_PAGE_PASSWORD;

  afterEach(() => {
    if (original === undefined) delete process.env.TRAVEL_PAGE_PASSWORD;
    else process.env.TRAVEL_PAGE_PASSWORD = original;
  });

  it('liefert das gesetzte Passwort', () => {
    process.env.TRAVEL_PAGE_PASSWORD = PASSWORD;
    expect(getArchivePassword()).toBe(PASSWORD);
  });

  it('liefert null, wenn die Variable fehlt', () => {
    delete process.env.TRAVEL_PAGE_PASSWORD;
    expect(getArchivePassword()).toBeNull();
  });

  it('behandelt eine leere oder nur aus Leerzeichen bestehende Variable wie nicht gesetzt', () => {
    process.env.TRAVEL_PAGE_PASSWORD = '';
    expect(getArchivePassword()).toBeNull();

    process.env.TRAVEL_PAGE_PASSWORD = '   ';
    expect(getArchivePassword()).toBeNull();
  });
});

describe('verifyPassword', () => {
  it('akzeptiert das exakte Passwort', async () => {
    await expect(verifyPassword(PASSWORD, PASSWORD)).resolves.toBe(true);
  });

  it('weist ein falsches Passwort ab', async () => {
    await expect(verifyPassword('falsch', PASSWORD)).resolves.toBe(false);
  });

  it('weist ein Präfix des richtigen Passworts ab', async () => {
    await expect(verifyPassword(PASSWORD.slice(0, -1), PASSWORD)).resolves.toBe(
      false,
    );
  });

  it('unterscheidet Groß- und Kleinschreibung', async () => {
    await expect(
      verifyPassword(PASSWORD.toUpperCase(), PASSWORD),
    ).resolves.toBe(false);
  });

  it('lässt eine leere Eingabe nicht durch', async () => {
    await expect(verifyPassword('', PASSWORD)).resolves.toBe(false);
  });

  it('lässt niemanden durch, wenn kein Passwort konfiguriert ist', async () => {
    // Fail closed: ohne Secret darf auch die leere Eingabe nicht passen.
    await expect(verifyPassword('', '')).resolves.toBe(false);
  });
});

describe('createSessionToken / verifySessionToken', () => {
  it('erzeugt ein Token, das direkt danach gilt', async () => {
    const token = await createSessionToken(PASSWORD, NOW);
    await expect(verifySessionToken(token, PASSWORD, NOW)).resolves.toBe(true);
  });

  it('lehnt ein Token ab, das mit einem anderen Passwort signiert wurde', async () => {
    const token = await createSessionToken('anderes-passwort', NOW);
    await expect(verifySessionToken(token, PASSWORD, NOW)).resolves.toBe(false);
  });

  it('lehnt ein Token nach Ablauf der Gültigkeit ab', async () => {
    const token = await createSessionToken(PASSWORD, NOW);

    await expect(
      verifySessionToken(token, PASSWORD, NOW + SESSION_MAX_AGE_MS - 1_000),
    ).resolves.toBe(true);
    await expect(
      verifySessionToken(token, PASSWORD, NOW + SESSION_MAX_AGE_MS),
    ).resolves.toBe(false);
    await expect(
      verifySessionToken(token, PASSWORD, NOW + SESSION_MAX_AGE_MS + 1),
    ).resolves.toBe(false);
  });

  it('lehnt ein Token mit verlängerter Ablaufzeit ab', async () => {
    // Der klassische Angriff: Ablaufzeit im Cookie hochdrehen und hoffen,
    // dass sie nicht mitsigniert ist.
    const token = await createSessionToken(PASSWORD, NOW);
    const [version, expiresAt, signature] = token.split('.');
    const verlaengert = `${version}.${Number(expiresAt) + 10 * 365 * 24 * 60 * 60 * 1000}.${signature}`;

    await expect(verifySessionToken(verlaengert, PASSWORD, NOW)).resolves.toBe(
      false,
    );
  });

  it('lehnt ein Token mit manipulierter Signatur ab', async () => {
    const token = await createSessionToken(PASSWORD, NOW);
    const [version, expiresAt, signature] = token.split('.');
    const gedreht = signature.slice(1) + (signature[0] === 'A' ? 'B' : 'A');

    await expect(
      verifySessionToken(`${version}.${expiresAt}.${gedreht}`, PASSWORD, NOW),
    ).resolves.toBe(false);
  });

  it('lehnt Müll, leere Werte und falsche Formen ab', async () => {
    const kaputt = [
      null,
      undefined,
      '',
      'eingeloggt',
      'true',
      'v1',
      'v1.123',
      'v1.123.abc.def',
      `v2.${NOW + 1000}.abc`,
      // Nicht-kanonische Zahlen dürfen nicht am Formatcheck vorbeikommen.
      `v1.0${NOW + 1000}.abc`,
      'v1.1e20.abc',
      `v1. ${NOW + 1000}.abc`,
      'v1.NaN.abc',
      `v1.-${NOW}.abc`,
    ];

    for (const token of kaputt) {
      await expect(verifySessionToken(token, PASSWORD, NOW)).resolves.toBe(
        false,
      );
    }
  });

  it('entwertet alte Token, sobald das Passwort gewechselt wird', async () => {
    const alt = await createSessionToken(PASSWORD, NOW);
    await expect(verifySessionToken(alt, 'neues-passwort', NOW)).resolves.toBe(
      false,
    );
  });
});

describe('hasValidSession', () => {
  const original = process.env.TRAVEL_PAGE_PASSWORD;

  beforeEach(() => {
    process.env.TRAVEL_PAGE_PASSWORD = PASSWORD;
  });

  afterEach(() => {
    if (original === undefined) delete process.env.TRAVEL_PAGE_PASSWORD;
    else process.env.TRAVEL_PAGE_PASSWORD = original;
  });

  it('lässt ein gültiges Token durch', async () => {
    const token = await createSessionToken(PASSWORD, NOW);
    await expect(hasValidSession(token, NOW)).resolves.toBe(true);
  });

  it('sperrt, wenn kein Passwort konfiguriert ist – auch mit gültigem Token', async () => {
    const token = await createSessionToken(PASSWORD, NOW);
    delete process.env.TRAVEL_PAGE_PASSWORD;
    await expect(hasValidSession(token, NOW)).resolves.toBe(false);
  });

  it('sperrt ohne Cookie', async () => {
    await expect(hasValidSession(null, NOW)).resolves.toBe(false);
  });
});

describe('safeRedirectTarget', () => {
  it('lässt Pfade innerhalb der Galerie durch', () => {
    expect(safeRedirectTarget(ARCHIVE_PATH)).toBe(ARCHIVE_PATH);
    expect(safeRedirectTarget('/reisen/archiv/2025')).toBe(
      '/reisen/archiv/2025',
    );
  });

  it('fällt bei fehlendem oder leerem Ziel auf die Galerie zurück', () => {
    expect(safeRedirectTarget(null)).toBe(ARCHIVE_PATH);
    expect(safeRedirectTarget(undefined)).toBe(ARCHIVE_PATH);
    expect(safeRedirectTarget('')).toBe(ARCHIVE_PATH);
  });

  it('verhindert offene Weiterleitungen nach außen', () => {
    const boese = [
      'https://boese.example',
      'http://boese.example',
      // Protokollrelative URLs: der Browser hängt das eigene Schema davor
      // und landet trotz führendem Slash auf einer fremden Domain.
      '//boese.example',
      '/\\boese.example',
      'javascript:alert(1)',
    ];

    for (const target of boese) {
      expect(safeRedirectTarget(target)).toBe(ARCHIVE_PATH);
    }
  });

  it('verhindert Sprünge in andere Bereiche der Seite', () => {
    expect(safeRedirectTarget('/karriere')).toBe(ARCHIVE_PATH);
    // Kein Präfix-Trick: /reisen/archivierung ist nicht die Galerie.
    expect(safeRedirectTarget('/reisen/archivierung')).toBe(ARCHIVE_PATH);
  });

  it('schickt nicht auf den Login zurück', () => {
    // Sonst gäbe es nach erfolgreicher Anmeldung eine Schleife.
    expect(safeRedirectTarget('/reisen/archiv/login')).toBe(ARCHIVE_PATH);
  });

  it('wirft Query und Fragment weg', () => {
    expect(safeRedirectTarget('/reisen/archiv?x=1')).toBe(ARCHIVE_PATH);
    expect(safeRedirectTarget('/reisen/archiv#unten')).toBe(ARCHIVE_PATH);
  });
});
