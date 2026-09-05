# Phase 2 · Prüfbericht

Stand: 5. September 2026. Medienfreigabe und ursprüngliche Türkis-Palette von Steven bestätigt. Die Firmenpalette ist separat in BRAUN-AGENTS-FARBPALETTE.md dokumentiert.

## Ergebnis

Alle Medienplatzhalter wurden durch geprüfte Fotos oder den Flugclip ersetzt. Die Anwendung enthält ausschließlich 22 ausgewählte, freigegebene Datensätze aus dem Manifest. Alt-Texte und sichtbare Bildunterschriften bleiben unverändert. Responsive Bildquellen verwenden `f_auto,q_auto` und eine explizite Breite; Bilder und Poster liegen ausschließlich bei Cloudinary. Die zwei stummen Scrub-Dateien werden entsprechend der Ausnahme in CODEX-PROMPT.md §9 lokal ausgeliefert.

Die Reisefolio-Grammatik, das gerahmte Reisefenster, die Navigation und der ruhige Kontaktabschluss bleiben erhalten. Dies ist eine Medienrevision desselben Builds, kein neuer Fingerprint-Gate. Der Signature Move verbindet die kippende Falllinie jetzt mit einer Fotofolge von Vorbereitung/Absprung über Freifall bis zum offenen Schirm. Ein Fallschirmsprungvideo ist im freigegebenen Bestand nicht vorhanden.

| Beat | Device | Umsetzung |
|---|---|---|
| Person und Reiseauswahl | flow + parallax | Porträt und auswählbare Reisemotive in getrennten Ebenen |
| Reise-Einstiege | flow + reveal | Fotos und Links zu Hawaii und Radtour |
| Fallschirmsprung | pin + Falllinie + Fotoblenden | Größter Scroll-Raum der Startseite, 2,8 Viewporthöhen, mobil 2,3 |
| Werdegang | flow + in | Ruhigere Prosa nach dem Peak |
| Kontakt | flow | Statischer Abschluss |
| Ankunftskapitel | scrub | Sieben Sekunden aus dem Flugclip; Hochformatkomposition auf beiden Geräten |

Feel-Check anhand der Scrollaufnahmen: Neugier → Reiselust → Spannung → Klarheit → Nähe. Die eigenen Bilder tragen die Reise jetzt sichtbar. Der Fallschirmsprung bleibt eine fotografische Erzählung und erreicht nicht die kontinuierliche Bewegung eines echten Sprungfilms. Die noch fehlenden persönlichen Erinnerungen begrenzen die erzählerische Tiefe.

## Ausgeführt

- `doctor.mjs`: alle benötigten Werkzeuge vorhanden. Kein Generierungsschlüssel nötig.
- `npm run build` und `npm run lint`: erfolgreich, ohne neue Warnungen.
- `scripts/verify-editorial.mjs`: 16 Seiten bei 1440×900, 390×844 und 360×640, insgesamt 48 Kombinationen. Status 200, eine H1, kein Überlauf, alle gerenderten Bilder dekodierbar und mit Alt-Text. Keine Bildplatzhalter, kein unerlaubter externer Font- oder Trackingabruf, keine Browser-/HTTP-Fehler.
- Reiseauswahl per Klick und Tastatur, SkipLink, Kontaktanker, drei SPA-Rundläufe, ausgeschlossene Routen und Cookie-Freiheit erfolgreich geprüft. Prosa bleibt ohne JavaScript sichtbar. Die drei Fallzustände zeigen jeweils ausschließlich das zugehörige Foto.
- `scripts/verify-media.mjs`: 22 Datensätze gegen die Quelle abgeglichen; 94 Build-Dateien gegen alle 48 gesperrten Assets geprüft. Keine Treffer. Engine-JS und Engine-CSS bytegleich zum Skill. Beide Videos sind H.264 ohne Tonspur, unter 5 MB, mit maximal 8 bzw. 4 Frames zwischen Schlüsselbildern.
- `shoot.mjs`: Startseite auf Desktop, mobil und mit reduzierter Bewegung. Kein toter Scroll, alle gemessenen Text-Cues über 4,5:1. Kontaktbögen angesehen. Mobile Fotoblenden wurden korrigiert, damit das vorherige Hochformat nicht hinter dem nächsten Querformat stehen bleibt.
- Flugabschnitt: Desktop und mobil geprüft; das Video bewegt sich über seine sichtbare Scrollstrecke. Ein überschreibendes `position: relative` wurde entfernt und die haftende Szene erneut geprüft. Mobile Quelle, `muted`, `playsInline`, Poster und fehlender Videodownload bei reduzierter Bewegung separat bestätigt. Die reduzierte Fassung hat keinen verlängerten Scroll-Raum.

## Lokale Bildnachweise

- [Startseite Desktop](scrollcraft/builds/steven/lab/media-desktop-final/sheet.png)
- [Startseite Mobil](scrollcraft/builds/steven/lab/media-mobile-final/sheet.png)
- [Startseite reduzierte Bewegung](scrollcraft/builds/steven/lab/media-reduced-final/sheet.png)
- [Flug Desktop](scrollcraft/builds/steven/lab/flight-desktop-final/sheet.png)
- [Flug Mobil](scrollcraft/builds/steven/lab/flight-mobile-final/sheet.png)
- [Flug reduzierte Bewegung](scrollcraft/builds/steven/lab/flight-reduced-final/sheet.png)

Alle Kontaktbögen wurden geöffnet und geprüft. Labordaten und Originaldownloads bleiben lokal im ignorierten Lab-Verzeichnis.

## Ladeleistung und Grenzen

Cache deaktiviert, 1,6 Mbit/s Download, 150 ms Latenz: Startseite 385.894 Byte, Ladeereignis nach 2,33 s; Radtour 560.552 Byte, 3,18 s. Die gesondert gemessene schwerste Medienroute ist das Ankunftskapitel mit 2.740.150 Byte einschließlich des vollständig geladenen Desktopclips. Dort tritt das Ladeereignis nach 1,88 s ein, der Clip ist nach 14,49 s bereit. Bis dahin trägt das Poster die Szene. Das Ladeereignis ist ausdrücklich nicht gleichbedeutend mit einem bereits geladenen Scrub-Video.

Kein echtes iPhone getestet; Low Power Mode, iOS-Decoder und Touchgefühl müssen am echten Gerät beurteilt werden. Die offenen Fragen zu persönlichen Erlebnissen und Studienphasen aus PHASE1-MEDIEN.md sind weiter sichtbar. Die Medienfassung ist damit prüfbar, aber kein vollständig ausformulierter Reiseblog und keine Produktionsfreigabe. Kein Merge nach master und keine Domain-Änderung.

Die Datenschutzerklärung wurde an Cloudinary-Bildabrufe und die lokale Videoauslieferung angepasst; Grundlage für die Anbieterbeschreibung sind die [Cloudinary-Datenschutzhinweise](https://cloudinary.com/privacy).
