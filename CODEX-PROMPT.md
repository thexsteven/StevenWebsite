# Auftrag: braun-steven.de von Grund auf neu

> **Bedienung:** Diesen Block einmal vollständig an Codex geben. Es sind keine
> Platzhalter mehr offen, alles ist entschieden und die Werkzeuge sind installiert.
> Es genügt: „Führe den Prompt aus."

---

Du baust **braun-steven.de** neu — die persönliche Website von Steven Braun, mit
einem Reiseblog als Hauptsache. Arbeite ausschließlich in diesem Projektordner.

Du arbeitest **auf einem Branch**, nicht auf `master`:

```bash
git checkout -b neubau-2026-09
```

`master` bleibt unangetastet, bis Steven den Neubau abgenommen hat. Die
GitHub-Integration von Vercel baut aus dem Branch automatisch ein Preview-Deployment;
das ist die Fassung, die begutachtet wird. Kein Merge, kein Production-Deploy ohne
ausdrückliche Freigabe.

## 1 Der Skill ist verbindlich

Lies zuerst **vollständig**:

```
.agents/skills/scroll-craft/SKILL.md
```

und danach die Referenzen, die er nennt — mindestens `references/taste.md`,
`references/uniqueness.md`, `references/hero-depth.md`, `references/devices.md`,
`references/feel.md`, `references/worlds.md` und `references/verify.md`.

Der Skill hat Vorrang vor deinen Gewohnheiten. Wo dieser Auftrag und der Skill sich
widersprechen, gilt der Skill — **außer** bei Architektur (§4), Faktenlage (§3),
Bildrechten (§9) und den Pflichtseiten (§11). Diese vier schlagen jede
Design-Präferenz.

**Eine Abweichung vom Skill ist vorgegeben und keine Verhandlungssache:** der Skill
liefert normalerweise ein statisches Verzeichnis mit einer HTML-Seite. Das passt
nicht zu einem Blog mit vielen Kapiteln. Hier gilt: der Skill ist das **Verfahren**
(Brief, Grammatik, Feeling-Curve, Score, Signature Move, Verifikation) und die
**Engine** (`engine/scrollcraft.js`, `engine/scrollcraft.css`), nicht das
Ausgabeformat. Ausgegeben wird Next.js. Details in §4.

Die Engine wird **nie** projektspezifisch editiert. Sie wird eingebunden und über
Tokens und eigene `data-sc-*`-Attribute gesteuert. Bespoke-Verhalten schreibst du in
eigenen Code, der `--sc-p` liest.

## 2 Zwei Phasen, ein Tor dazwischen

**Das ist die wichtigste Struktur dieses Auftrags.**

### Phase 1 — Struktur und Gestalt, ohne Bilder

Du baust die vollständige Seite: Routen, Grammatik, Typografie, Bewegung, Layout,
Blindtext-freie echte Texte. Für **jedes** Bild und Video setzt du an dieser Stelle
einen neutralen Platzhalter — eine getönte Fläche im richtigen Seitenverhältnis mit
dem Dateinamen darauf, den du später zu füllen gedenkst.

Am Ende von Phase 1 hältst du an und legst vor:

- die lokale URL beziehungsweise die Preview-URL,
- den Score (Grammatik, Feeling-Curve, Peak, Device pro Beat, Signature Move),
- die Kontaktbogen-Screenshots aus dem Verifikationslauf,
- eine Liste **jedes** Platzhalters mit der Frage, welches Motiv dort hin soll.

**Dann wartest du auf Freigabe.** Kein Bild wird vor der Freigabe eingesetzt.

### Phase 2 — Bilder einsetzen

Erst nach Steven's ausdrücklichem „Phase 1 ist abgenommen" öffnest du
`content/assets/cloudinary.json`, siehst dir die in Frage kommenden Assets an und
setzt sie ein. Regeln in §9.

Wenn Steven in derselben Sitzung sofort „weiter" sagt, ist das die Freigabe. Wenn er
Änderungen nennt, arbeitest du sie ein und legst erneut vor. Du gehst nie von selbst
über das Tor.

