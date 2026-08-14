/**
 * Kuratierte Projektdaten aus `content/projects/`.
 *
 * Pro Projekt eine Datei – wahlweise `.json` oder `.mdx`/`.md` mit
 * Frontmatter. Bei MDX-Dateien dient der Fließtext als `description`,
 * falls im Frontmatter keine steht.
 *
 * Diese Datei liest nur vom Dateisystem und ist damit serverseitig.
 */

import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

import {
  fetchRepoStatsMap,
  formatAbsoluteDate,
  formatRelativeDate,
  type LanguageSlice,
} from '@/lib/github';

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');
const SUPPORTED_EXTENSIONS = ['.json', '.mdx', '.md'] as const;

// ——— Typen ———————————————————————————————————————————————————

/** Ein kuratiertes Projekt, so wie es in `content/projects/` steht. */
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** `owner/name`, oder `null` wenn das Projekt kein öffentliches Repo hat. */
  repo: string | null;
  liveUrl: string | null;
  /** Pfad unter `/public` oder absolute URL; `null` zeigt das Fallback-Motiv. */
  screenshot: string | null;
  techStack: string[];
  featured: boolean;
  order: number;
};

/** Live-Daten in bereits formatierter, client-tauglicher Form. */
export type ProjectStats = {
  stars: number;
  starsLabel: string;
  languages: LanguageSlice[];
  lastCommitIso: string | null;
  lastCommitRelative: string | null;
  lastCommitAbsolute: string | null;
  repoUrl: string;
};

/** Kuratiertes Projekt plus optionale Live-Daten. */
export type ProjectWithStats = Project & {
  stats: ProjectStats | null;
};

