import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

import {
  isRecord,
  sortNewestFirst,
  toTravelEntry,
  type TravelEntry,
} from '@/lib/travelArchive';

/**
 * Reisedaten aus `content/reisen/` lesen.
 *
 * Eine Datei pro Reise – `.json` oder `.mdx`/`.md` mit Frontmatter, analog zu
 * `content/projects/`. Bei MDX dient der Fließtext als `description`, falls im
 * Frontmatter keine steht.
 *
 * Strikt serverseitig: `server-only` sorgt dafür, dass ein versehentlicher
 * Import aus einer Client-Komponente sofort auffällt, statt `node:fs` still in
 * den Browser-Bundle zu ziehen.
 */

const TRAVEL_DIR = path.join(process.cwd(), 'content', 'reisen');
const SUPPORTED_EXTENSIONS = ['.json', '.mdx', '.md'] as const;

function parseFile(
  fileName: string,
  source: string,
): { raw: Record<string, unknown>; body: string } | null {
  if (path.extname(fileName) === '.json') {
    const parsed: unknown = JSON.parse(source);
    if (!isRecord(parsed)) return null;
    return { raw: parsed, body: '' };
  }

  const parsed = matter(source);
  const data: Record<string, unknown> = isRecord(parsed.data) ? parsed.data : {};
  return { raw: data, body: parsed.content.trim() };
}

/**
 * Liest alle Reisen, neueste zuerst.
 *
 * Ein fehlendes oder leeres Verzeichnis ergibt eine leere Liste, kaputte
 * Einzeldateien werden übersprungen – eine unvollständige Galerie ist besser
 * als eine 500er-Seite.
 */
export async function getTravelEntries(): Promise<TravelEntry[]> {
  let fileNames: string[];

  try {
    fileNames = await readdir(TRAVEL_DIR);
  } catch {
    console.warn(`[reisen] Verzeichnis nicht lesbar: ${TRAVEL_DIR}`);
    return [];
  }

  const relevant = fileNames.filter(
    (fileName) =>
      !fileName.startsWith('.') &&
      !fileName.startsWith('_') &&
      fileName.toLowerCase() !== 'readme.md' &&
      SUPPORTED_EXTENSIONS.some((extension) => fileName.endsWith(extension)),
  );

  const entries: TravelEntry[] = [];

  for (const fileName of relevant) {
    try {
      const source = await readFile(path.join(TRAVEL_DIR, fileName), 'utf8');
      const parsed = parseFile(fileName, source);
      if (!parsed) continue;

      const fallbackId = fileName.replace(/\.(json|mdx|md)$/, '');
      const entry = toTravelEntry(parsed.raw, fallbackId, parsed.body);
      if (entry) entries.push(entry);
    } catch (error) {
      console.warn(`[reisen] "${fileName}" konnte nicht gelesen werden`, error);
    }
  }

  return sortNewestFirst(entries);
}