## 3 Wer das ist — die Faktenlage ist bindend

Steven Braun, dualer Student an der **DHBW Mosbach**, Praxispartner ist ein
international tätiges Technologieunternehmen in der Automatisierungstechnik.
Wohnort **Bad Mergentheim**. Baut nebenbei Software und KI-Systeme.

**Sagbar:**

- Duales Studium DHBW Mosbach, Theorie- und Praxisphasen im Wechsel.
- Eine **Sprachreise nach Hawaii 2025**: Oahu, Sprachschule in Ala Moana, dazu
  eine Reise auf Big Island. Das war **kein** Auslandssemester und keine
  Studienleistung — nenn es nicht so.
- Eine Radtour über die Alpen bis nach Südfrankreich, Sommer 2025.
- Eine Reise nach **Venedig 2026**, zu viert, mit dem Van über die Berge.
- Sport, Training, Disziplin — als Teil der Person, nicht als Leistungsschau.
- Die Website selbst als Arbeitsprobe.

**Nicht sagbar, auch nicht angedeutet:**

- **Der Name des Praxispartners.** Nur neutral umschreiben: „ein international
  tätiges Technologieunternehmen", „mein Praxispartner". Kein Logo, keine
  Projektinhalte, keine Interna, keine Kundennamen. Das ist eine harte Grenze.
- Erfundene Zahlen jeder Art. Keine Kilometerangaben, keine Höhenmeter, keine
  Notendurchschnitte, keine „über X Länder", wenn die Zahl nicht belegt ist. Der
  Skill verbietet erfundene Statistiken ohnehin — hier gilt es doppelt.
- Namen anderer Personen. Auf den Fotos sind Freunde zu sehen; sie werden nicht
  benannt. „Ein Freund", „wir", „zu dritt" ist die richtige Auflösung.
- Präzise Daten, die oben nicht stehen. Die Jahre in der Liste sind belegt und
  dürfen genannt werden; alles darüber hinaus — Monate, Dauer, Streckenlängen,
  Höhenmeter — nicht, solange du es nicht von Steven hast.

**Wenn du eine Angabe brauchst, die hier nicht steht: fragen, nicht erfinden.**
Erfundene Inhalte sind schlimmer als fehlende.

## 4 Architektur — hart vorgegeben

Der Bestand bleibt technisch stehen und wird inhaltlich neu gebaut:

- **Next.js 15, App Router, TypeScript, Tailwind.** Kein Framework-Wechsel.
- **Vercel** ist das Ziel. Deploy läuft über die GitHub-Integration, nicht über die
  CLI. Die Vercel-CLI auf diesem Rechner ist nicht eingeloggt — versuche keinen
  CLI-Deploy und starte keinen Login-Flow.
- **Cloudinary** liefert alle Bilder und Videos. `next.config.ts` erlaubt bereits
  `res.cloudinary.com/dozdjb4fi/**`. Es gehören **keine** Mediendateien ins Repo.
- **Schriften über `next/font`.** Die werden zur Buildzeit selbst gehostet, es geht
  kein Request ans Google-CDN. Bind niemals Schriften per `<link>` vom Google-CDN
  ein — das würde die Datenschutzerklärung unnötig aufblähen.
- **Kein Tracking, keine Analytics, keine Cookies.** Deshalb auch kein Cookie-Banner.
  Wenn du meinst, etwas zu brauchen, das Cookies setzt: nicht einbauen, sondern fragen.

### Die Engine in Next.js

`.agents/skills/scroll-craft/engine/scrollcraft.css` und `scrollcraft.js` kopierst du
nach `lib/scrollcraft/` beziehungsweise `public/`. Die JS-Datei wird clientseitig
geladen und liest `data-sc-*` aus dem gerenderten DOM. Der Weg:

- Sektionen sind normale React-Server-Komponenten mit echtem Markup und echten
  `data-sc-*`-Attributen.
- Eine schmale Client-Komponente initialisiert die Engine einmal pro Seite.
- Kein React-State steuert die Scroll-Animation. Die Engine macht das.
- Bei Routenwechsel muss die Engine sauber neu binden und beim Unmount aufräumen.

