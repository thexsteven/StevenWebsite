# Reise-Subpage: Passwortgeschützte Scroll-Galerie (2021–heute)

## Ziel
Neue Subpage innerhalb der bestehenden Reise-Sektion auf braun-steven.de, die alle Reisen seit 2021 in einem durchgehenden, scrollbaren Foto-Feed zeigt. Zugriff nur mit Passwort.

## Stack (bestehend)
- Next.js 14+ App Router, TypeScript, Tailwind, MDX, Framer Motion
- Deployment: Vercel, DNS via IONOS

## Design-Referenz: "Cosmos" (Refero Styles)
- Link: https://styles.refero.design/style/eb804e3a-1b75-446c-8374-114bbabaf0cd
- Charakter: helle, ruhige Galeriewand-Optik (Leinen-/Museums-Look), Fotos wirken wie schwebende Rahmen/Kacheln, dezenter Hover (leichtes Anheben + Schatten), reduzierte, ruhige Typografie
- Umsetzung in Claude Code: entweder das Refero-Skill/MCP installieren (`referodesign/refero_skill`), damit Claude Code die DESIGN.md live zieht, oder die DESIGN.md manuell von obigem Link kopieren und als Kontext mitgeben

## Route & Einbindung
- Vorschlag: `/reisen/archiv` (Slug ggf. anpassen an bestehende Struktur der Reise-Sektion)
- Muss von der bestehenden Reise-Übersichtsseite aus verlinkt werden

## Auth (ein gemeinsames Passwort, serverseitig geprüft)
- Next.js Middleware prüft ein httpOnly Session-Cookie
- Ablauf: Passwort-Formular → Server Action/Route Handler vergleicht gegen ein Secret aus den Vercel Environment Variables (z. B. `TRAVEL_PAGE_PASSWORD`, nicht im Repo) → setzt httpOnly + secure Cookie mit Ablaufzeit → Middleware schützt `/reisen/archiv/*` und leitet ohne gültiges Cookie zur Login-Seite um
- Bewusst simpel (ein Passwort, kein Multi-User-System), aber nicht nur clientseitig versteckt

## Content-Struktur (erstmal Platzhalter)
- Ein Eintrag pro Reise als MDX oder JSON: `id, title, country, startDate, endDate, description, coverImage, images[]`
- Start mit 3–5 Platzhalter-Reisen (Dummy-Bilder/Lorem Ipsum), um Layout & Scroll-Verhalten zu testen — echte Inhalte kommen später

## Scroll-Verhalten
- Chronologisch durch alle Reisen (Reihenfolge alt→neu oder neu→alt noch final festlegen)
- Framer Motion für sanftes Ein-/Ausblenden passend zum Cosmos-Stil (Kacheln "schweben" beim Scrollen ein)

## Empfohlene Claude Code Skills (mattpocock/skills)
Installation falls noch nicht vorhanden:
```
npx skills add mattpocock/skills --agent claude-code
```
Empfohlene Reihenfolge im Build-Prozess:
1. **grill-with-docs** – kurze Abstimmungsrunde am Anfang, damit Claude Code offene Details (Slug, Cookie-Laufzeit, Reihenfolge) erfragt, bevor es baut
2. **design-an-interface** – konkrete UI-Umsetzung des Cosmos-Stils
3. **prototype** – erster funktionsfähiger Durchstich (Auth + Scroll + Platzhalterdaten)
4. **tdd** – Tests für die Auth-Middleware (sicherheitsrelevant, empfehlenswert)
5. **review** / **qa** – Abschluss-Check vor dem Merge

## Nächste Schritte
1. Diese Datei als Kontext in eine neue Claude-Code-Session geben
2. Mit `grill-with-docs` starten, um die letzten offenen Details zu klären
3. Mit Platzhalterdaten bauen, danach echte Fotos/Reisen einpflegen

---

## Repo-Kontext (ergänzt beim Ablegen im Repo)

Abgleich der Spec mit dem tatsächlichen Stand von `thexsteven/StevenWebsite`:

**Stack — passt, mit Abweichungen:**
- Next.js **15.1** (nicht 14), React 19, App Router — Middleware- und Server-Action-APIs sind kompatibel
- TypeScript, Tailwind 3.4, `@next/mdx` (in `next.config.ts` aktiv), Framer Motion 11 — alles vorhanden
- Bilder laufen über **Cloudinary** (`res.cloudinary.com/dozdjb4fi/**` ist in `next.config.ts` als `remotePattern` freigegeben); lokales `/images/` ist per `.gitignore` ausgeschlossen. Echte Reisefotos gehören also nach Cloudinary, nicht ins Repo — `scripts/upload-to-cloudinary.js` existiert bereits.

**Bestehende Reise-Struktur:**
- `app/reisen/page.tsx` — Übersicht, rendert `components/sections/Travel.tsx`
- `app/reisen/hawaii/` mit sechs Unterseiten (`flug-ankunft`, `alltag`, `essen-kultur`, `adventures`, `big-island`, `abschluss`)
- `app/reisen/cannes/`
- → `/reisen/archiv` fügt sich als dritter Eintrag neben `hawaii` und `cannes` sauber ein.

**Content-Konvention:**
- `content/projects/` nutzt bereits **JSON pro Eintrag** (plus eine `.mdx`) und wird zur Laufzeit per `fs` gelesen; `next.config.ts` trägt das Verzeichnis in `outputFileTracingIncludes` ein. Für Reisen also analog `content/reisen/*.json` — und **wichtig**: das neue Verzeichnis ebenfalls in `outputFileTracingIncludes` eintragen, sonst fehlt es im Vercel-Build.

**Auth — noch nicht vorhanden:**
- Es gibt bisher **keine** `middleware.ts` im Repo, die wird neu angelegt.
- `.env.example` dokumentiert bisher nur `GITHUB_TOKEN`. `TRAVEL_PAGE_PASSWORD` muss dort ergänzt (leer, nur als Doku) und in Vercel als Environment Variable gesetzt werden.
- Passwortvergleich zeitkonstant (`crypto.timingSafeEqual`), Cookie-Wert als signiertes HMAC-Token statt als Klartext-Flag.

**Tests — Infrastruktur fehlt:**
- Es gibt **keinen Test-Runner** im Projekt (kein Jest/Vitest, nur `playwright` als devDependency für das Screenshot-Skript). Der `tdd`-Schritt aus der Spec setzt also voraus, dass vorher Vitest o. Ä. eingerichtet wird — das ist eine bewusste Entscheidung, kein Nebenprodukt.

**Offene Punkte vor dem Bauen:**
1. Slug: `/reisen/archiv` — oder etwas Sprechenderes?
2. Reihenfolge im Feed: neu→alt oder alt→neu?
3. Cookie-Laufzeit: Session-Cookie oder z. B. 30 Tage?
4. Login-Seite: eigene Route (`/reisen/archiv/login`) oder Formular direkt auf der geschützten Route?
5. Header/Footer: `SiteHeader variant="sub"` + `SiteFooter` wie die anderen Subpages, oder bewusst reduziert für den Galerie-Look?
6. Test-Setup: Vitest einführen (für den `tdd`-Schritt) — ja oder nein?
