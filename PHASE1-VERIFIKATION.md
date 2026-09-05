# Phase 1 · Prüfbericht

## Aktuelle Revision · AI Automation Society

Stand: 5. September 2026. Die Startseite folgt jetzt der ausdrücklich gewünschten Referenz: zentrierter Sans-Serif-Einstieg, dunkle Flächen mit zurückhaltendem Türkislicht, ein gerahmtes Reisefenster mit seitlicher Navigation und darunter breite Reise-Panels. Das Reisefenster schaltet zwischen Hawaii, Radtour und Anreise nach Venedig um; Beschreibung, Motivplatzhalter und Linkziel wechseln gemeinsam. Die hellen Leseseiten und die Fallsequenz bleiben erhalten. Die folgenden älteren Abschnitte dokumentieren den ursprünglichen Entwurf.

Erneut erfolgreich: `npm run build`, `npm run lint` und alle 48 Routen-/Viewportprüfungen. Die Reiseauswahl wurde per Klick und Tastatur geprüft; SkipLink, SPA-Wechsel, Fallspur, 404-Routen, Cookie-Freiheit und Prosa ohne JavaScript ebenfalls. Keine Browserfehler oder horizontalen Überläufe; weiterhin keine echten Medien oder externen Bild-/Fontabrufe.

Neue Scrollaufnahmen: Desktop 1440×900 (25 Stichproben), Mobil 390×844 (26) und reduzierte Bewegung (20). Alle Kontaktbögen sowie der Desktop-Einstieg und das Reisefenster in voller Größe wurden visuell geprüft. Kein toter Scroll, keine Console-Fehler, gemessene Cue-Kontraste über 4,5:1. Seitenlänge etwa 6,8 Viewporthöhen auf Desktop, 7,3 mobil und 5,0 mit reduzierter Bewegung. Feel-Check: Neugier → Orientierung → Spannung → Klarheit → Nähe. Sog und Staunen durch persönliche Aufnahmen bleiben mit Platzhaltern ungeprüft.

- [Desktop der Revision](scrollcraft/builds/steven/lab/society-desktop/sheet.png)
- [Mobil der Revision](scrollcraft/builds/steven/lab/society-mobile/sheet.png)
- [Reduzierte Bewegung der Revision](scrollcraft/builds/steven/lab/society-reduced/sheet.png)

Die neuen Routen- und Leistungsmessungen liegen lokal unter `scrollcraft/builds/steven/lab/society-routes`. Bei deaktiviertem Cache, 1,6 Mbit/s Download und 150 ms Latenz: Startseite 187.634 Byte / 1,14 s bis Ladeereignis; Radtour 223.535 Byte / 1,33 s. Diese Labormessungen sind keine Aussage über die spätere Medienfassung. Kein echtes iPhone getestet. Das Medienmanifest wurde weiterhin nicht geöffnet.

## Ursprünglicher Entwurf

Stand: 5. September 2026. Der Entwurf läuft lokal unter http://localhost:4500. Die Medienfreigabe ist noch offen.

## Gestalt und Score
Grammatik: **Reisefolio**. Dunkler Umschlag mit eigenem Porträtfenster, frei anwählbare Reise-Kapitel auf Papier, genau eine gehaltene Filmseite, Werdegang und persönliches Kolophon. Die begründete Abgrenzung zu allen acht Ausgangsgrammatiken und der Ebenenvertrag stehen in BRIEF.md. Fingerprint-Gate: leeres Register, keine konkurrierende Zeile.

| Beat | Gefühl | Gerät |
|---|---|---|
| Person | Neugier | flow + parallax, drei unabhängige Ebenen |
| Reise-Einstiege und stiller Absatz | Sog | flow + reveal |
| Fallschirmsprung | Staunen | pin + eigene Fallspur, nach Freigabe scrub |
| Werdegang | Respekt | flow + in |
| Kontakt | Nähe | statisches Kolophon |

Signature Move: Eine horizontale Reiselinie kippt beim Scrollen in die Fallrichtung, während sich das Filmfenster öffnet. Die Werte kommen aus `--sc-p`, nicht aus React-State. Der Peak bekommt 2,8 Viewporthöhen, mobil 2,3. Gesamtlänge im Harness: etwa 6,5 Viewporthöhen; mit reduzierter Bewegung etwa 4,7 auf Desktop.

Visueller Feel-Check: Neugier → Orientierung → Spannung → Sachlichkeit → Nähe. Gegenüber dem Ziel fehlen noch Sog und Staunen der echten Aufnahmen sowie der persönliche Gehalt der noch unbeantworteten Texte. Das ist die Grenze der bildfreien Abnahme, kein als erfüllt ausgegebener emotionaler Endzustand. Korrigiert wurden ein überbreiter Porträtplatzhalter, eine zu lange Fallspur nahe dem Kapitellink und fehlende Sichtbarkeit des Werdegangtexts ohne JavaScript. Der Schluss bleibt gefüllt und ruhig.