Dass die Engine nicht editiert wird, gilt auch hier. Wenn sie in einer SPA-Umgebung
etwas nicht kann, schreibst du den Zusatz daneben, nicht hinein.

### Was aus dem Bestand verschwindet

Diese Bereiche kommen **nicht** auf die neue Seite: Sport als eigene Sektion,
Motivation, Bücherregal (`BookLibrary`), und der passwortgeschützte Bereich
**Liebe** mit allen Kapiteln.

**Wichtig: nichts davon wird gelöscht.** Die Verzeichnisse `app/liebe/`,
`app/motivation/`, `encrypted/`, `_love-source/`, `lib/love-crypto.ts`,
`lib/love-key-store.ts`, `lib/books.ts`, `lib/characters.ts` und die zugehörigen
Komponenten bleiben unverändert auf der Platte liegen. Sie werden nur nicht mehr
gebaut, nicht mehr verlinkt und nicht mehr in der Navigation geführt. Wenn ein Umbau
eine dieser Dateien technisch bräche, sag es — lösch sie nicht.

Bilder aus dem Sport-Ordner dürfen in „Über mich" vorkommen. Der Mensch trainiert,
das darf man sehen. Es braucht dafür nur keine eigene Sektion.

## 5 Design — harte Vorgaben

Eigene Richtung, bewusst **nicht** die Palette der Geschäftsmarke braun-agents. Das
hier ist die Person und ein Reiseblog.

### Grundidee

**Helles Papier zum Lesen, dunkle Vollbildszenen zum Schauen.** Die Blogkapitel
lesen sich auf warmem Hellgrund wie ein gut gesetztes Magazin. Die
scroll-getriebenen Szenen — Hero, Kapitelübergänge, der Peak — sind dunkel und
randlos, damit die Fotos leuchten. Der Wechsel zwischen beiden ist selbst ein
gestalterisches Mittel und darf hart sein.

### Palette — gemessen, nicht geschätzt

| Rolle          | Hex                     | Verwendung                                             |
| -------------- | ----------------------- | ------------------------------------------------------ |
| `sand`         | `#F4F1EA`               | Heller Grund, trägt die Lesestrecken                   |
| `sand-tief`    | `#E8E3D8`               | Abgesetzte Flächen auf hell, Karten, Trennbänder       |
| `tinte`        | `#14161A`               | Text auf hell **und** dunkler Grund der Vollbildszenen |
| `tinte-weich`  | `#4A5058`               | Sekundärtext auf hell, Bildunterschriften              |
| `papier`       | `#F4F1EA`               | Text auf dunklem Grund (dieselbe Farbe wie `sand`)     |
| `papier-weich` | `rgba(244,241,234,.68)` | Sekundärtext auf dunkel                                |
| `tiefe`        | `#0B585C`               | **Einziger Akzent auf hell.** Links, aktive Zustände   |
| `tiefe-hell`   | `#58C6C2`               | **Einziger Akzent auf dunkel.** Dieselbe Rolle         |
| `linie`        | `#C9C2B4`               | Rahmen und Haarlinien auf hell. **Niemals Text**       |

Gemessene Kontraste nach WCAG 2.1:

| Kombination              | Ratio  |                              |
| ------------------------ | ------ | ---------------------------- |
| `tinte` auf `sand`       | 16,1:1 | AAA, Fließtext               |
| `tinte-weich` auf `sand` | 7,2:1  | AAA, Sekundärtext            |
| `tinte` auf `sand-tief`  | 14,2:1 | AAA, Text auf Karten         |
| `tiefe` auf `sand`       | 7,3:1  | AAA, Akzenttext und Links    |
| `papier` auf `tinte`     | 16,1:1 | AAA, Fließtext auf dunkel    |
| `tiefe-hell` auf `tinte` | 8,9:1  | AAA, Akzent auf dunkel       |
| `linie` auf `sand`       | 1,5:1  | **nur Linien**, niemals Text |

Halte dich daran, dann entstehen keine Kontrastprobleme. Text über Fotos misst du
trotzdem am zusammengesetzten Bild, nicht an der Token-Tabelle — der Skill verlangt
das, und Fotos sind nicht flach.

