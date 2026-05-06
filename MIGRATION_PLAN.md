# Migration Plan: Static Site → Next.js

Bestandsaufnahme der bestehenden Site (Stand 2026-05-05) und Plan für den Umzug auf Next.js (App Router) + Tailwind. **Noch kein Code geschrieben — wartet auf Freigabe.**

---

## 0. Bestand auf einen Blick

| Kategorie | Anzahl | Pfade |
|---|---|---|
| HTML-Seiten | 30 | 1× root, 4× `pages/career/`, 6× `pages/love/`, 6× `pages/travel/hawaii/`, 9× `pages/travel/cannes/` |
| CSS-Dateien | 1 | `css/styles.css` (~2775 Zeilen, monolithisch) |
| JS (Site-Logik) | 4 | `js/main.js`, `js/love-crypto.js`, `js/love-guard.js`, `js/love-pager.js` |
| JS (Karten) | 5 | `pages/travel/cannes/leaflet_cannes.js`, `pages/travel/hawaii/{leaflet_hawaii,maps_hawaii,maps_essen,maps_alltag}.js` |
| Build-Scripts | 2 | `scripts/upload-to-cloudinary.js`, `scripts/encrypt-love.js` |
| Encrypted Assets | 6 | `encrypted/{prolog,kapitel-01..04,epilog}.enc` |
| Lokale Bilder | 4 | `images/jungle_steven.jpeg`, 2 GIFs (Mr Bean, funny), `images/hawaii_content/` |
| Hosting | GitHub Pages | `CNAME` = `braun-steven.de` |

Mediendateien (Bilder/Videos der Reise- und Love-Seiten) liegen auf Cloudinary (`res.cloudinary.com/dozdjb4fi/...`), nicht im Repo.

---

## 1. Seitenstruktur: HTML → app/-Routen

Ziel-Routing nach Next.js 14 App-Router-Konvention. Alle Routen sind statisch (keine dynamischen Slugs nötig — nur 30 feste Seiten).

| Bestehende Datei | Next.js-Route | Datei im app/-Tree |
|---|---|---|
| `index.html` | `/` | `app/page.tsx` |
| `pages/career/index.html` | `/karriere` | `app/karriere/page.tsx` |
| `pages/career/semester-1.html` | `/karriere/semester-1` | `app/karriere/semester-1/page.tsx` |
| `pages/career/semester-2.html` | `/karriere/semester-2` | `app/karriere/semester-2/page.tsx` |
| `pages/career/praxis-1.html` | `/karriere/praxis-1` | `app/karriere/praxis-1/page.tsx` |
| `pages/love/prolog.html` | `/liebe/prolog` | `app/liebe/prolog/page.tsx` |
| `pages/love/kapitel-01.html` … `kapitel-04.html` | `/liebe/kapitel-01` … `04` | `app/liebe/kapitel-01/page.tsx` … |
| `pages/love/epilog.html` | `/liebe/epilog` | `app/liebe/epilog/page.tsx` |
| `pages/travel/hawaii/flug-ankunft.html` | `/reisen/hawaii/flug-ankunft` | `app/reisen/hawaii/flug-ankunft/page.tsx` |
| … (alle 6 Hawaii-Seiten analog) | `/reisen/hawaii/<slug>` | `app/reisen/hawaii/<slug>/page.tsx` |
| `pages/travel/cannes/motivation.html` | `/reisen/cannes/motivation` | `app/reisen/cannes/motivation/page.tsx` |
| … (alle 9 Cannes-Seiten analog) | `/reisen/cannes/<slug>` | `app/reisen/cannes/<slug>/page.tsx` |

**Layout-Hierarchie:**
- `app/layout.tsx` — Root: `<html lang="de">`, Site-Header, Site-Footer, Skip-Link, Love-Modal-Mount, Font-Loading (`next/font/google` für Playfair Display)
- `app/liebe/layout.tsx` — Love-Bereich: `body.story-body` Klasse, Love-Guard (Client-Wrapper), Pager-Mount
- `app/reisen/[city]/layout.tsx` (optional) — Story-Detail-Wrapper, falls gemeinsame Breadcrumb/Navigation

