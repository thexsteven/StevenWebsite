const DB_NAME = 'love-store';
const DB_VERSION = 1;
const STORE_NAME = 'keys';
const RECORD_KEY = 'pbkdf2-base';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function tx<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, mode);
        const request = run(transaction.objectStore(STORE_NAME));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => db.close();
        transaction.onerror = () => db.close();
      }),
  );
}

export async function putBaseKey(key: CryptoKey): Promise<void> {
  await tx('readwrite', (store) => store.put(key, RECORD_KEY));
}

export async function getBaseKey(): Promise<CryptoKey | null> {
  const value = await tx<CryptoKey | undefined>('readonly', (store) =>
    store.get(RECORD_KEY),
  );
  return value ?? null;
}

export async function hasBaseKey(): Promise<boolean> {
  const count = await tx<number>('readonly', (store) =>
    store.count(RECORD_KEY),
  );
  return count > 0;
}

export async function clearBaseKey(): Promise<void> {
  await tx('readwrite', (store) => store.delete(RECORD_KEY));
}
