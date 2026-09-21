/**
 * Typen, Validierung und Formatierung der Reisedaten.
 *
 * Dieses Modul ist bewusst frei von Node-Imports: die Galerie-Komponente ist
 * eine Client-Komponente und braucht `formatDateRange`. Ein `node:fs` hier
 * würde das gesamte Dateisystem-Modul in den Browser-Bundle ziehen (und den
 * Build brechen). Das Lesen der Dateien steht deshalb in
 * `lib/travelArchive.server.ts`.
 */

// ——— Typen ———————————————————————————————————————————————————

/** Ein einzelnes Foto einer Reise. */
export type TravelImage = {
  src: string;
  /** Bildbeschreibung für Screenreader; nie leer, notfalls aus dem Titel. */
  alt: string;
};

/** Eine Reise, so wie sie in `content/reisen/` steht. */
export type TravelEntry = {
  id: string;
  title: string;
  country: string;
  /** ISO-Datum `YYYY-MM-DD`. */
  startDate: string;
  /** ISO-Datum `YYYY-MM-DD`; gleich `startDate` bei Eintagesreisen. */
  endDate: string;
  description: string;
  coverImage: string | null;
  images: TravelImage[];
};

// ——— Feld-Parser ——————————————————————————————————————————————

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(
  source: Record<string, unknown>,
  key: string,
): string | null {
  const value = source[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

/** `YYYY-MM-DD`, und das Datum muss auch wirklich existieren. */
function readIsoDate(
  source: Record<string, unknown>,
  key: string,
): string | null {
  const value = readString(source, key);
  if (value === null) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  // Fängt Rolldaten wie 2025-02-31 ab, die `Date` still zum 03.03. macht.
  return parsed.toISOString().slice(0, 10) === value ? value : null;
}

/**
 * Liest die Bilderliste.
 *
 * Erlaubt sind beide Schreibweisen: `"url"` als Kurzform und
 * `{ src, alt }`, wenn ein eigener Alt-Text dranhängen soll.
 */
function readImages(
  source: Record<string, unknown>,
  fallbackAlt: string,
): TravelImage[] {
  const value = source['images'];
  if (!Array.isArray(value)) return [];

  const images: TravelImage[] = [];
  for (const entry of value) {
    if (typeof entry === 'string') {
      const src = entry.trim();
      if (src !== '') images.push({ src, alt: fallbackAlt });
      continue;
    }
    if (!isRecord(entry)) continue;
    const src = readString(entry, 'src');
    if (src === null) continue;
    images.push({ src, alt: readString(entry, 'alt') ?? fallbackAlt });
  }
  return images;
}

/**
 * Baut aus den Rohfeldern einer Datei einen `TravelEntry`.
 *
 * Fehlt ein Pflichtfeld (`title`, `startDate`), wird `null` zurückgegeben und
 * die Datei übersprungen statt halb gerendert – dieselbe Linie wie in
 * `lib/projects.ts`.
 */
export function toTravelEntry(
  raw: Record<string, unknown>,
  fallbackId: string,
  fallbackDescription = '',
): TravelEntry | null {
  const title = readString(raw, 'title');
  if (!title) {
    console.warn(
      `[reisen] "${fallbackId}" hat kein "title" – Datei wird übersprungen.`,
    );
    return null;
  }

  const startDate = readIsoDate(raw, 'startDate');
  if (!startDate) {
    console.warn(
      `[reisen] "${fallbackId}" hat kein gültiges "startDate" (YYYY-MM-DD) – Datei wird übersprungen.`,
    );
    return null;
  }

  const images = readImages(raw, title);
  const endDate = readIsoDate(raw, 'endDate') ?? startDate;

  return {
    id: readString(raw, 'id') ?? fallbackId,
    title,
    country: readString(raw, 'country') ?? '',
    startDate,
    // Ein Enddatum vor dem Start ist ein Tippfehler; dann zählt der Start.
    endDate: endDate < startDate ? startDate : endDate,
    description: readString(raw, 'description') ?? fallbackDescription,
    coverImage: readString(raw, 'coverImage') ?? images[0]?.src ?? null,
    images,
  };
}

// ——— Sortierung ———————————————————————————————————————————————

/**
 * Neueste Reise zuerst, danach rückwärts in die Vergangenheit.
 *
 * Als Tiebreaker die `id`, damit zwei Reisen mit gleichem Startdatum nicht
 * je nach Dateisystem-Reihenfolge mal so und mal so stehen.
 */
export function sortNewestFirst(entries: TravelEntry[]): TravelEntry[] {
  return [...entries].sort(
    (a, b) =>
      b.startDate.localeCompare(a.startDate) || a.id.localeCompare(b.id, 'de'),
  );
}

// ——— Formatierung —————————————————————————————————————————————

const DAY_MONTH_YEAR = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const DAY_MONTH = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  timeZone: 'UTC',
});

/**
 * „02. März – 14. April 2025", und innerhalb eines Monats „09.–20. Juli 2022".
 *
 * Das Jahr steht nur einmal am Ende, solange beide Daten im selben Jahr
 * liegen – sonst werden beide Seiten voll ausgeschrieben. Alles in UTC, damit
 * die Anzeige nicht von der Zeitzone des Servers abhängt.
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  if (startDate === endDate) return DAY_MONTH_YEAR.format(start);

  const sameYear = startDate.slice(0, 4) === endDate.slice(0, 4);
  if (!sameYear) {
    return `${DAY_MONTH_YEAR.format(start)} – ${DAY_MONTH_YEAR.format(end)}`;
  }

  const sameMonth = startDate.slice(0, 7) === endDate.slice(0, 7);
  if (sameMonth) {
    const day = start.getUTCDate().toString().padStart(2, '0');
    return `${day}.–${DAY_MONTH_YEAR.format(end)}`;
  }

  return `${DAY_MONTH.format(start)} – ${DAY_MONTH_YEAR.format(end)}`;
}
