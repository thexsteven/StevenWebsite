#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PBKDF2_ITERATIONS = 600000;
const SOURCE_DIR = path.resolve(__dirname, '..', '_love-source');
const OUT_DIR = path.resolve(__dirname, '..', 'encrypted');
const CLOUD_NAME = 'dozdjb4fi';

const FILE_MAP = {
  '00_prolog.md': 'prolog.enc',
  '01_kapitel.md': 'kapitel-01.enc',
  '02_kapitel.md': 'kapitel-02.enc',
  '03_kapitel.md': 'kapitel-03.enc',
  '04_kapitel.md': 'kapitel-04.enc',
  '05_epilog.md': 'epilog.enc',
};

const password = process.env.LOVE_PW;
if (!password) {
  console.error('Error: set LOVE_PW environment variable');
  console.error('Example: LOVE_PW=Adelina node scripts/encrypt-love.js');
  process.exit(1);
}

const escapeHtml = (s) => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const inlineFormat = (text) => {
  let out = escapeHtml(text);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return out;
};

const cloudinaryImageUrl = (publicId, opts = {}) => {
  const transform = opts.transform || 'f_auto,q_auto,w_1400,c_limit';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${publicId}`;
};

const cloudinaryVideoUrl = (publicId, opts = {}) => {
  const transform = opts.transform || 'f_auto,q_auto,w_1400';
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transform}/${publicId}`;
};

const cloudinaryPosterUrl = (publicId) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0,f_jpg,q_auto,w_1400/${publicId}.jpg`;

const renderMediaLine = (line) => {
  const m = line.match(/^!\[([^\]]*)\]\(cloudinary(?:-(image|video))?:([^)\s]+)(?:\s+(.+))?\)\s*$/);
  if (!m) return null;
  const [, caption, kind, publicId, optsRaw] = m;
  const opts = {};
  if (optsRaw) {
    optsRaw.split(/\s+/).forEach((kv) => {
      const [k, v] = kv.split('=');
      if (k && v) opts[k] = v;
    });
  }
  const captionHtml = caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : '';
  const sizeClass = opts.size ? ` is-${opts.size}` : '';
  if (kind === 'video') {
    const src = cloudinaryVideoUrl(publicId, opts);
    const poster = cloudinaryPosterUrl(publicId);
    const autoplay = opts.autoplay === '1';
    const attrs = autoplay
      ? 'autoplay muted loop playsinline preload="auto"'
      : 'controls playsinline preload="metadata"';
    return `<figure class="story-figure${sizeClass}"><video ${attrs} poster="${poster}"><source src="${src}" type="video/mp4">Dein Browser unterstuetzt kein Video-Tag.</video>${captionHtml}</figure>`;
  }
  const src = cloudinaryImageUrl(publicId, opts);
  const alt = caption ? escapeHtml(caption) : '';
  return `<figure class="story-figure${sizeClass}"><img src="${src}" alt="${alt}" loading="lazy" />${captionHtml}</figure>`;
};

const renderMarkdown = (md) => {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let paragraph = [];
  let inBlockquote = false;
  let blockquoteLines = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    out.push('<p>' + inlineFormat(paragraph.join(' ')) + '</p>');
    paragraph = [];
  };
  const flushBlockquote = () => {
    if (blockquoteLines.length === 0) return;
    out.push('<blockquote>' + inlineFormat(blockquoteLines.join(' ')) + '</blockquote>');
    blockquoteLines = [];
    inBlockquote = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (line === '') {
      flushParagraph();
      flushBlockquote();
      continue;
    }
    if (/^---+$/.test(line)) {
      flushParagraph();
      flushBlockquote();
      out.push('<hr class="love-divider" />');
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushBlockquote();
      const level = heading[1].length;
      out.push(`<h${level} class="story-h${level}">${inlineFormat(heading[2])}</h${level}>`);
      continue;
    }
    if (line.startsWith('>')) {
      flushParagraph();
      inBlockquote = true;
      blockquoteLines.push(line.replace(/^>\s?/, ''));
      continue;
    }
    const media = renderMediaLine(line);
    if (media) {
      flushParagraph();
      flushBlockquote();
      out.push(media);
      continue;
    }
    if (/^<iframe\b[^>]*>\s*<\/iframe>\s*$/i.test(line)) {
      flushParagraph();
      flushBlockquote();
      out.push(`<figure class="story-figure story-map">${line}</figure>`);
      continue;
    }
    if (inBlockquote) {
      blockquoteLines.push(line);
      continue;
    }
    paragraph.push(line);
  }
  flushParagraph();
  flushBlockquote();
  return out.join('\n');
};

const encrypt = (plaintext, pw) => {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(pw, salt, PBKDF2_ITERATIONS, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    v: 1,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ct: Buffer.concat([ct, tag]).toString('base64'),
  };
};

if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`Source dir missing: ${SOURCE_DIR}`);
  process.exit(1);
}
fs.mkdirSync(OUT_DIR, { recursive: true });

let count = 0;
for (const [src, dst] of Object.entries(FILE_MAP)) {
  const srcPath = path.join(SOURCE_DIR, src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`skip (missing): ${src}`);
    continue;
  }
  const md = fs.readFileSync(srcPath, 'utf8');
  const html = renderMarkdown(md);
  const payload = encrypt(html, password);
  fs.writeFileSync(path.join(OUT_DIR, dst), JSON.stringify(payload));
  console.log(`encrypted: ${src} -> encrypted/${dst} (${html.length} chars plain, ${payload.ct.length} chars b64)`);
  count++;
}
console.log(`done: ${count} files written to ${OUT_DIR}`);
