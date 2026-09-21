/**
 * Screenshots für die Projektkarten aufnehmen.
 *
 * Liest `content/projects/*.{json,mdx,md}`, ruft für jedes Projekt mit
 * `liveUrl` die Seite in einem Headless-Chromium auf und legt den
 * Screenshot unter `public/images/projects/<slug>.png` ab – im Format
 * 1280 × 720 (16:9), passend zur `aspect-video`-Fläche der Karte.
 *
 * Voraussetzung: Die Live-URLs müssen öffentlich erreichbar sein. Bei
 * Vercel-Projekten mit Deployment Protection vorher unter
 * Settings → Deployment Protection den Schutz für Production abschalten
 * oder eine eigene Domain verbinden.
 *
 * Aufruf:
 *   npm run screenshots
 *   npm run screenshots -- --only=digital-trainer
 *   npm run screenshots -- --force        (auch vorhandene neu aufnehmen)
 *
 * Die passenden Production-URLs findest du mit `vercel project ls`
 * bzw. `vercel inspect <projekt>` und trägst sie als `liveUrl` ein.
 */

import { readdir, readFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';
import sharp from 'sharp';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, 'content', 'projects');
const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'projects');

/** Zielmaße der Karte: 16:9. Aufgenommen wird in doppelter Auflösung. */
const WIDTH = 1280;
const HEIGHT = 720;
const SCALE = 2;

/** Wartezeit nach `networkidle`, damit Fonts und Einblendungen sitzen. */
const SETTLE_MS = 1500;
const NAV_TIMEOUT_MS = 45_000;

// ——— Argumente ————————————————————————————————————————————————

const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyArg = args.find((arg) => arg.startsWith('--only='));
const only = onlyArg ? onlyArg.slice('--only='.length) : null;

// ——— Projektdateien lesen ——————————————————————————————————————

async function readProjects() {
  const fileNames = await readdir(PROJECTS_DIR);
  const projects = [];

  for (const fileName of fileNames) {
    if (fileName.startsWith('.') || fileName.startsWith('_')) continue;
    if (fileName.toLowerCase() === 'readme.md') continue;
    if (!/\.(json|mdx|md)$/.test(fileName)) continue;

    const source = await readFile(path.join(PROJECTS_DIR, fileName), 'utf8');
    const data =
      path.extname(fileName) === '.json'
        ? JSON.parse(source)
        : matter(source).data;

    const slug = data.slug || fileName.replace(/\.(json|mdx|md)$/, '');
    projects.push({ slug, title: data.title || slug, liveUrl: data.liveUrl });
  }

  return projects.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

// ——— Aufnahme ————————————————————————————————————————————————

async function capture(context, project) {
  const target = path.join(OUTPUT_DIR, `${project.slug}.png`);

  if (!force && (await exists(target))) {
    return { slug: project.slug, status: 'übersprungen (existiert)' };
  }

  const page = await context.newPage();

  try {
    const response = await page.goto(project.liveUrl, {
      waitUntil: 'networkidle',
      timeout: NAV_TIMEOUT_MS,
    });

    if (response && !response.ok()) {
      return {
        slug: project.slug,
        status: `HTTP ${response.status()}`,
        failed: true,
      };
    }

    // Webfonts fertig laden lassen, sonst landet die Fallback-Schrift im Bild.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(SETTLE_MS);

    const buffer = await page.screenshot({ type: 'png' });

    await sharp(buffer)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'top' })
      .png({ compressionLevel: 9 })
      .toFile(target);

    return { slug: project.slug, status: `gespeichert → ${target}` };
  } catch (error) {
    return { slug: project.slug, status: error.message, failed: true };
  } finally {
    await page.close();
  }
}

// ——— Hauptlauf ————————————————————————————————————————————————

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const all = await readProjects();
  const targets = all.filter(
    (project) => project.liveUrl && (!only || project.slug === only),
  );

  if (targets.length === 0) {
    console.log(
      only
        ? `Kein Projekt mit slug "${only}" und gesetzter liveUrl gefunden.`
        : 'Kein Projekt mit gesetzter liveUrl gefunden.',
    );
    const withoutUrl = all.filter((project) => !project.liveUrl);
    if (withoutUrl.length > 0) {
      console.log(
        `Ohne liveUrl: ${withoutUrl.map((p) => p.slug).join(', ')}`,
      );
    }
    return;
  }

  // Normalfall: der von `npx playwright install chromium` geholte Browser.
  // In Umgebungen mit vorinstalliertem Chromium (CI-Images, Container) lässt
  // sich der Pfad über PLAYWRIGHT_CHROMIUM_PATH vorgeben.
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
  const browser = await chromium.launch({ executablePath });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
    // Animationen anhalten, damit kein Zwischenzustand im Bild landet.
    reducedMotion: 'reduce',
    locale: 'de-DE',
  });

  const results = [];

  for (const project of targets) {
    process.stdout.write(`→ ${project.slug} … `);
    const result = await capture(context, project);
    console.log(result.status);
    results.push(result);
  }

  await context.close();
  await browser.close();

  const failed = results.filter((result) => result.failed);
  console.log(
    `\nFertig: ${results.length - failed.length}/${results.length} erfolgreich.`,
  );

  if (failed.length > 0) {
    console.log(
      `Fehlgeschlagen: ${failed.map((result) => result.slug).join(', ')}`,
    );
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
