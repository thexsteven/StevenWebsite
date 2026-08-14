/**
 * GitHub-Anbindung für die Projekte-Sektion.
 *
 * Läuft ausschließlich auf dem Server: Der Token wird aus
 * `process.env.GITHUB_TOKEN` gelesen und niemals an den Client gereicht.
 * Alle Requests nutzen ISR (`next: { revalidate: 3600 }`), damit die Seite
 * statisch bleibt und höchstens stündlich neu bei GitHub anfragt.
 *
 * Grundsatz: Diese Datei wirft nie. Fehlt der Token, ist das Rate-Limit
 * erreicht oder antwortet die API gar nicht, kommt `null` zurück – die
 * Sektion rendert dann nur die kuratierten Daten.
 */

const GITHUB_API = 'https://api.github.com';

/** Cache-Dauer der GitHub-Antworten in Sekunden (ISR). */
export const GITHUB_REVALIDATE_SECONDS = 3600;

// ——— Typen ———————————————————————————————————————————————————

/** Ein `owner/name`-Paar, wie es in den Projektdateien steht. */
export type RepoRef = {
  owner: string;
  name: string;
  /** Normalisiert als `owner/name`. */
  slug: string;
};

/** Eine Sprache aus `/languages`, bereits prozentual gewichtet. */
export type LanguageSlice = {
  name: string;
  bytes: number;
  /** Anteil in Prozent (0–100), Summe aller Slices ergibt 100. */
  share: number;
};

/** Live-Daten eines Repositories. */
export type RepoStats = {
  slug: string;
  repoUrl: string;
  /** Repo-Beschreibung von GitHub – dient als Fallback für die Kuration. */
  description: string | null;
  stars: number;
  /** ISO-Datum des letzten Pushes, oder `null` wenn unbekannt. */
  lastCommitIso: string | null;
  /** Absteigend nach Anteil sortiert; leer, wenn GitHub nichts liefert. */
  languages: LanguageSlice[];
};

// ——— Interne Guards ——————————————————————————————————————————

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(source: Record<string, unknown>, key: string): string | null {
  const value = source[key];
  return typeof value === 'string' && value.trim() !== '' ? value : null;
}

function readNumber(source: Record<string, unknown>, key: string): number {
  const value = source[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

// ——— Repo-Slug ————————————————————————————————————————————————

/**
 * Zerlegt `"owner/name"` in seine Bestandteile. Alles, was nicht dem
 * GitHub-Namensschema entspricht, ergibt `null`.
 */
export function parseRepoRef(repo: string | null): RepoRef | null {
  if (!repo) return null;
  const match = /^([\w.-]+)\/([\w.-]+)$/.exec(repo.trim());
  if (!match) return null;
  const [, owner, name] = match;
  return { owner, name, slug: `${owner}/${name}` };
}

// ——— Fetch-Basis ——————————————————————————————————————————————

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Holt JSON von der GitHub-API. Gibt bei jedem Fehler `null` zurück und
 * protokolliert nur serverseitig – die Sektion soll deswegen nicht brechen.
 */
async function fetchGitHubJson(url: string): Promise<unknown> {
  try {
    const response = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: GITHUB_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.warn(
        `[github] ${response.status} ${response.statusText} für ${url}`,
      );
      return null;
    }

    return (await response.json()) as unknown;
  } catch (error) {
    console.warn(`[github] Anfrage fehlgeschlagen für ${url}`, error);
    return null;
  }
}

// ——— Sprachen ————————————————————————————————————————————————

/**
 * Rechnet die Byte-Zahlen aus `/languages` in prozentuale Anteile um.
 * Anteile werden so gerundet, dass ihre Summe exakt 100 ergibt.
 */
export function toLanguageSlices(raw: unknown): LanguageSlice[] {
  if (!isRecord(raw)) return [];

  const entries = Object.entries(raw)
    .filter((entry): entry is [string, number] => typeof entry[1] === 'number')
    .filter(([, bytes]) => bytes > 0)
    .sort((a, b) => b[1] - a[1]);

  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (total === 0) return [];

  return entries.map(([name, bytes]) => ({
    name,
    bytes,
    share: (bytes / total) * 100,
  }));
}

// ——— Öffentliche API ——————————————————————————————————————————

/**
 * Holt Stars, Beschreibung, letzten Push und Sprachverteilung eines Repos.
 *
 * Ohne Token wird trotzdem angefragt (GitHub erlaubt 60 anonyme Requests
 * pro Stunde und IP); schlägt das fehl, kommt `null` zurück.
 */
export async function fetchRepoStats(repo: string): Promise<RepoStats | null> {
  const ref = parseRepoRef(repo);
  if (!ref) {
    console.warn(`[github] Ungültiger Repo-Bezeichner: "${repo}"`);
    return null;
  }

  const base = `${GITHUB_API}/repos/${ref.owner}/${ref.name}`;
  const [repoJson, languagesJson] = await Promise.all([
    fetchGitHubJson(base),
    fetchGitHubJson(`${base}/languages`),
  ]);

  // Ohne Repo-Antwort gibt es keine verlässliche Meta-Zeile – dann lieber
  // gar keine Live-Daten als eine halbe.
  if (!isRecord(repoJson)) return null;

  return {
    slug: ref.slug,
    repoUrl: readString(repoJson, 'html_url') ?? `https://github.com/${ref.slug}`,
    description: readString(repoJson, 'description'),
    stars: readNumber(repoJson, 'stargazers_count'),
    lastCommitIso: readString(repoJson, 'pushed_at'),
    languages: toLanguageSlices(languagesJson),
  };
}

/**
 * Holt die Live-Daten mehrerer Repos parallel. Einzelne Ausfälle sind
 * unkritisch – betroffene Repos fehlen schlicht in der Map.
 */
export async function fetchRepoStatsMap(
  repos: readonly string[],
): Promise<Map<string, RepoStats>> {
  const unique = Array.from(new Set(repos.filter((repo) => repo.length > 0)));
  const results = await Promise.allSettled(unique.map(fetchRepoStats));

  const map = new Map<string, RepoStats>();
  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value) {
      map.set(unique[index], result.value);
    }
  });

  return map;
}

// ——— Formatierung ————————————————————————————————————————————

const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat('de-DE', {
  numeric: 'auto',
});

const DIVISIONS: ReadonlyArray<{
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}> = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
];

/**
 * Wandelt ein ISO-Datum in eine relative deutsche Angabe ("vor 3 Tagen").
 * Wird serverseitig berechnet, damit Client und Server nicht divergieren.
 */
export function formatRelativeDate(
  iso: string | null,
  now: Date = new Date(),
): string | null {
  if (!iso) return null;

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  let duration = (date.getTime() - now.getTime()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return RELATIVE_FORMATTER.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }

  return null;
}

/** Absolutes Datum für `title`/`<time>` – ergänzt die relative Angabe. */
export function formatAbsoluteDate(iso: string | null): string | null {
  if (!iso) return null;

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Sternezahl in deutscher Schreibweise (1.234). */
export function formatStars(stars: number): string {
  return new Intl.NumberFormat('de-DE').format(stars);
}