**Hash-basierte Anker** auf der Startseite (`#about`, `#career`, `#travel`, `#sport`, `#projects`, `#contact`, `#love-story`) bleiben als Anker-Links **innerhalb** von `/`. Cross-Page-Links (`../../index.html#career`) werden zu `<Link href="/#career">`.

**Hosting-Wechsel:** GitHub Pages → Vercel (oder weiter GH Pages mit `next export` / `output: 'export'`). Empfehlung: **Static Export** beibehalten (`output: 'export'`), damit `CNAME` + GH-Pages-Workflow erhalten bleiben — keine Server-Komponenten mit Runtime-Logik nötig.

---

## 2. Design-Tokens: CSS-Variablen → tailwind.config

Aus `css/styles.css :root` (Zeilen 5–35) ableiten. Alles nach `theme.extend` in `tailwind.config.ts`:

```ts
// tailwind.config.ts (Auszug, NOCH NICHT geschrieben)
colors: {
  bg:       '#f8fafc',  // --color-bg
  surface:  '#ffffff',  // --color-surface
  ink:      '#0f172a',  // --color-text
  muted:    '#475569',  // --color-muted
  border:   '#e2e8f0',  // --color-border
  primary:  '#0f2f5f',  // --color-primary  (Emerson-Dunkelblau)
  accent:   '#c8102e',  // --color-accent   (DHBW-Rot)
  // Sekundär-Akzente pro Sektion (siehe styles.css 1772–1789)
  about:    '#0ea5e9',
  resume:   '#16a34a',
  skills:   '#7c3aed',
  career:   '#ea580c',
  travel:   '#0d9488',
  projects: '#4f46e5',
  // Love-Theme
  love: {
    50:  '#fdf2f8',
    100: '#fce7f3',
    300: '#f9a8d4',
    500: '#ec4899',
    700: '#be185d',
  },
},
fontFamily: {
  sans:  ['var(--font-sans)',  '-apple-system', 'BlinkMacSystemFont', /* … */],
  serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
},
spacing: {
  // 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 rem → Tailwind hat das größtenteils nativ.
  // Nur Custom-Aliase nötig, falls Klassen-Mapping 1:1 bleiben soll.
},
borderRadius: { sm: '8px', md: '14px' },        // --radius-sm / --radius-md
boxShadow:    { sm: '0 6px 20px rgba(15,23,42,.08)' },  // --shadow-sm
maxWidth:     { content: '1100px', prose: '70ch' },     // --max-width / --text-max-width
```

**Empfehlung:** Tokens **zusätzlich** als CSS-Custom-Properties in `app/globals.css` behalten. Grund: Animationen wie `.timeline::before` (line 213–230) lesen `--filled` zur Laufzeit; Tailwind erzeugt das nicht, also bleibt CSS-Variable + Tailwind-Klasse parallel. Vorbild: `bg-primary` löst zu `var(--color-primary)` auf.

**Nicht-trivial (in Sektion 5 detailliert):**
- Komplexe Keyframes (`heartbeat`, `shake`, `heroZoom`, `heroFadeUp`, `timeline-pulse`) — als `@keyframes` in `globals.css` lassen, in Tailwind nur als `animate-*`-Utility registrieren.
- Pseudo-Elemente mit Gradients (`.timeline::before`, `.hero--image::before`, `.story-hero-overlay`) — bleiben als CSS, Tailwind kann das nicht sauber.
- Page-Transition-Klassen (`.page-leave-next` usw., styles.css 2492–2540) — bleiben CSS, werden vom Pager-Client zugewiesen.

---

## 3. JavaScript → "use client"-Komponenten

Inventar der vorhandenen JS-Logik und Zuordnung. Alle interaktiven Teile brauchen `"use client"`; statisches Markup bleibt Server Component.

### 3.1 `js/main.js` (auf jeder Seite eingebunden)
Aufgeteilt in mehrere fokussierte Client-Komponenten:

