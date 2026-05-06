const PBKDF2_ITERATIONS = 600_000;

type Payload = {
  v: number;
  salt: string;
  iv: string;
  ct: string;
};

function b64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64);
  const buffer = new ArrayBuffer(bin.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export async function importPasswordAsBaseKey(
  password: string,
): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );
}

async function deriveAesKey(
  baseKey: CryptoKey,
  saltBytes: Uint8Array<ArrayBuffer>,
): Promise<CryptoKey> {
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );
}

export async function decryptPayloadWithBaseKey(
  baseKey: CryptoKey,
  payload: Payload,
): Promise<string> {
  if (!payload || payload.v !== 1) {
    throw new Error('Unsupported payload version');
  }
  const salt = b64ToBytes(payload.salt);
  const iv = b64ToBytes(payload.iv);
  const ct = b64ToBytes(payload.ct);
  const aesKey = await deriveAesKey(baseKey, salt);
  const plaintextBytes = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    ct,
  );
  return new TextDecoder().decode(plaintextBytes);
}

export async function decryptPayload(
  password: string,
  payload: Payload,
): Promise<string> {
  const baseKey = await importPasswordAsBaseKey(password);
  return decryptPayloadWithBaseKey(baseKey, payload);
}

async function fetchPayload(url: string): Promise<Payload> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return (await res.json()) as Payload;
}

export async function fetchAndDecryptWithBaseKey(
  baseKey: CryptoKey,
  url: string,
): Promise<string> {
  const payload = await fetchPayload(url);
  return decryptPayloadWithBaseKey(baseKey, payload);
}

export async function fetchAndDecrypt(
  password: string,
  url: string,
): Promise<string> {
  const payload = await fetchPayload(url);
  return decryptPayload(password, payload);
}
