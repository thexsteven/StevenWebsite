(() => {
  const PBKDF2_ITERATIONS = 600000;

  const b64ToBytes = (b64) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  };

  const deriveKey = async (password, saltBytes) => {
    const passKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: saltBytes, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
      passKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
  };

  const decryptPayload = async (password, payload) => {
    if (!payload || payload.v !== 1) throw new Error('Unsupported payload version');
    const salt = b64ToBytes(payload.salt);
    const iv = b64ToBytes(payload.iv);
    const ct = b64ToBytes(payload.ct);
    const key = await deriveKey(password, salt);
    const plaintextBytes = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return new TextDecoder().decode(plaintextBytes);
  };

  const fetchAndDecrypt = async (password, url) => {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Fetch failed: ' + res.status);
    const payload = await res.json();
    return decryptPayload(password, payload);
  };

  window.LoveCrypto = { decryptPayload, fetchAndDecrypt };
})();
