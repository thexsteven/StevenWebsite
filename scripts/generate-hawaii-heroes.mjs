#!/usr/bin/env node
/**
 * generate-hawaii-heroes.mjs
 * ---------------------------------------------------------------------------
 * Generates consistent, clearly-illustrated hero images for the Hawaii
 * sub-pages of braun-steven.de using the OpenAI gpt-image API.
 *
 * The illustration STYLE is fixed here on purpose, so every hero shares the
 * same look. Claude Code only supplies the per-page SCENE (what the place is),
 * never the style.
 *
 * USAGE
 *   export OPENAI_API_KEY=sk-...        # never commit this
 *   node generate-hawaii-heroes.mjs <manifest.json> <outputDir> [--force]
 *
 * MANIFEST FORMAT (manifest.json)
 *   {
 *     "stylePalette": "warm sunset tones with deep ocean blues",   // optional
 *     "pages": [
 *       { "slug": "adventures",
 *         "scene": "the Koko Head Crater Trail on Oahu: a steep straight
 *                   stairway of old railroad ties climbing a volcanic ridge,
 *                   ocean and Honolulu coastline in the distance at dawn" },
 *       { "slug": "big-island", "scene": "..." }
 *     ]
 *   }
 *
 * OUTPUT
 *   <outputDir>/hero-<slug>.png  (one landscape PNG per page)
 *
 * NOTES
 *   - Requires Node 18+ (uses built-in fetch). No npm dependencies.
 *   - gpt-image returns base64; we decode and write the PNG directly.
 *   - Existing files are skipped unless --force is passed.
 * ---------------------------------------------------------------------------
 */

import { writeFile, mkdir, readFile, access } from "node:fs/promises";
import { join } from "node:path";

// --- Config (override via env if needed) -----------------------------------
const API_KEY = process.env.OPENAI_API_KEY;
// Model default: gpt-image-2 (current flagship). gpt-image-1 is being retired
// (Oct 23, 2026), so we avoid it as a default. Override via OPENAI_IMAGE_MODEL,
// e.g. "gpt-image-1-mini" for cheap testing.
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const SIZE = process.env.OPENAI_IMAGE_SIZE || "1536x1024"; // landscape hero
const QUALITY = process.env.OPENAI_IMAGE_QUALITY || "medium"; // low | medium | high | auto
const ENDPOINT = "https://api.openai.com/v1/images/generations";

// --- Fixed illustration style (guarantees cross-page consistency) -----------
const STYLE = [
  "Modern travel-poster illustration in a clean, screen-print-inspired style:",
  "bold flat color shapes with a subtle paper-grain texture, soft layered depth,",
  "gentle gradient skies, an editorial and slightly nostalgic mood.",
  "It must read clearly as a hand-illustrated artwork — NOT a photograph and",
  "NOT photorealistic. Wide cinematic landscape composition designed to work as",
  "a full-width website hero banner, with calm negative space toward the lower",
  "area so a title can sit on top.",
].join(" ");

// Hard guardrails appended to every prompt
const GUARDRAILS = [
  "Absolutely NO people, human figures, faces, or silhouettes.",
  "Absolutely NO text, letters, numbers, captions, signs, logos, or watermarks.",
  "Keep the geography, landscape, and landmarks plausible and recognizable for",
  "the described real location; do not invent fictional landmarks or add",
  "elements that would misrepresent the real place.",
].join(" ");

// --- Helpers ----------------------------------------------------------------
function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function buildPrompt(scene, palette) {
  const paletteLine = palette ? ` Color palette: ${palette}.` : "";
  return `${STYLE}${paletteLine}\n\nScene: ${scene}.\n\n${GUARDRAILS}`;
}

async function generateOne(scene, palette) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: buildPrompt(scene, palette),
      size: SIZE,
      quality: QUALITY,
      n: 1,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image data returned by the API.");
  return Buffer.from(b64, "base64");
}

// --- Main -------------------------------------------------------------------
async function main() {
  if (!API_KEY) fail("OPENAI_API_KEY is not set. Export it before running.");

  const [manifestPath, outDir] = process.argv.slice(2);
  const force = process.argv.includes("--force");
  if (!manifestPath || !outDir) {
    fail("Usage: node generate-hawaii-heroes.mjs <manifest.json> <outputDir> [--force]");
  }

  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (e) {
    fail(`Could not read/parse manifest: ${e.message}`);
  }

  const pages = manifest.pages || [];
  const palette = manifest.stylePalette || "";
  if (!Array.isArray(pages) || pages.length === 0) {
    fail("Manifest has no 'pages' array.");
  }

  await mkdir(outDir, { recursive: true });
  console.log(`\nGenerating ${pages.length} hero image(s) → ${outDir}\n`);

  for (const { slug, scene } of pages) {
    if (!slug || !scene) {
      console.warn(`⚠ Skipping entry with missing slug/scene: ${JSON.stringify({ slug, scene })}`);
      continue;
    }
    const outPath = join(outDir, `hero-${slug}.png`);

    if (!force && (await fileExists(outPath))) {
      console.log(`• ${slug}: exists, skipping (use --force to regenerate)`);
      continue;
    }

    process.stdout.write(`• ${slug}: generating… `);
    try {
      const png = await generateOne(scene, palette);
      await writeFile(outPath, png);
      console.log(`done → ${outPath}`);
    } catch (e) {
      console.log("FAILED");
      console.error(`  ${e.message}`);
    }

    // be gentle with rate limits
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log("\n✔ Finished. Review the PNGs before wiring them in.\n");
}

main();