**Verboten:**

- Eine zweite Akzentfarbe. Genau eine, in zwei Helligkeiten für die zwei Gründe.
- Verläufe im Text, Neon, farbige Schlagschatten ohne Versatz.
- Ganzflächige dunkle Überlagerung, um Kontrast zu erzwingen. Ein Scrim gehört nur
  dorthin, wo die Schrift steht.
- Die Palette von braun-agents (Messinggold auf Anthrazit). Das ist die andere Marke.

### Typografie

**Höchstens zwei Familien.** Vorgabe:

- Überschriften: eine Serife mit Charakter. `Fraunces` oder `Playfair Display`.
- Fließtext und Interface: eine ruhige Grotesk. `Inter` oder `Geist`.

Beide über `next/font/google`. Der Bestand lädt derzeit **vier** Familien
(Playfair, Bricolage, Cormorant, DM Mono) — das wird auf zwei reduziert. Eine dritte
nur, wenn du sie begründen kannst; dann sag es im Abschlussbericht.

Auf dunklem Grund einen Schnitt leichter setzen als auf hellem. Helle Schrift auf
Dunkel wirkt optisch fetter.

### Bewegung

- Nur `transform`, `opacity` und `clip-path` animieren. Nie `width`, `height`,
  `top`, `left`, nie `transition: all`.
- `prefers-reduced-motion` wird respektiert, und die Seite muss in dem Zustand
  **immer noch gut aussehen** — Tiefe bleibt in der statischen Komposition.
- Mobil wird eigenständig art-direktet, nicht skaliert. Hochformat-Fotos sind für
  das Handy vorhanden und im Manifest als solche markiert; nutze sie dort.

## 6 Seitenstruktur

| Route                      | Inhalt                                                                   |
| -------------------------- | ------------------------------------------------------------------------ |
| `/`                        | Startseite. Die scroll-getriebene Erfahrung. Führt in die drei Bereiche. |
| `/reisen`                  | Übersicht des Reiseblogs, die Reisen als Einstiege.                      |
| `/reisen/hawaii`           | Die Reise als Kapitelfolge, siehe §7.                                    |
| `/reisen/hawaii/<kapitel>` | Die einzelnen Kapitel.                                                   |
| `/reisen/radtour-cannes`   | Die Radtour als Kapitelfolge.                                            |
| `/ueber-mich`              | Person, Werdegang, Lebenslauf als Timeline.                              |
| `/karriere`                | Studium: Theorie- und Praxisphasen, Semesterrückblicke.                  |
| `/karriere/<phase>`        | Die einzelnen Phasen.                                                    |
| `/impressum`               | Pflicht, siehe §11.                                                      |
| `/datenschutz`             | Pflicht, siehe §11.                                                      |

Die Navigation führt **drei** Punkte plus Kontakt: Reisen · Über mich · Karriere.
Nicht mehr. Impressum und Datenschutz stehen im Footer.

Sprache durchgehend **Deutsch**, Du-Ansprache ist erlaubt und passend (persönliche
Seite, kein Geschäftsauftritt). Keine englischen Rubrikentitel, kein „Let's connect",
kein „Read more".

## 7 Der Reiseblog — die Hauptsache

Ein Reiseblog ist kein Fotoalbum mit Bildunterschriften. Er ist **erzählt**. Jedes
Kapitel hat einen Bogen und einen Grund, gelesen zu werden.

Die Kapitel bekommen echte Prosa. Du schreibst sie aus dem, was in den Bildern
tatsächlich zu sehen ist, plus dem, was §3 als sagbar ausweist. **Du erfindest keine
Erlebnisse.** Wo du eine Geschichte bräuchtest, die du nicht kennst, lässt du eine
klar markierte Lücke und fragst sie in Phase 1 ab.

### Hawaii 2025 — vorgeschlagene Kapitel

Sprachreise, Oahu, mit einem Abstecher auf Big Island. Abgeleitet aus dem
tatsächlichen Bildbestand:

| Kapitel         | Trägt                                                               | Material                              |
| --------------- | ------------------------------------------------------------------- | ------------------------------------- |
| Ankunft         | Der Flug, das Ankommen                                              | `reisen/hawaii/ankunft`               |
| Alltag auf Oahu | Der Weg zur Sprachschule, der Kanal, die Stadt, das Feuerwerk am Freitag     | `reisen/hawaii/alltag`, 11 Assets     |
| Unterwegs       | Der Mietwagen, die Wanderungen, der Fallschirmsprung                | `reisen/hawaii/adventures`, 20 Assets |
| Essen           | Poke, Foodtrucks, Shave Ice — eine eigene kleine Kulturgeschichte   | `reisen/hawaii/essen`, 12 Assets      |
| Big Island      | Die andere Insel: Mauna Kea, Lavaröhre, Mantarochen, schwarzer Sand | `reisen/hawaii/big-island`, 14 Assets |

Der **Peak** dieser Reise liegt beim Fallschirmsprung oder beim Nachttauchgang mit
den Mantarochen. Entscheide dich für **einen**, gib ihm den größten Scroll-Raum, und
mach die Sektion davor ruhiger. Drei konkurrierende Höhepunkte sind keiner.

### Radtour nach Südfrankreich — vorgeschlagene Kapitel

12 nutzbare Assets in `reisen/radtour-cannes-2025`, chronologisch von der Einfahrt zu Hause
über den Alpenpass und Turin bis zur Ankunft. Die Bildunterschriften im Manifest
tragen die Chronologie. Der stärkste Moment ist der Abend, an dem Fremde Pizzateig
machen (`pizzateig-kueche`) — das ist der Beat, an dem eine Radtour zu einer
Geschichte wird.

### Venedig 2026 — kein eigenes Kapitel, sondern ein kurzer Auftritt

Vier Aufnahmen in `reisen/venedig-2026`: drei Nachtbilder aus den Bergen und ein
Bergpanorama, alle **auf dem Weg** entstanden, keines aus Venedig selbst. Für ein
eigenes Kapitel ist das zu wenig Material.

Setz sie als kurze, ruhige Strecke ein — ein Nachtstück zwischen zwei lauten
Kapiteln, oder als Ausklang der Reisen-Übersicht. Sie sind die einzigen
Nachtaufnahmen im ganzen Bestand; genau das macht sie wertvoll. Behaupte nichts
über Venedig, was die Bilder nicht zeigen: **es ist die Anreise, nicht die Stadt.**

## 8 Was nicht auf die Seite kommt

Zusätzlich zur Refuse-Liste des Skills — keine Scroll-Cues, keine `01 / 06`-Zähler,
keine Eyebrow über jeder Überschrift, kein Gradient-Text, keine Clay-Dioramen, keine
erfundenen Statistiken, kein Em-Dash im sichtbaren Text:

- **Kein Lorem Ipsum, nirgends.** Auch nicht temporär in Phase 1. Wenn ein Text
  fehlt, steht dort eine als solche erkennbare Frage an Steven.
- **Keine Skill-Balken, keine Prozentwerte, keine Sternebewertungen.**
- **Keine Tech-Logo-Wand.**
- **Keine Zahlen-Counter.** Es gibt keine belegten Zahlen (§3).
- **Keine Karten-Bibliothek ohne Not.** Der Bestand nutzt Leaflet für Routenkarten.
  Wenn du Karten willst, begründe sie; sonst weg. Eine Route lässt sich auch als
  gezeichnete Linie erzählen, ohne 140 KB JavaScript.
- **Keine KI-generierten Bilder.** Es gibt echte Fotos. `KIE_AI_API_KEY` wird nicht
  gebraucht und nicht gesetzt.

## 9 Bilder — die Regeln für Phase 2

Der Bestand ist aufgeräumt, benannt und beschriftet. Die Wahrheit steht in
Cloudinary, die Lesefassung hier:

```
content/assets/cloudinary.json    <- maschinenlesbar, das ist deine Quelle
content/assets/BILDBESTAND.md     <- Übersicht für Menschen
```