| Bestehende Funktion | Neue Komponente | Wo gemounted | Dependencies |
|---|---|---|---|
| Story-Video-Loader (data-video → `<source>`-injection, lines 6–44) | `<StoryVideo data-video="…">` | überall, wo `.story-video` benutzt wird | — |
| Hero-Easter-Egg (Tasten H+I, lines 46–71) | `<HeroBadge />` | nur `/` Hero | `keydown`-Listener |
| Section-Reveal (IntersectionObserver, lines 73–96) | `<RevealOnScroll>` Wrapper oder Hook | RootLayout / Section-Component | IntersectionObserver |
| Timeline-Animation (lines 98–187) | `<Timeline>` (mit eingebauter Logik) | Resume-Section | Scroll + IO |
| Sticky-Nav active-link Highlighting (lines 189–223) | `<StickyNav>` | RootLayout / Header | Scroll |
| Skills-Auto-Loop-Scroller (lines 357–393) | `<SkillsTrack>` | Skills-Section | requestAnimationFrame |
| Love-Sequenz (L→O→V→E + Logo-4-Tap + Modal, lines 233–355) | `<LoveModal>` + `<LoveTrigger>` | RootLayout (überall aktivierbar) | sessionStorage, fetch, WebCrypto |

### 3.2 `js/love-crypto.js`
**Bleibt nahezu unverändert** als pure Utility-Modul: `lib/love-crypto.ts`. Kein React, kein "use client" — nur eine Hilfsfunktion. Wird vom Client aus aufgerufen.

### 3.3 `js/love-guard.js`
Wird `<LoveGuard chapter="kapitel-01" />` (Client). Bleibt für jedes Love-Kapitel eingebunden. Übernimmt: Fetch von `/encrypted/<slug>.enc`, Passwort-Modal-Fallback, Render des entschlüsselten HTML in `#chapter-content`.

### 3.4 `js/love-pager.js`
Wird `<LoveStoryPager currentSlug="…" />` (Client). Hängt sich an `#chapter-content`-MutationObserver, baut Prev/Next-Pager + Page-Flip-Animation + Pfeiltasten-Navigation (siehe styles.css 2492–2540).

### 3.5 Karten-Scripts
- `pages/travel/cannes/leaflet_cannes.js` → `<CannesRouteMap>` (Client, lädt Leaflet via `next/dynamic` mit `ssr: false`)
- `pages/travel/hawaii/leaflet_hawaii.js` → `<HawaiiTileMap>` (Client, dito)
- `pages/travel/hawaii/maps_hawaii.js`, `maps_essen.js`, `maps_alltag.js` → drei Komponenten `<HawaiiFlightMap>`, `<EssenMap>`, `<AlltagMap>`. Diese benutzen die **Google Maps JS API mit Callback** (`callback=initMap`), was in React umständlich ist — siehe Sektion 5.

### 3.6 Build-Scripts (`scripts/`)
**Bleiben unverändert**, gehören nicht zur Frontend-App. Werden weiter mit `node scripts/...` ausgeführt. `package.json` `scripts.upload` und `scripts.encrypt-love` mitnehmen.

---

## 4. Komponentenliste (wiederverwendbar)

Alle aus dem aktuellen Markup extrahierbar, ohne Layout-Bedeutung zu ändern:

### Layout / Navigation
- **`<SiteHeader>`** — sticky, enthält `<SiteNav>`. Variante 1 (Startseite): volle Sektions-Anker. Variante 2 (Detail-Seiten): reduziertes Menü (`Karriere · Reisen · Kontakt`). Lösung: Prop `variant="home" | "subpage"`.
- **`<SiteNav>`** + **`<NavLink>`** — Active-Highlighting nur auf `/`, daher Client.
- **`<SiteFooter>`** — trivial.
- **`<SkipLink>`** — Accessibility, oben auf jeder Seite.
- **`<Breadcrumb>`** — Detail-Seiten (Career, Love, Travel).