// ——— Feld-Parser ——————————————————————————————————————————————

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(source: Record<string, unknown>, key: string): string | null {
  const value = source[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function readStringArray(
  source: Record<string, unknown>,
  key: string,
): string[] {
  const value = source[key];
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === 'string')
    .map((entry) => entry.trim())
    .filter((entry) => entry !== '');
}

function readBoolean(source: Record<string, unknown>, key: string): boolean {
  return source[key] === true;
}

function readNumber(
  source: Record<string, unknown>,
  key: string,
  fallback: number,
): number {
  const value = source[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

/**
 * Baut aus den Rohfeldern einer Datei ein `Project`. Fehlt ein Pflichtfeld
 * (`title`), wird die Datei übersprungen statt halb gerendert.
 */
function toProject(
  raw: Record<string, unknown>,
  fallbackSlug: string,
  fallbackDescription: string,
): Project | null {
  const title = readString(raw, 'title');
  if (!title) {
    console.warn(
      `[projects] "${fallbackSlug}" hat kein "title" – Datei wird übersprungen.`,
    );
    return null;
  }

  const description = readString(raw, 'description') ?? fallbackDescription;

  return {
    slug: readString(raw, 'slug') ?? fallbackSlug,
    title,
    tagline: readString(raw, 'tagline') ?? '',
    description,
    repo: readString(raw, 'repo'),
    liveUrl: readString(raw, 'liveUrl'),
    screenshot: readString(raw, 'screenshot'),
    techStack: readStringArray(raw, 'techStack'),
    featured: readBoolean(raw, 'featured'),
    order: readNumber(raw, 'order', Number.MAX_SAFE_INTEGER),
  };
}

/** Frontmatter + Fließtext einer MDX-Datei bzw. das Objekt einer JSON-Datei. */
function parseFile(
  fileName: string,
  source: string,
): { raw: Record<string, unknown>; body: string } | null {
  const extension = path.extname(fileName);

  if (extension === '.json') {
    const parsed: unknown = JSON.parse(source);
    if (!isRecord(parsed)) return null;
    return { raw: parsed, body: '' };
  }

  const parsed = matter(source);
  // `gray-matter` liefert die Frontmatter untypisiert – hier auf `unknown`
  // heruntergezogen und anschließend feldweise validiert.
  const data: Record<string, unknown> = isRecord(parsed.data) ? parsed.data : {};
  return { raw: data, body: parsed.content.trim() };
}

// ——— Screenshots ——————————————————————————————————————————————

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/**
 * Prüft, ob ein lokal referenzierter Screenshot wirklich unter `public/`
 * liegt. Fehlt die Datei – etwa weil `npm run screenshots` noch nicht
 * gelaufen ist – wird `null` zurückgegeben und die Karte zeigt ihr
 * Initialen-Motiv, statt ein kaputtes Bild zu rendern.
 *
 * Absolute URLs werden durchgereicht; die prüft Next.js über
 * `images.remotePatterns`.
 */
async function resolveScreenshot(
  screenshot: string | null,
): Promise<string | null> {
  if (!screenshot) return null;
  if (/^https?:\/\//.test(screenshot)) return screenshot;
  if (!screenshot.startsWith('/')) return null;

  try {
    await access(path.join(PUBLIC_DIR, screenshot.replace(/^\//, '')));
    return screenshot;
  } catch {
    return null;
  }
}

// ——— Laden ————————————————————————————————————————————————————

/**
 * Liest alle kuratierten Projekte. Ein fehlendes oder leeres Verzeichnis
 * ergibt eine leere Liste, kaputte Einzeldateien werden übersprungen.
 */
export async function getProjects(): Promise<Project[]> {
  let fileNames: string[];

  try {
    fileNames = await readdir(PROJECTS_DIR);
  } catch {
    console.warn(`[projects] Verzeichnis nicht lesbar: ${PROJECTS_DIR}`);
    return [];
  }

  const relevant = fileNames.filter(
    (fileName) =>
      !fileName.startsWith('.') &&
      !fileName.startsWith('_') &&
      fileName.toLowerCase() !== 'readme.md' &&
      SUPPORTED_EXTENSIONS.some((extension) => fileName.endsWith(extension)),
  );

  const projects: Project[] = [];

  for (const fileName of relevant) {
    try {
      const source = await readFile(path.join(PROJECTS_DIR, fileName), 'utf8');
      const parsed = parseFile(fileName, source);
      if (!parsed) continue;

      const fallbackSlug = fileName.replace(/\.(json|mdx|md)$/, '');
      const project = toProject(parsed.raw, fallbackSlug, parsed.body);
      if (!project) continue;

      project.screenshot = await resolveScreenshot(project.screenshot);
      projects.push(project);
    } catch (error) {
      console.warn(`[projects] "${fileName}" konnte nicht gelesen werden`, error);
    }
  }

  // Featured zuerst, damit die zweispaltigen Karten oben stehen und im
  // Grid keine Lücken hinterlassen; danach `order`, zuletzt alphabetisch.
  return projects.sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      a.order - b.order ||
      a.title.localeCompare(b.title, 'de'),
  );
}

/**
 * Kuratierte Projekte plus Live-Daten aus GitHub.
 *
 * Fällt die API aus oder fehlt der Token, bleibt `stats` schlicht `null`
 * und die Karte rendert nur, was kuratiert ist.
 */
export async function getProjectsWithStats(): Promise<ProjectWithStats[]> {
  const projects = await getProjects();

  const repos = projects
    .map((project) => project.repo)
    .filter((repo): repo is string => repo !== null);

  const statsMap = repos.length > 0 ? await fetchRepoStatsMap(repos) : new Map();
  const now = new Date();

  return projects.map((project) => {
    const stats = project.repo ? statsMap.get(project.repo) : undefined;

    if (!stats) {
      return { ...project, stats: null };
    }

    return {
      ...project,
      // Kuratierter Text hat Vorrang; die GitHub-Beschreibung springt nur ein.
      description: project.description || stats.description || '',
      stats: {
        stars: stats.stars,
        starsLabel: new Intl.NumberFormat('de-DE').format(stats.stars),
        languages: stats.languages,
        lastCommitIso: stats.lastCommitIso,
        lastCommitRelative: formatRelativeDate(stats.lastCommitIso, now),
        lastCommitAbsolute: formatAbsoluteDate(stats.lastCommitIso),
        repoUrl: stats.repoUrl,
      },
    };
  });
}
