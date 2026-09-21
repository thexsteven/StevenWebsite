/**
 * Auth für die passwortgeschützte Reise-Galerie unter `/reisen/archiv`.
 *
 * Bewusst simpel: ein gemeinsames Passwort für alle, kein Multi-User-System.
 * Geprüft wird aber serverseitig – der Login tauscht das Passwort gegen ein
 * signiertes Session-Token, das die Middleware bei jedem Request verifiziert.
 *
 * Hier steht ausschließlich Web Crypto (`crypto.subtle`), nie `node:crypto`:
 * die Next.js-Middleware läuft in der Edge-Runtime, dort gibt es kein
 * `node:crypto`. Web Crypto ist in Edge *und* Node verfügbar, dieses Modul
 * damit in beiden Welten benutzbar.
 */

const encoder = new TextEncoder();

/** Name des Session-Cookies. */
export const SESSION_COOKIE_NAME = 'travel_archive_session';

/** Geschützte Galerie. */
export const ARCHIVE_PATH = '/reisen/archiv';

/** Login-Formular – liegt innerhalb des geschützten Baums und ist ausgenommen. */
export const ARCHIVE_LOGIN_PATH = '/reisen/archiv/login';

/** Query-Parameter, der das ursprüngliche Ziel über den Login trägt. */
export const REDIRECT_PARAM = 'weiter';

/**
 * Serverseitige Obergrenze für ein Token, unabhängig vom Cookie.
 *
 * Das Cookie selbst ist ein Session-Cookie (stirbt beim Schließen des
 * Browsers). Diese Grenze greift zusätzlich: ein abgegriffenes Token ist
 * auch dann nicht unbegrenzt gültig, wenn es außerhalb des Browsers
 * weiterverwendet wird.
 */
export const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000;

const TOKEN_VERSION = 'v1';

// ——— Konfiguration ————————————————————————————————————————————

/**
 * Das gemeinsame Passwort aus den Environment-Variablen.
 *
 * `null`, wenn nichts gesetzt ist – dann bleibt die Galerie zu. Fail closed:
 * eine fehlende Variable darf nie zu einer offenen Seite führen.
 */
export function getArchivePassword(): string | null {
  const configured = process.env.TRAVEL_PAGE_PASSWORD;
  if (typeof configured !== 'string') return null;
  const trimmed = configured.trim();
  return trimmed === '' ? null : trimmed;
}

// ——— Krypto-Helfer ————————————————————————————————————————————

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function sha256(value: string): Promise<ArrayBuffer> {
  return crypto.subtle.digest('SHA-256', encoder.encode(value));
}

/**
 * Vergleicht zwei gleich lange Byte-Folgen in konstanter Zeit.
 *
 * Ein früher Abbruch beim ersten abweichenden Byte würde über die Laufzeit
 * verraten, wie viele Zeichen bereits stimmen – damit ließe sich ein Secret
 * Zeichen für Zeichen erraten. Deshalb wird immer die volle Länge gelesen.
 */
function equalInConstantTime(a: ArrayBuffer, b: ArrayBuffer): boolean {
  const left = new Uint8Array(a);
  const right = new Uint8Array(b);
  if (left.length !== right.length) return false;

  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index];
  }
  return difference === 0;
}

/**
 * Prüft die Passwort-Eingabe gegen das konfigurierte Passwort.
 *
 * Verglichen werden die SHA-256-Digests, nicht die Klartexte: Digests haben
 * immer 32 Byte, wodurch der Vergleich unabhängig von der Eingabelänge
 * konstant lange dauert und die Passwortlänge nicht durchsickert.
 */
export async function verifyPassword(
  input: string,
  expected: string,
): Promise<boolean> {
  if (expected === '') return false;
  const [inputDigest, expectedDigest] = await Promise.all([
    sha256(input),
    sha256(expected),
  ]);
  return equalInConstantTime(inputDigest, expectedDigest);
}