**83 Assets sind nutzbar. 48 sind gesperrt.** Jedes nutzbare Asset hat Ordner, Namen,
Alt-Text, Bildunterschrift, Tags, Maße und Ausrichtung.

### Harte Regeln

1. **Sieh dir jedes Bild an, bevor du es einsetzt.** Der Skill verlangt das, und die
   Beschreibungen im Manifest ersetzen das Hinsehen nicht. Lade es über die
   `url_muster` aus dem Manifest und schau es an.
2. **Nichts aus `gesperrt` einsetzen.** Das sind Fremdmaterial mit ungeklärtem
   Urheberrecht (Anime-Wallpaper, ein Meme-GIF, ein heruntergeladenes Stockfoto),
   Dubletten, und der komplette private Bereich `privat/liebe/*`. Nicht einbinden,
   nicht verlinken, nicht als Preload, nicht im OG-Bild. Ohne Ausnahme.
3. **Der Alt-Text aus dem Manifest wird übernommen**, nicht neu erfunden. Er ist
   beim Ansehen des Bildes geschrieben worden. Wenn er falsch ist, sag es und
   korrigiere ihn im Manifest — nicht still im Markup.
4. **Bildunterschriften sind Text, kein Alt-Text.** Das Feld `bildunterschrift` ist
   für die sichtbare Zeile unter dem Bild gedacht. Beide werden gebraucht, sie sind
   nicht dasselbe.
5. **Auslieferung immer über `f_auto,q_auto` und eine explizite Breite.** Nie das
   Original ohne Transformation. Die Muster stehen pro Asset im Manifest. Für HEIC
   ist das zwingend — Browser zeigen die Originale nicht an.
6. **Hochformat aufs Handy, Querformat auf den Desktop.** Das Feld `ausrichtung`
   sagt dir, was du hast. Eine Sektion, die nur Querformat kennt, ist mobil nicht
   art-direktet.
7. **Videos:** `poster_url` liefert ein Standbild als Poster. Ton wird entfernt.
   Autoplay nur stummgeschaltet und `playsinline`.

### Video-Scrubbing — die Voraussetzungen stehen

**Steven will Video-Scrubbing.** Es ist eingeplant, nicht optional.

Video-Scrubbing braucht eine dichte GOP, sonst ruckelt es. Der Skill hat dafür
`scripts/encode.sh`. Die Voraussetzungen sind auf diesem Rechner **erfüllt**:

- ffmpeg 9.0.1 full build, 588 Filter, `scale` und `libx264` vorhanden, im PATH.
- `ffprobe` daneben.
- `playwright-core` im Projekt installiert, Chrome vorhanden.
- Der scroll-craft-Workspace liegt unter `scrollcraft/`, das Fingerprint-Register
  ist angelegt und leer.

`node .agents/skills/scroll-craft/scripts/doctor.mjs` bestätigt das. Lauf ihn
trotzdem einmal, bevor du anfängst — er ist billig, und die Fehler eines kaputten
ffmpeg tauchen sonst später als scheinbarer Syntaxfehler in deinem eigenen
Kommando auf.

Die 13 Videos im Bestand sind alle Hochformat, 480 bis 1080 Pixel breit. Für einen
Scrub-Akt lädst du das Original über die `url_muster` herunter, kodierst es lokal
mit `encode.sh` neu (einmal Desktop, einmal `mobile`) und legst das Ergebnis nach
`public/scrub/`. Liegt eine neu kodierte Datei über 5 MB, sag es, statt sie
stillschweigend zu committen.

**Was du nicht tust:** eine normal kodierte Videodatei scrubben und hoffen. Das
spielt sauber ab und scrubbt wie Matsch. Höchstens zwei `scrub`-Akte auf der
ganzen Seite — der Skill begrenzt das, und der dritte ist ohnehin keine
Überraschung mehr.

## 10 Der Brief — schon beantwortet

Der Skill verlangt in Step 0 acht Antworten, bevor irgendetwas entsteht. Sie stehen
hier, damit du nicht anhalten musst. Schreib sie in `BRIEF.md` und markiere die Datei
als **„Authored under explicit creative delegation"** — Steven hat die Richtung
vorgegeben, die Ausformulierung ist delegiert.

