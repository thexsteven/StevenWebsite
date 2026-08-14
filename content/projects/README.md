# Projekte pflegen

Ein Projekt = eine Datei in diesem Ordner. Erlaubt sind `.json` und
`.mdx`/`.md` (mit Frontmatter). Dateien, die mit `.` oder `_` beginnen,
werden ignoriert – praktisch für Entwürfe.

## Felder

| Feld          | Typ        | Pflicht | Bedeutung                                                                 |
| ------------- | ---------- | ------- | ------------------------------------------------------------------------- |
| `slug`        | `string`   | nein    | Eindeutige ID. Fällt auf den Dateinamen zurück.                            |
| `title`       | `string`   | **ja**  | Projektname. Fehlt er, wird die Datei übersprungen.                        |
| `tagline`     | `string`   | nein    | Eine Zeile, direkt unter dem Titel.                                        |
| `description` | `string`   | nein    | 2–3 Sätze. Bei MDX-Dateien alternativ der Fließtext.                       |
| `repo`        | `string`   | nein    | `owner/name`. Nur damit werden Live-Daten von GitHub geholt.               |
| `liveUrl`     | `string`   | nein    | URL der Live-Demo.                                                         |
| `screenshot`  | `string`   | nein    | Pfad unter `/public` (z. B. `/images/projects/foo.png`) oder absolute URL. |
| `techStack`   | `string[]` | nein    | Badges unter der Beschreibung.                                             |
| `featured`    | `boolean`  | nein    | `true` = Karte spannt sich über zwei Spalten und steht oben.               |
| `order`       | `number`   | nein    | Sortierung innerhalb der Gruppe. Ohne Angabe: alphabetisch am Ende.        |

Sortierung: `featured` zuerst, dann `order` aufsteigend, dann alphabetisch.

## Beispiel – JSON

```json
{
  "slug": "mein-projekt",
  "title": "Mein Projekt",
  "tagline": "Ein Satz, der es auf den Punkt bringt.",
  "description": "Zwei bis drei Sätze zum Was und Warum.",
  "repo": "thexsteven/mein-projekt",
  "liveUrl": "https://beispiel.de",
  "screenshot": "/images/projects/mein-projekt.png",
  "techStack": ["Next.js", "TypeScript"],
  "featured": false,
  "order": 10
}
```

## Beispiel – MDX

```mdx
---
title: Mein Projekt
tagline: Ein Satz, der es auf den Punkt bringt.
repo: thexsteven/mein-projekt
techStack: [Next.js, TypeScript]
order: 10
---

Zwei bis drei Sätze zum Was und Warum. Dieser Fließtext wird als
Beschreibung verwendet, solange im Frontmatter keine `description` steht.
```

## Live-Daten

Steht `repo` drin, holt die Sektion serverseitig Sterne, Sprachverteilung
und den letzten Push von der GitHub-API (stündlich revalidiert). Ohne
`GITHUB_TOKEN`, bei erreichtem Rate-Limit oder bei einem API-Ausfall
rendert die Karte einfach nur die kuratierten Angaben – ohne Fehler und
ohne leere Platzhalter.

> **Nur öffentliche Repos verlinken.** Der „Quellcode"-Link zeigt direkt
> auf GitHub. Bei einem privaten Repo landen Besucher auf einer
> 404-Seite. Für private Projekte mit öffentlichem Deployment deshalb
> `repo` auf `null` lassen und nur `liveUrl` setzen – die Karte zeigt
> dann keine Live-Daten, aber einen funktionierenden Demo-Link.

### GitHub-Token anlegen

Optional, aber empfohlen: ohne Token erlaubt GitHub 60 Anfragen pro
Stunde und IP, mit Token 5.000.

1. <https://github.com/settings/personal-access-tokens/new> öffnen
   (Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token).
2. **Token name**: z. B. `braun-steven.de – Projektkarten`.
3. **Expiration**: 90 Tage oder länger. Nach Ablauf muss der Token
   erneuert werden – die Seite fällt dann still auf die kuratierten
   Daten zurück.
4. **Repository access**: `Public Repositories (read-only)`. Mehr
   Rechte braucht die Sektion nicht.
5. **Permissions**: nichts zusätzlich anhaken – Lesezugriff auf
   öffentliche Repos ist bereits enthalten.
6. `Generate token` klicken und den Wert sofort kopieren; er wird nur
   einmal angezeigt.

Lokal in `.env.local` im Projektwurzelverzeichnis eintragen (die Datei
ist über `.gitignore` ausgeschlossen):

```bash
GITHUB_TOKEN=github_pat_...
```

Auf Vercel: Projekt → Settings → Environment Variables → `GITHUB_TOKEN`
mit demselben Wert für Production, Preview und Development anlegen,
danach einmal neu deployen. Der Token wird ausschließlich in
`lib/github.ts` serverseitig gelesen und ist ohne `NEXT_PUBLIC_`-Präfix
für den Browser nicht sichtbar.

## Screenshots

Ablage: `public/images/projects/<slug>.png`, Format 16:9 (1280 × 720).

Der Pfad darf eingetragen sein, bevor die Datei existiert: Beim Laden
wird geprüft, ob das Bild wirklich unter `public/` liegt. Fehlt es,
zeigt die Karte ein Navy-Motiv mit den Initialen des Projekttitels
statt eines kaputten Bildes. Sobald die Datei da ist, erscheint sie beim
nächsten Build automatisch – ohne Änderung an der Projektdatei.

Für Projekte mit `liveUrl` nimmt ein Skript die Bilder automatisch auf:

```bash
npx playwright install chromium   # einmalig
npm run screenshots               # alle fehlenden aufnehmen
npm run screenshots -- --only=digital-trainer
npm run screenshots -- --force    # vorhandene neu aufnehmen
```

Das Skript liest die `liveUrl` aus den Dateien in diesem Ordner, ruft
jede Seite in einem Headless-Chromium auf (1280 × 720, doppelte
Auflösung, Animationen aus) und skaliert das Ergebnis auf 1280 × 720.

Zwei Stolpersteine:

- **Deployment Protection.** Steht ein Vercel-Projekt auf „Standard
  Protection", antwortet es mit 401 und das Skript meldet den Fehler.
  Unter Settings → Deployment Protection für Production abschalten oder
  eine eigene Domain verbinden.
- **Production-URL finden.** `vercel project ls` listet alle Projekte,
  `vercel inspect <projekt>` zeigt die Production-Domain. Diese URL als
  `liveUrl` eintragen.

Externe Bild-URLs statt lokaler Dateien brauchen einen passenden
Eintrag unter `images.remotePatterns` in `next.config.ts`. Für Bilder
unter `public/` ist nichts zu konfigurieren.
