# Reisen (`content/reisen/`)

Datenquelle für die passwortgeschützte Galerie unter `/reisen/archiv`.
Eine Datei pro Reise, `.json` oder `.mdx`/`.md` mit Frontmatter — gelesen von
`lib/travelArchive.server.ts`, validiert und formatiert in
`lib/travelArchive.ts`.

## Felder

| Feld          | Pflicht | Bedeutung                                                       |
| ------------- | ------- | --------------------------------------------------------------- |
| `id`          | nein    | Eindeutiger Schlüssel; ohne Angabe der Dateiname ohne Endung.     |
| `title`       | **ja**  | Fehlt er, wird die Datei übersprungen.                            |
| `country`     | nein    | Land oder Region, steht klein über dem Titel.                     |
| `startDate`   | **ja**  | `YYYY-MM-DD`. Bestimmt die Position im Feed.                      |
| `endDate`     | nein    | `YYYY-MM-DD`; ohne Angabe gleich `startDate`.                     |
| `description` | nein    | Ein bis zwei Sätze unter dem Titel.                               |
| `coverImage`  | nein    | Ohne Angabe das erste Bild aus `images`.                          |
| `images`      | nein    | Liste aus `"url"` oder `{ "src": "...", "alt": "..." }`.          |

Ohne `alt` erbt ein Bild den Reisetitel als Beschreibung — dann blendet die
Galerie die Bildunterschrift aus. Ein eigener `alt`-Text erscheint als
Unterschrift unter dem Rahmen.

## Reihenfolge

Neueste Reise zuerst, sortiert nach `startDate`. Bei gleichem Datum
entscheidet die `id`, damit die Reihenfolge nicht vom Dateisystem abhängt.

## Bilder

Fotos gehören nach Cloudinary, nicht ins Repo — `/images/` ist in
`.gitignore` ausgeschlossen. Upload über `npm run upload`
(`scripts/upload-to-cloudinary.js`). Erlaubt sind nur URLs unter
`res.cloudinary.com/dozdjb4fi/**`; das steht als `remotePattern` in
`next.config.ts`. Eine andere Quelle würde `next/image` zur Laufzeit ablehnen.

## Platzhalter

Die Dateien mit `platzhalter` im Namen sind erfunden und dienen nur dazu,
Layout und Scroll-Verhalten zu prüfen. Beim Einpflegen echter Reisen
ersetzen oder löschen.

## Neue Reise anlegen

1. Bilder nach Cloudinary hochladen.
2. Datei `content/reisen/<jahr>-<monat>-<name>.json` anlegen.
3. Fertig — die Galerie liest das Verzeichnis bei jedem Request neu.

Wenn ein Eintrag nicht auftaucht: `title` oder `startDate` fehlt oder das
Datum ist kein gültiges `YYYY-MM-DD`. Der Grund steht als `[reisen]`-Warnung
im Server-Log.