1. **Vibe:** ruhig, warm, erzählerisch, sonnengebleicht. Referenzen aus anderen
   Medien: ein gut gesetztes Reisemagazin auf Papier; das Licht in „Call Me By Your
   Name"; ein Fotoalbum, in dem jemand mit Bleistift danebengeschrieben hat.
   Ausdrücklich **keine** Website als Referenz.
2. **Die Scroll-Reise:** zuerst das Gesicht und der Satz, wer das ist. Dann die
   Reisen als das, wofür man bleibt. Dann der Werdegang für die, die deshalb da sind.
   Zuletzt ein Weg, Kontakt aufzunehmen.
3. **Energiekurve:** ruhiger Einstieg, ansteigend über die Reisen, ein lauter
   Höhepunkt, danach deutlich runter für den Werdegang, ruhiger Schluss.
4. **Gefühl je Stufe, und der eine Moment:** Neugier → Sog → Staunen → Respekt →
   Nähe. Der eine Moment ist der Höhepunkt der Hawaii-Strecke (§7): der Absprung
   oder die Mantarochen. Der Satz, den ein Besucher einem Freund sagt: _„Da scrollst
   du und fällst mit dem aus dem Flugzeug."_
5. **Eine Sache, die keine andere Seite tut:** der Signature Move. Er ist dein
   Entwurf, gebunden an eine Bedingung — er muss aus dem **Reisen** kommen, nicht aus
   dem Portfolio. Etwas, das Bewegung über Distanz oder das Vergehen eines Tages
   spürbar macht. Kein umgefärbter Spotlight, kein nachjustierter Tilt.
6. **Wie weit weg von premium-minimal:** **editorial**. Nicht brutalistisch, nicht
   maximalistisch, nicht verspielt-retro. Ein Magazin, das sich bewegt.
7. **Eine Welt oder getrennte Szenen:** **getrennte Szenen.** Es sind verschiedene
   Reisen an verschiedenen Orten; ein durchgehender Kameraflug wäre gelogen und
   teuer. Kapitel mit Schnitten, nicht ein Flug.
8. **Vorhandene Assets:** 83 eigene Fotos und Videos, beschriftet, in
   `content/assets/cloudinary.json`. **Nichts wird generiert.**

Führe zusätzlich den Fingerprint-Gate des Skills aus. Das Register ist leer — dein
erster Build hat nichts zu unterbieten. Trag die Zeile am Ende ein.

## 11 Pflichtseiten — rechtlich, nicht optional

Die aktuelle Seite ist unter braun-steven.de öffentlich erreichbar und hat **weder
Impressum noch Datenschutzerklärung**. Das ist eine Lücke, die mit diesem Neubau
geschlossen wird.

**Impressum** nach § 5 DDG. Steven hat bewusst entschieden, die private Anschrift
zu verwenden:

```
Steven Braun
Goethestraße 38
32469 Petershagen
Deutschland

E-Mail: steven@braun-agents.de
```

Genau so, ohne Zusätze. Keine erfundene USt-IdNr., keine Handelsregisternummer,
keine Aufsichtsbehörde, keine Berufshaftpflicht — das ist eine private Seite,
nichts davon existiert. Und kein „Angaben gemäß § 5 TMG": das Gesetz heißt seit
2024 **DDG**.

Die Anschrift steht **nur** im Impressum. Nicht im Footer, nicht in strukturierten
Daten, nicht im Kontaktbereich. Der Kontaktbereich führt weiter „Bad Mergentheim"
als Standort — das ist der Studien- und Arbeitsort und bleibt so.

Beachte: die Impressums-Adresse `steven@braun-agents.de` ist eine **andere** als
die Kontaktadresse weiter unten unter „Kontaktwege" (`stevenbraun3107@icloud.com`).
Das ist so gewollt. Im Impressum steht die eine, im Kontaktbereich die andere.
Vereinheitliche sie nicht.

