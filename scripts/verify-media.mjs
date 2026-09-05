import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const manifest = JSON.parse(fs.readFileSync('content/assets/cloudinary.json', 'utf8'));
const selected = JSON.parse(fs.readFileSync('lib/editorial/media-assets.json', 'utf8'));
const allowed = Object.values(manifest.ordner).flat();
for (const [id, asset] of Object.entries(selected)) {
  const original = allowed.find(item => item.id === id);
  assert(original, `Asset not in approved folders: ${id}`);
  assert.equal(asset.alt, original.alt, `${id}: alt changed`);
  assert.equal(asset.caption, original.bildunterschrift, `${id}: caption changed`);
  assert.equal(asset.url, original.poster_url || original.url_muster, `${id}: URL changed`);
  assert.equal(asset.publicId, original.public_id);
}
const blocked = Array.isArray(manifest.gesperrt) ? manifest.gesperrt : Object.values(manifest.gesperrt).flat();
let scanned = 0;
for (const root of ['.next/server/app', '.next/static']) {
  for (const relative of fs.readdirSync(root, { recursive: true })) {
    const file = path.join(root, relative);
    if (!/\.(?:html|js|json|rsc|txt)$/.test(file) || !fs.statSync(file).isFile()) continue;
    const source = fs.readFileSync(file, 'utf8');
    for (const asset of blocked) {
      if (asset.public_id) assert(!source.includes(asset.public_id), `Blocked asset in ${file}`);
    }
    assert(!/data-placeholder=/.test(source), `Media placeholder in ${file}`);
    scanned++;
  }
}
const videos = [];
for (const file of ['public/scrub/hawaii-flug.mp4', 'public/scrub/hawaii-flug-mobile.mp4']) {
  const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file], { encoding: 'utf8' }));
  assert(!probe.streams.some(stream => stream.codec_type === 'audio'), `${file}: audio track`);
  assert.equal(probe.streams[0].codec_name, 'h264');
  const frames = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_frames', '-show_entries', 'frame=key_frame', '-of', 'json', file], { encoding: 'utf8' })).frames;
  const keyframes = frames.flatMap((frame, index) => frame.key_frame ? [index] : []);
  const maximumGop = file.includes('mobile') ? 4 : 8;
  assert(keyframes.slice(1).every((frame, index) => frame - keyframes[index] <= maximumGop), `${file}: sparse keyframes`);
  assert(fs.statSync(file).size < 5 * 1024 * 1024, `${file}: over 5 MB`);
  videos.push({ file, bytes: fs.statSync(file).size, duration: Number(probe.format.duration) });
}
for (const [copy, original] of [['public/scrollcraft.js', '.agents/skills/scroll-craft/engine/scrollcraft.js'], ['lib/scrollcraft/scrollcraft.css', '.agents/skills/scroll-craft/engine/scrollcraft.css']]) {
  assert(fs.readFileSync(copy).equals(fs.readFileSync(original)), `Engine changed: ${copy}`);
}
console.log(JSON.stringify({ approvedAssets: Object.keys(selected).length, blockedAssetsChecked: blocked.length, buildFilesScanned: scanned, videos }, null, 2));