### Sektions-Bausteine (Startseite)
- **`<SectionHead>` ({ kicker, title, intro })** — kommt 7× auf der Startseite vor (`.section-kicker` + `<h2>` + `.section-intro`).
- **`<Card>` / `<PreviewCard>`** — Standard-Card mit Border, Shadow, Padding.
- **`<FlipCard>` ({ front, back, href })** — Animation steckt in CSS, kein JS nötig.
- **`<Timeline>` + `<TimelineItem>`** — Resume-Sektion, mit eingebauter Animation-Logik (Client).
- **`<SkillsTrack>` + `<SkillCard>`** — auto-scrollender Loop (Client).
- **`<TravelBox>` + `<TravelStation>`** — die zwei Travel-Cards (Hawaii, Cannes).
- **`<SportTile>`** — drei dunkelblaue Sport-Kacheln.
- **`<LoveChapterCard>`** — sechs Cards in der versteckten Love-Section.
- **`<ContactCard>`** — vier Kontakt-Cards.

### Story-Detail (Karriere/Reisen/Love)
- **`<StoryDetailHeader>` ({ kicker, title, meta, summary })** — auf jeder Detail-Seite identisch.
- **`<StoryHighlights>` + `<StoryHighlight>`** — die "Stat-Liste" (Hawaii, Cannes).
- **`<StoryPagination>`** — Buttons "Zurück / Weiter" am Seitenende (nicht zu verwechseln mit Love-Pager).
- **`<AlbumGrid>` + `<AlbumItem>` ({ size: 'wide' | 'third' })** — Hawaii-Layout.
- **`<MediaPair>` / `<MediaTriple>`** — Side-by-side Bild/Video-Anordnungen.
- **`<StoryVideo>`** — Client, Lazy-Source-Injection.
- **`<StoryFigure>`** — Bild + Caption, mit `size`-Variante (`small | medium | xsmall | align-right`).

### Karriere-spezifisch (Semester-Seiten)
- **`<ModuleNavGrid>` + `<ModuleNavCard>`** — Top-Navigation der 7 Module.
- **`<ModuleSection>` ({ id, color, icon, badge, title })** — 7× pro Semester-Seite.
- **`<ModuleIntro>`, `<ModuleTopics>`, `<ModuleHighlight>`, `<ModulePraxis>`, `<ModuleDeepdive>`, `<ModuleRetro>`** — Sub-Bausteine.
- **`<CareerHubCard>`** — Grid-Card auf `/karriere`.
- **`<SemesterRetro>`** — dunkelblauer Fazit-Block.

### Love-Story
- **`<StoryHero>` ({ image, title, subtitle, kicker })** — animierter Bildschirm-Hero (nur Prolog).
- **`<LoveModal>`** — globales Passwort-Modal (im RootLayout).
- **`<LoveTrigger>`** — versteckter L→O→V→E-Listener + Logo-4-Tap.
- **`<LoveGuard chapter="…">`** — pro Kapitel-Page.
- **`<LoveStoryPager>`** — Prev/Next mit Page-Flip.

### Karten
- **`<CannesRouteMap>`**, **`<HawaiiTileMap>`**, **`<HawaiiFlightMap>`**, **`<EssenMap>`**, **`<AlltagMap>`** — alle Client-only via `next/dynamic({ ssr: false })`.

### Utility
- **`<HeroBadge>`** — Easter Egg (Mr-Bean-GIF).
- **`<RevealOnScroll>`** — Wrapper-Komponente (oder Hook `useReveal()`).

---

## 5. Risiken & Besonderheiten

Sortiert nach Schwierigkeit / Risiko.

### 🔴 Hoch — kritisch zu prüfen vor dem Umbau
1. **Love-Story Crypto-Pipeline funktioniert nur, wenn `/encrypted/*.enc` weiterhin **statisch** unter exakter URL erreichbar ist.** `js/love-guard.js` macht `fetch('../../encrypted/<slug>.enc')`. In Next.js müssen die Dateien in `public/encrypted/` landen, Fetch-URL wird zu `/encrypted/<slug>.enc`. **Wichtig:** Headers `Cache-Control: no-store` (siehe love-crypto.js Zeile 39) bleiben erhalten — `next.config.js`-`headers()`-Eintrag oder via Static-Export-Tweak. Auch der Probe-URL-Pfad (`encrypted/prolog.enc`) in `main.js` Zeile 240 muss zu `/encrypted/prolog.enc` werden.