**Datenschutzerklärung.** Kurz halten und wahrheitsgemäß, passend zu dem, was
tatsächlich eingebunden ist: Hosting bei Vercel, Bildauslieferung über Cloudinary,
Schriften selbst gehostet über `next/font`, kein Tracking, keine Cookies, kein
Kontaktformular. Schreib keinen Rechtstext für Dienste, die gar nicht eingebunden
sind. Wenn du am Ende doch etwas eingebunden hast, das Daten überträgt, muss es hier
stehen — oder es fliegt raus.

### Kontaktwege — belegt

- E-Mail: `stevenbraun3107@icloud.com`
- LinkedIn: `https://www.linkedin.com/in/steven-braun-4a5266202/`
- GitHub: `https://github.com/thexsteven`
- Standort: Bad Mergentheim

Kontakt läuft über `mailto:`. **Kein Formular** — das bräuchte ein Backend und eine
größere Datenschutzerklärung.

## 12 Abnahme — fertig ist die Seite erst dann

1. Der Verifikationslauf des Skills ist gelaufen (`doctor.mjs`, `serve.mjs`,
   `shoot.mjs` für Desktop, Mobil und `--reduced-motion`) und meldet keine offenen
   Punkte: kein toter Scroll, keine Cue ohne volle Deckkraft, Kontraste am
   zusammengesetzten Bild gemessen bestanden. Kontaktbogen erzeugt **und angesehen**.
   Vorher einmalig `npm i playwright-core` im Projektordner.
2. Der Feel-Check ist gelaufen: kalt durchscrollen, ein Wort pro Akt notieren, erst
   dann gegen `BRIEF.md` diffen. Wo beide auseinandergehen, ist die Seite falsch,
   nicht der Brief.
3. `npm run build` läuft ohne Fehler und ohne neue Warnungen durch.
4. `npm run lint` ist sauber.
5. Mobil ist eigenständig art-direktet, nicht skaliert.
6. **Kein Platzhaltertext, kein Blindtext, kein Platzhalterbild** irgendwo im
   Dokument.
7. Nichts aus der `gesperrt`-Liste ist eingebunden. Prüf das mit einer Suche über den
   Build-Output, nicht aus dem Gedächtnis.
8. Impressum und Datenschutz existieren und sind aus dem Footer erreichbar.
9. Jedes Bild hat einen Alt-Text. Jedes Video hat ein Poster und keinen Ton.
10. Tab-Reihenfolge ist sinnvoll, Fokus ist sichtbar, `SkipLink` funktioniert noch.
11. Die Seite lädt auf einer gedrosselten Verbindung in vertretbarer Zeit. Nenn die
    Größe der schwersten Route.

## 13 Deploy

- Commit auf den Branch, Push zu `origin`. Commit-Messages auf **Deutsch**.
- Vercel baut daraus automatisch ein Preview. Die URL nennst du.
- **Kein Merge nach `master`, kein Production-Deploy, keine Domain-Änderung** ohne
  Steven's ausdrückliche Freigabe. Auch nicht „zur Sicherheit schon mal".
- `.env` und `.mcp.json` enthalten Secrets und sind gitignored. Halte das so. Schreib
  keine Zugangsdaten in Dateien, die committet werden.

## 14 Abschlussbericht

Am Ende, knapp:

- Gewählte Grammatik und warum die anderen sieben nicht gepasst haben.
- Der Signature Move, in einem Satz.
- Ergebnis des Fingerprint-Gates.
- Journey, Feeling-Curve, der Peak, und der Feel-Check-Diff.
- Die Score-Tabelle: Device pro Beat.
- Was du verifiziert hast — und **was nicht**. Ein grüner Headless-Lauf deckt kein
  echtes iPhone ab; sag das.
- **Offene Punkte für Steven** — alles, was dir beim Bauen an Faktenlücken
  aufgefallen ist. Die vier Punkte aus der Vorbereitung sind geklärt und stehen
  bereits im Auftrag; nenn nur, was **neu** dazugekommen ist.
- **Und ehrlich: was ist nicht gut geworden, wo hast du einen Kompromiss gemacht.**

---

Fang damit an, mir den Brief in fünf Sätzen zusammenzufassen und alles zu fragen, was
unklar ist. Erst danach legst du die erste Datei an.