/**
 * Signiert eine Nutzlast mit einem aus dem Passwort abgeleiteten HMAC-Schlüssel.
 *
 * Der Schlüssel hängt am Passwort – ein Passwortwechsel entwertet damit
 * automatisch alle noch offenen Sessions, ohne dass es ein zweites Secret
 * zu verwalten gäbe.
 */
async function sign(password: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(`travel-archive:${password}`),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload),
  );
  return toBase64Url(signature);
}

// ——— Session-Token ————————————————————————————————————————————

/**
 * Baut ein Session-Token der Form `v1.<ablaufzeit>.<signatur>`.
 *
 * Der Cookie-Wert ist damit kein blankes „eingeloggt"-Flag, sondern
 * signiert – ohne Kenntnis des Passworts nicht fälschbar.
 */
export async function createSessionToken(
  password: string,
  now: number = Date.now(),
): Promise<string> {
  const expiresAt = now + SESSION_MAX_AGE_MS;
  const payload = `${TOKEN_VERSION}.${expiresAt}`;
  return `${payload}.${await sign(password, payload)}`;
}

/**
 * Prüft ein Session-Token auf Form, Ablauf und gültige Signatur.
 *
 * Gibt bei jedem Zweifel `false` zurück – kaputte, abgelaufene und
 * manipulierte Token sind gleichermaßen ungültig.
 */
export async function verifySessionToken(
  token: string | null | undefined,
  password: string,
  now: number = Date.now(),
): Promise<boolean> {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [version, rawExpiresAt, signature] = parts;
  if (version !== TOKEN_VERSION) return false;

  // `Number()` würde auch "1e20" oder " 42" schlucken; der Vergleich mit der
  // zurückformatierten Zahl lässt nur die kanonische Schreibweise durch.
  const expiresAt = Number(rawExpiresAt);
  if (!Number.isSafeInteger(expiresAt)) return false;
  if (String(expiresAt) !== rawExpiresAt) return false;
  if (expiresAt <= now) return false;

  const expected = await sign(password, `${version}.${expiresAt}`);
  return equalInConstantTime(
    encoder.encode(signature).buffer as ArrayBuffer,
    encoder.encode(expected).buffer as ArrayBuffer,
  );
}

/**
 * Kurzform für Middleware und Seiten: gilt dieses Cookie gerade?
 *
 * Ohne konfiguriertes Passwort immer `false` – siehe `getArchivePassword`.
 */
export async function hasValidSession(
  token: string | null | undefined,
  now: number = Date.now(),
): Promise<boolean> {
  const password = getArchivePassword();
  if (password === null) return false;
  return verifySessionToken(token, password, now);
}

// ——— Weiterleitungsziel ———————————————————————————————————————

/**
 * Entschärft das Ziel, das der Login nach erfolgreicher Anmeldung anspringt.
 *
 * Ohne Prüfung wäre `?weiter=https://boese.example` eine offene
 * Weiterleitung: ein Link auf die eigene Domain, der woanders landet.
 * Erlaubt ist deshalb ausschließlich ein Pfad innerhalb der Galerie;
 * alles andere fällt auf `/reisen/archiv` zurück.
 */
export function safeRedirectTarget(target: string | null | undefined): string {
  if (typeof target !== 'string' || target === '') return ARCHIVE_PATH;

  // "//host" und "/\host" lesen Browser als protokollrelative URL.
  if (!target.startsWith('/')) return ARCHIVE_PATH;
  if (target.startsWith('//') || target.startsWith('/\\')) return ARCHIVE_PATH;

  // Kein Query/Fragment durchreichen – der Pfad genügt.
  const path = target.split(/[?#]/)[0];
  if (path === ARCHIVE_LOGIN_PATH) return ARCHIVE_PATH;
  if (path !== ARCHIVE_PATH && !path.startsWith(`${ARCHIVE_PATH}/`)) {
    return ARCHIVE_PATH;
  }
  return path;
}