2. **Google-Maps-Integration ist Callback-basiert (`?callback=initMap`).** Funktioniert in React nicht direkt — Skript wird global geladen, aber `initMap` muss zum richtigen Zeitpunkt am `window` hängen. Lösung: a) in einem `useEffect` einen Promise-Wrapper bauen, der das Script via `<Script strategy="lazyOnload">` injiziert und auf das `load`-Event hört; oder b) `@react-google-maps/api` als Wrapper benutzen (zusätzliche Dependency, ~50 KB). **Vorschlag:** Option (a), weil nur drei Karten und kein dynamisches Verhalten.

3. **API-Key liegt im Code** (`pages/travel/hawaii/flug-ankunft.html` Zeile 14, sichtbar im Bundle). Das ist heute schon so — **kein Migrationsrisiko**, aber gute Gelegenheit, den Key in eine `NEXT_PUBLIC_GOOGLE_MAPS_KEY` Env-Variable zu verschieben und API-Restrictions in der Google Cloud Console zu setzen (HTTP-Referrer auf `braun-steven.de`).

### 🟡 Mittel — sorgfältige Übersetzung nötig
4. **CSS-Größe (~2775 Zeilen) ist ein Monolith.** Tailwind-Migration sollte schrittweise: Phase A = globals.css behalten + Tailwind nebenher, Phase B = Sektion für Sektion auf Tailwind-Utilities umstellen, Phase C = Reste in `@layer components`. **Empfehlung:** in Phase A bleiben — die Site ist fertig und funktioniert, `globals.css` einfach übernehmen und nur **neue** Komponenten in Tailwind schreiben.

5. **Encryption-Markdown-Pipeline** (`scripts/encrypt-love.js`) generiert HTML-Strings, die per `innerHTML` injiziert werden. Das funktioniert in React nicht direkt — `<div dangerouslySetInnerHTML={{ __html: ... }} />` ist die korrekte Übersetzung. Akzeptabel, weil Quelle vertrauenswürdig (eigene Markdown-Datei) ist, aber dokumentieren.

6. **Hash-Anker auf der Startseite (`#about`, `#career`, …) und `scroll-margin-top: var(--scroll-offset)`** funktionieren mit `<a href="/#career">` aus Subpages, **aber** Next.js scrollt bei Client-Navigation nicht automatisch zum Hash. Lösung: `useEffect`-Hook im `RootLayout`, der bei `pathname === '/'` den `window.location.hash` checkt und manuell scrollt. Test-Cases: Direktaufruf `/`, Aufruf `/#career`, Aufruf von `/karriere/semester-1` → Klick auf "Zurück zur Startseite #career".

7. **Sticky-Nav active-link-Logik** (`main.js` 189–223) basiert auf `offsetTop` — funktioniert nur auf `/`. Auf Detail-Seiten gibt es keine Sektionen, die markiert werden müssten, also Komponente konditional rendern oder NoOp zurückgeben, wenn keine `[id]`-Sections vorhanden.

8. **Page-Flip-Animation der Love-Pages** (styles.css 2492–2540 + `love-pager.js`) nutzt sessionStorage zur Richtungs-Übergabe + harte `window.location.href = ...`-Navigation. Mit Next.js `router.push()` würde der Page-Flip nicht funktionieren, weil keine echte Page-Navigation stattfindet. **Optionen:** a) `<a href>` statt `<Link>` benutzen → behält Verhalten; b) `router.push` + custom Exit-Animation. **Empfehlung:** Option (a) für Phase 1, Option (b) später optimieren.