## Ausgeführt
- `doctor.mjs`: Node, vollständiges ffmpeg, Chrome und Playwright vorhanden. Der optionale Generierungsschlüssel fehlt erwartungsgemäß; es wird nichts generiert.
- `serve.mjs --root scrollcraft --port 4501`: lokale Prüfartefakte. Die Anwendung selbst läuft mit `next start --port 4500`, da der statische Skill-Server keine Next.js-Routen ausführt.
- `npm run build`: erfolgreich, keine neuen Warnungen. Alle vorgesehenen Routen im Build-Manifest, keine Liebe-/Motivation-Routen.
- `npm run lint`: erfolgreich ohne Warnungen. Der alte `next lint`-Befehl wurde durch ESLint mit Next-Regeln ersetzt.
- `shoot.mjs`: Desktop 1440×900, Mobil 390×844 und reduzierte Bewegung. Keine Console-Fehler, kein toter Scroll, keine Cue ohne volle Deckkraft. Gemessene Cue-Kontraste über 4,5:1. Alle finalen Kontaktbögen geöffnet und visuell geprüft.
- `scripts/verify-editorial.mjs`: alle 16 Seiten bei 1440×900, 390×844 und 360×640. Jeweils Status 200, genau eine H1, kein horizontaler Überlauf, keine Medienquellen oder externen Bild-/Fontabrufe. Browserfehler und fehlgeschlagene Ressourcen: null.
- Tastatur: SkipLink ist der erste Fokus und führt in `main`; Kontaktziel und Mailadresse geprüft. Drei SPA-Hin-und-zurück-Wechsel: jeweils genau eine Engine-Instanz. Fallspur an Anfang/Mitte/Ende: 0°, 45°, 90°.
- Ohne JavaScript bleibt die Werdegang-Prosa sichtbar. Keine Cookies nach der Navigation. Entfernte und unbekannte Routen liefern 404.
- JS und CSS der Engine sind bytegleich zu den Skill-Originalen. Der externe Lifecycle-Adapter räumt RAFs, Listener, Observer, Timer und Objekt-URLs auf.
- Build-HTML nach Medienquellen durchsucht: keine Cloudinary-URLs, Bild-/Videoelemente oder alten Bildpfade. Damit wird kein gesperrtes Medium eingebunden, ohne das erst in Phase 2 erlaubte Manifest zu öffnen.
- Die geschützten Altdateien bleiben unverändert; die aktiven Routen heißen `page.site.tsx` / `layout.site.tsx`. `site.mdx` als zweite erlaubte Endung verhindert einen Next-15-Loaderfehler bei einer einzelnen benutzerdefinierten Endung. Alte `page.tsx`-Dateien sind weiterhin vorhanden, nehmen aber nicht am Routing teil.

Die ersten Desktop-/Mobil-Aufnahmen unter `lab/desktop` und `lab/mobile` wurden durch die `final-*`-Läufe ersetzt; die alten Befunde bleiben zur Nachvollziehbarkeit lokal erhalten.

## Kontaktbögen
- [Desktop](scrollcraft/builds/steven/lab/final-desktop/sheet.png)
- [Mobil](scrollcraft/builds/steven/lab/final-mobile/sheet.png)
- [Reduzierte Bewegung](scrollcraft/builds/steven/lab/final-reduced/sheet.png)

Die Bilder und JSON-Messdaten liegen nur lokal im ignorierten `lab`-Verzeichnis.

## Ladeleistung
Mit deaktiviertem Browsercache, 1,6 Mbit/s Download und 150 ms Latenz: Startseite 265.594 Byte Übertragung, Ladeereignis nach 1,55 s; Radtour 220.470 Byte, 1,31 s. Diese Werte enthalten die vom Browser erfassten Dokument-, Ressourcen- und Prefetch-Abrufe. Das größte statische HTML ist die Radtour (22.343 Byte unkomprimiert). Alle Routen teilen Schrift-, CSS- und grundlegende JS-Dateien; die schwerste der zusätzlich gedrosselt gemessenen Seiten ist die Startseite. Die Next-Buildtabelle zeigt mit den eigenen Dateiendungen unbrauchbare 0-B-Routenwerte, deshalb stammen die genannten Übertragungsgrößen aus dem Browser.

## Grenzen und nächste Phase
Kein echtes iPhone getestet. Keine Videos geladen oder kodiert, daher keine Aussage über iOS-Scrubbing, Decoder, Low Power Mode oder die endgültige Medien-Ladeleistung. Bildkomposition und Kontrast auf echten Fotos werden erst nach der Motivfreigabe geprüft. Die neutralen Flächen sind absichtlich noch keine überzeugende Reiseerfahrung. Persönliche Reiseprosa und Lebenslauf brauchen die Antworten aus PHASE1-MEDIEN.md. Das ist ein abnahmefähiger Phase-1-Entwurf, keine Freigabe für Produktion.

Die Datenschutzerklärung beschreibt die tatsächliche bildfreie Fassung. Cloudinary wird vor seinem Einsatz ergänzt. Quellenprüfung: [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html), [Vercel-Datenschutzhinweise](https://vercel.com/legal/privacy-notice), [Cloudinary-Datenschutz](https://cloudinary.com/privacy). Aufbewahrungsfristen oder persönliche Erlebnisse wurden nicht erfunden.
