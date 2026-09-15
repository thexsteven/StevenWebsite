# Reisealben

Thailand: 68 Fotos („Bangkok von oben“ auf Wunsch entfernt) aus den vier Unterordnern von `reisealbum-neu/thailand`, Stand 15.09.2026. Bangkok (06.–09.08.), Koh Phangan (09.–22.08.), Koh Samui (23.08.) und Phuket (24.–26.08.), jeweils 2026. Alle Fotos anhand einer Kontaktübersicht gesichtet; Texte aus den vorhandenen Cloudinary-Beschriftungen überarbeitet. Reihenfolge innerhalb der Orte thematisch, keine behaupteten Aufnahmezeiten. Der Tempelbericht bleibt als persönliche Begegnung gekennzeichnet. Keine genaue Fotokarte ohne bestätigte Koordinaten. Originale wie bei den anderen Alben authentifiziert; Auslieferung über `/reisen/archiv/thailand/bilder/[id]`. Eigene Postkarten-Vorschau und auf Thailand begrenzte Albumgestaltung.

Konstanz–Cannes: 76 Fotos aus `reisealbum-neu/radtour-cannes`, Stand 12.09.2026. Alle 76 Metadatensätze geprüft; 58 enthalten GPS. Drei optionale Kapitelkarten zeigen zwölf ausgewählte Fotostopps. Quellenkoordinaten stehen in `cannes-map-sources.json`; keine erfundene Verbindungslinie, keine Standortmarker an Privatwohnungen/Gärten. Beschriftungen mit widersprüchlichen Datumsangaben werden ohne exaktes Tagesdatum erzählt. Die Aufnahmen im Argentera-Gebiet werden nicht als Nachweis eines Gipfelerfolgs bezeichnet. Neue Cannes-Originale sind wie Hawaii authentifiziert.

Pro Urlaubstrip höchstens fünf thematisch passende Kapitel. Alle neu bereitgestellten Fotos kategorisieren; ähnliche Motive zusammenhalten. Texte auf Deutsch, in Stevens Ich-Perspektive, anschaulich und gelegentlich humorvoll. Keine Erlebnisse erfinden.

Hawaii: 41 Fotos aus `reisealbum-neu/hawaii`, Stand 11.09.2026. Die ursprünglichen Beschreibungen bleiben in Cloudinary erhalten. Das als Punaluʻu beschriftete Bunkerfoto (`hawaii-40`) zeigt einen anderen Aussichtspunkt und ist ohne genaue Ortsbehauptung einsortiert.

Die neuen Hawaii-Originale verwenden Cloudinarys Delivery-Typ `authenticated`. Die App signiert ausschließlich serverseitig und liefert verkleinerte WebP-Bilder über eine Sitzung geprüfte Route mit `private, no-store` aus. Keine Cloudinary-URLs oder Signaturen an den Client geben und nicht über den öffentlichen Next-Image-Optimizer ausliefern.

Deployment benötigt `TRAVEL_PAGE_PASSWORD`, `CLOUDINARY_CLOUD_NAME` und `CLOUDINARY_API_SECRET`. Das lokale Vorschaupasswort gehört nicht in die Produktion. Die bisherigen öffentlichen Reiseberichte und deren alten Medien sind von diesem Album getrennt.