9. **Skills-Auto-Scroller** (`main.js` 357–393) klont DOM-Children. In React muss das anders gelöst werden: Array zweimal rendern (`[...skills, ...skills]`) und `aria-hidden` für die zweite Hälfte. Logik wird einfacher.

10. **IntersectionObserver-Hooks** mehrfach instanziert (Reveal, Timeline) — sauberer als ein zentraler `useIntersect()` Custom-Hook.

### 🟢 Niedrig — straight-forward
11. **Cloudinary-URLs** sind absolut und ändern sich nicht — Bilder migrieren ohne Anpassung. `next/image` mit `unoptimized: true` (wegen `output: 'export'`) oder normaler `<img>` benutzen. Empfehlung: bei Static-Export normales `<img>` belassen, weil `next/image` ohne Server keine Vorteile hat.

12. **Lokale Bilder** (`images/jungle_steven.jpeg` als Hero-Background, `Mr Bean GIF.gif`, `funnyGIF.gif`) → nach `public/images/`. Die CSS-Variable `--hero-image: url("../images/jungle_steven.jpeg")` wird zu `url("/images/jungle_steven.jpeg")`.

13. **Google Fonts (Playfair Display)** — von CDN-`<link>` zu `next/font/google` umziehen. Vorteil: kein Layout-Shift, Self-Hosting, kein extra Roundtrip. Trivial.

14. **Custom Domain (`braun-steven.de` via `CNAME`)** — bleibt bei GH-Pages-Static-Export erhalten (CNAME-File mitkopieren in `public/CNAME`). Bei Vercel-Wechsel: Domain in Vercel-Projekt verlinken, DNS bei Provider auf Vercel umstellen.

15. **`HawaiiAufnahmen/` und `_love-source/`** sind in `.gitignore`, **nicht** in der Migration relevant. Build-Scripts brauchen sie aber lokal.

16. **`sessionStorage`-Keys (`love_key`, `love_page_dir`)** funktionieren in Next.js identisch — nur an `useEffect` denken (kein Zugriff während SSR/SSG).

### Reihenfolge-Vorschlag (nach Freigabe)
1. Next.js-Projekt aufsetzen, `output: 'export'`, Tailwind, Fonts.
2. `app/layout.tsx` + `globals.css` (1:1 Übernahme von `styles.css`) + `<SiteHeader>`/`<SiteFooter>` + `<SkipLink>`.
3. `app/page.tsx` (Startseite) — alle Sektionen als reine JSX-Übersetzung, **ohne** Interaktivität.
4. Interaktivität nachziehen: `<HeroBadge>`, `<Timeline>`, `<SkillsTrack>`, Sticky-Nav, Reveal-Hook.
5. Karriere-Routen (`/karriere`, `/karriere/semester-1`, `/karriere/semester-2`, `/karriere/praxis-1`).
6. Reise-Routen (Hawaii zuerst, weil keine Leaflet-Polylines).
7. Cannes-Routen (Leaflet-Karte separat als Client-Component).
8. Love-Routen — als letztes, weil komplexeste Crypto+Guard+Pager-Logik.
9. Finaler `next build && next export`-Test, GitHub-Pages-Deploy (Workflow muss für Next-Build angepasst werden).

---

## Offene Fragen vor dem Start

- **Hosting:** GH Pages mit Static Export weiter, oder Wechsel auf Vercel? (Beeinflusst `output: 'export'` vs. Server Components.)
- **Tailwind oder CSS-Modules?** Im Plan ist Tailwind angenommen — falls anders gewünscht, ändert sich Sektion 2.
- **TypeScript?** Plan geht von `.tsx` aus. Falls `.jsx` reicht, ist alles weniger streng.
- **i18n:** Cannes-Motivation ist auf Englisch, alles andere auf Deutsch. Soll das so bleiben oder vereinheitlicht werden?
- **Love-Pager-Animation:** Page-Flip beibehalten (Option a, hart navigieren) oder modernisieren (Option b, `router.push`)?

**Bitte freigeben oder Anpassungen markieren, dann starte ich mit der Umsetzung.**
