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

## Screenshots

Ablage: `public/images/projects/`. Empfohlen ist 16:9 (z. B. 1280 × 720),
damit nichts beschnitten wird. Ohne `screenshot` zeigt die Karte ein
Navy-Motiv mit den Initialen des Projekttitels.

Externe Bild-URLs brauchen einen passenden Eintrag unter
`images.remotePatterns` in `next.config.ts`.
