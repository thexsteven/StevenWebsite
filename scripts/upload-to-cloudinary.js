#!/usr/bin/env node
'use strict';

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ROOT = path.resolve(__dirname, '..');
const MAP_FILE = path.join(__dirname, 'cloudinary-map.json');

// Directories to never descend into
const EXCLUDE_DIRS = new Set(['node_modules', 'HawaiiAufnahmen', '.git', '.claude', 'scripts']);

// Supported media extensions for upload
const MEDIA_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.webm', '.svg']);

// ---------------------------------------------------------------------------
// Phase 1 – Scan: collect all local src= values from HTML files
// ---------------------------------------------------------------------------

function findHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) {
        results.push(...findHtmlFiles(path.join(dir, entry.name)));
      }
    } else if (entry.name.endsWith('.html')) {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

/**
 * Extract all src="..." values from <img>, <video>, <source> tags.
 * Returns array of { srcValue, htmlFile }.
 */
function extractSrcs(htmlFile) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const refs = [];
  // Match src="..." in img, video, source tags
  const re = /<(?:img|video|source)[^>]+\bsrc="([^"]+)"/gi;
  let m;
  while ((m = re.exec(content)) !== null) {
    refs.push(m[1]);
  }
  return refs;
}

function isExternal(src) {
  return /^https?:\/\//i.test(src) || src.startsWith('//');
}

function resolveAbsPath(htmlFile, srcValue) {
  // Normalize Windows backslashes
  const normalized = srcValue.replace(/\\/g, '/');
  return path.resolve(path.dirname(htmlFile), normalized);
}

function buildPublicId(absPath) {
  // Relative to repo root, no extension, spaces → _, remove ()
  const rel = path.relative(ROOT, absPath).replace(/\\/g, '/');
  const noExt = rel.replace(/\.[^/.]+$/, '');
  return noExt.replace(/ /g, '_').replace(/[()]/g, '');
}

// ---------------------------------------------------------------------------
// Phase 2 – Upload
// ---------------------------------------------------------------------------

const MAX_BYTES = 9 * 1024 * 1024; // 9 MB — stay under Cloudinary's 10 MB free limit
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

/** Returns a path to upload: original if small enough, else a compressed temp JPEG. */
async function prepareFile(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!IMAGE_EXTS.has(ext)) return { uploadPath: absPath, tmpFile: null };

  const size = fs.statSync(absPath).size;
  if (size <= MAX_BYTES) return { uploadPath: absPath, tmpFile: null };

  // Compress to JPEG via sharp
  const tmpFile = path.join(os.tmpdir(), `cld_${path.basename(absPath)}.jpg`);
  await sharp(absPath)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(tmpFile);
  return { uploadPath: tmpFile, tmpFile };
}

async function uploadFile(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!MEDIA_EXTS.has(ext)) return null;
  if (!fs.existsSync(absPath)) return null;

  const publicId = buildPublicId(absPath);
  const { uploadPath, tmpFile } = await prepareFile(absPath);

  try {
    const result = await cloudinary.uploader.upload(uploadPath, {
      public_id:     publicId,
      resource_type: 'auto',
      overwrite:     false,
    });
    return result.secure_url;
  } catch (err) {
    throw new Error(`Upload failed for ${absPath}: ${err.message}`);
  } finally {
    if (tmpFile && fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
}

// ---------------------------------------------------------------------------
// Phase 3 – HTML update
// ---------------------------------------------------------------------------

function updateHtml(htmlFile, mapping) {
  let content = fs.readFileSync(htmlFile, 'utf8');
  let changed = false;

  // Replace src="..." values
  content = content.replace(/(<(?:img|video|source)[^>]+\bsrc=)"([^"]+)"/gi, (match, prefix, srcValue) => {
    if (isExternal(srcValue)) return match;
    const absPath = resolveAbsPath(htmlFile, srcValue);
    const url = mapping[absPath];
    if (!url) return match;
    changed = true;
    return `${prefix}"${url}"`;
  });

  // Fix type="video/quicktime" → type="video/mp4" for MOV sources that are now Cloudinary URLs
  content = content.replace(/type="video\/quicktime"/gi, (match, offset) => {
    // Only replace if the surrounding source tag now has a cloudinary URL
    const surrounding = content.substring(Math.max(0, offset - 200), offset + 50);
    if (/res\.cloudinary\.com/.test(surrounding)) {
      changed = true;
      return 'type="video/mp4"';
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(htmlFile, content, 'utf8');
  }
  return changed;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('ERROR: Cloudinary credentials missing. Copy .env.example to .env and fill in your values.');
    process.exit(1);
  }

  console.log('=== Phase 1: Scanning HTML files for media references ===\n');

  const htmlFiles = findHtmlFiles(ROOT);
  console.log(`Found ${htmlFiles.length} HTML files.`);

  // Collect unique absolute paths
  const pathSet = new Set();
  for (const htmlFile of htmlFiles) {
    for (const src of extractSrcs(htmlFile)) {
      if (isExternal(src)) continue;
      const abs = resolveAbsPath(htmlFile, src);
      const ext = path.extname(abs).toLowerCase();
      if (MEDIA_EXTS.has(ext)) {
        pathSet.add(abs);
      }
    }
  }

  const mediaPaths = [...pathSet];
  console.log(`Found ${mediaPaths.length} unique local media references.\n`);

  // Load existing map to skip already-uploaded files
  let mapping = {};
  if (fs.existsSync(MAP_FILE)) {
    mapping = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
    const cached = mediaPaths.filter(p => mapping[p]).length;
    if (cached > 0) console.log(`Skipping ${cached} already-uploaded files (cached in cloudinary-map.json).\n`);
  }

  console.log('=== Phase 2: Uploading to Cloudinary ===\n');

  let uploaded = 0;
  let skipped = 0;
  const errors = [];

  for (const absPath of mediaPaths) {
    if (mapping[absPath]) {
      skipped++;
      continue;
    }
    if (!fs.existsSync(absPath)) {
      console.warn(`  SKIP (not found): ${path.relative(ROOT, absPath)}`);
      skipped++;
      continue;
    }
    try {
      process.stdout.write(`  Uploading: ${path.relative(ROOT, absPath)} ... `);
      const url = await uploadFile(absPath);
      if (url) {
        mapping[absPath] = url;
        uploaded++;
        console.log('OK');
      } else {
        console.log('SKIPPED (unsupported type)');
        skipped++;
      }
    } catch (err) {
      console.log('ERROR');
      errors.push(err.message);
    }
  }

  // Save mapping after uploads
  fs.writeFileSync(MAP_FILE, JSON.stringify(mapping, null, 2), 'utf8');
  console.log(`\nSaved mapping to scripts/cloudinary-map.json`);

  console.log('\n=== Phase 3: Updating HTML files ===\n');

  let updatedHtml = 0;
  for (const htmlFile of htmlFiles) {
    const changed = updateHtml(htmlFile, mapping);
    if (changed) {
      console.log(`  Updated: ${path.relative(ROOT, htmlFile)}`);
      updatedHtml++;
    }
  }

  console.log('\n=== Report ===\n');
  console.log(`  Uploaded:       ${uploaded} files`);
  console.log(`  Skipped:        ${skipped} files`);
  console.log(`  HTML updated:   ${updatedHtml} files`);
  if (errors.length > 0) {
    console.log(`\n  ERRORS (${errors.length}):`);
    errors.forEach(e => console.log(`    - ${e}`));
    process.exit(1);
  } else {
    console.log('\nDone. All media is on Cloudinary.');
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
