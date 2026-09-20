// Liest den aktuellen Stand aus der Cloudinary Admin API und schreibt das Repo-Manifest.
// Wiederholbar: nach jeder Aenderung in Cloudinary erneut laufen lassen.
import fs from 'node:fs';
import path from 'node:path';

import 'dotenv/config';

const CN = process.env.CLOUDINARY_CLOUD_NAME;
const K = process.env.CLOUDINARY_API_KEY;
const S = process.env.CLOUDINARY_API_SECRET;
if (!CN || !K || !S) {
  console.error('Cloudinary-Zugangsdaten fehlen. Sie stehen in .env (gitignored).');
  process.exit(1);
}
const AUTH = 'Basic ' + Buffer.from(`${K}:${S}`).toString('base64');
const OUT = new URL('../content/assets/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const HEUTE = new Date().toISOString().slice(0, 10);

async function alle(rt) {
  const out = [];
  let cursor = '';
  do {
    const u = new URL(`https://api.cloudinary.com/v1_1/${CN}/resources/${rt}`);
    u.searchParams.set('max_results', '500');
    u.searchParams.set('context', 'true');
    u.searchParams.set('tags', 'true');
    if (cursor) u.searchParams.set('next_cursor', cursor);
    const r = await fetch(u, { headers: { Authorization: AUTH } });
    const j = await r.json();
    if (j.error) throw new Error(j.error.message);
    out.push(...j.resources.map((x) => ({ ...x, rt })));
    cursor = j.next_cursor || '';
  } while (cursor);
  return out;
}

const roh = [...(await alle('image')), ...(await alle('video'))]
  .filter((r) => !(r.asset_folder || '').startsWith('samples') && !r.public_id.startsWith('samples/'));

const base = (rt) => `https://res.cloudinary.com/${CN}/${rt}/upload`;

function eintrag(r) {
  const c = r.context?.custom || {};
  const e = {
    id: r.display_name || r.public_id.split('/').pop(),
    typ: r.rt === 'video' ? 'video' : 'bild',
    ordner: r.asset_folder || '',
    alt: c.alt || null,
    bildunterschrift: c.caption || null,
    tags: r.tags || [],
    breite: r.width,
    hoehe: r.height,
    ausrichtung: r.height > r.width ? 'hochformat' : (r.width === r.height ? 'quadratisch' : 'querformat'),
    public_id: r.public_id,
    url_muster: r.rt === 'video'
      ? `${base('video')}/f_auto,q_auto/${r.public_id}.mp4`
      : `${base('image')}/f_auto,q_auto,w_{BREITE}/${r.public_id}`,
  };
  if (r.rt === 'video') {
    e.poster_url = `${base('video')}/f_auto,q_auto,so_1,w_{BREITE}/${r.public_id}.jpg`;
    e.hinweis = 'Fuer Scroll-Scrubbing lokal mit dichtem GOP neu kodieren, siehe scripts/encode.sh im Skill.';
  }
  if (String(r.format).toLowerCase() === 'heic') {
    e.hinweis = 'HEIC. Nur ueber f_auto ausliefern, Browser koennen das Original nicht anzeigen.';
  }
  return e;
}

const gesperrtP = (r) => (r.asset_folder || '').startsWith('nicht-verwenden')
  || (r.asset_folder || '').startsWith('privat')
  || (r.tags || []).includes('nicht-verwenden');

const nutzbar = roh.filter((r) => !gesperrtP(r));
const gesperrt = roh.filter(gesperrtP);

const gruppen = {};
for (const r of nutzbar) (gruppen[r.asset_folder || ''] ||= []).push(eintrag(r));
for (const k of Object.keys(gruppen)) gruppen[k].sort((a, b) => a.id.localeCompare(b.id));

const manifest = {
  hinweis: 'Generiert aus der Cloudinary Admin API. Nicht von Hand bearbeiten.',
  erzeugt: HEUTE,
  cloud_name: CN,
  auslieferung: {
    regel: 'Immer f_auto,q_auto und eine explizite Breite. Niemals das Original ohne Transformation einbinden.',
    next_image: `next.config.ts erlaubt res.cloudinary.com/${CN}/**.`,
    breiten_empfehlung: [640, 960, 1280, 1920],
  },
  bestand: { nutzbar: nutzbar.length, gesperrt: gesperrt.length, gesamt: roh.length },
  ordner: gruppen,
  gesperrt: gesperrt.map((r) => ({
    id: r.display_name || r.public_id.split('/').pop(),
    ordner: r.asset_folder || '',
    public_id: r.public_id,
    grund: (r.asset_folder || '').startsWith('privat') ? 'privat, gehoert nicht auf die oeffentliche Seite'
      : (r.tags || []).includes('dublette') ? 'Dublette eines anderen Assets'
      : 'Fremdmaterial, Urheberrecht ungeklaert',
  })),
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'cloudinary.json'), JSON.stringify(manifest, null, 2) + '\n');

const L = [];
L.push('# Bildbestand Cloudinary', '');
L.push(`Generiert am ${HEUTE} aus der Cloudinary Admin API. **Nicht von Hand bearbeiten** —`);
L.push('die Wahrheit steht in Cloudinary, diese Datei ist nur die Lesefassung.', '');
L.push(`Cloud: \`${CN}\` · nutzbar: **${nutzbar.length}** · gesperrt: **${gesperrt.length}**`, '');
L.push('Auslieferung immer über `f_auto,q_auto` und eine explizite Breite:', '');
L.push('```');
L.push(`https://res.cloudinary.com/${CN}/image/upload/f_auto,q_auto,w_1280/<public_id>`);
L.push('```', '');
for (const k of Object.keys(gruppen).sort()) {
  L.push(`## ${k}`, '');
  L.push('| Name | Typ | Format | Bildunterschrift | Tags |');
  L.push('|---|---|---|---|---|');
  for (const e of gruppen[k]) L.push(`| \`${e.id}\` | ${e.typ} | ${e.ausrichtung} | ${e.bildunterschrift || ''} | ${e.tags.join(', ')} |`);
  L.push('');
}
L.push('## Gesperrt — nicht einsetzen', '');
L.push('| Name | Ordner | Grund |');
L.push('|---|---|---|');
for (const g of manifest.gesperrt) L.push(`| \`${g.id}\` | ${g.ordner} | ${g.grund} |`);
L.push('');
fs.writeFileSync(path.join(OUT, 'BILDBESTAND.md'), L.join('\n'));

console.log('nutzbar', nutzbar.length, '| gesperrt', gesperrt.length, '| gesamt', roh.length);
for (const k of Object.keys(gruppen).sort()) console.log('  ' + k.padEnd(30) + gruppen[k].length);
const ohne = Object.values(gruppen).flat().filter((a) => !a.alt || !a.bildunterschrift);
console.log('nutzbare ohne Alt/Bildunterschrift:', ohne.length, ohne.map((x) => x.id).join(' '));
