export const placeholders = {
  portrait: { file: 'steven-portraet.webp', mobile: 'steven-portraet-mobil.webp', question: 'Welches Porträt soll dich auf der Startseite und auf Über mich zeigen?' },
  hawaii: { file: 'hawaii-oahu-auftakt.webp', mobile: 'hawaii-oahu-auftakt-mobil.webp', question: 'Welches Oahu-Motiv eröffnet die Hawaii-Reise?' },
  cycling: { file: 'radtour-alpenpass.webp', mobile: 'radtour-alpenpass-mobil.webp', question: 'Welches Alpenpassfoto soll für die Radtour stehen?' },
  fall: { file: 'hawaii-absprung.mp4', mobile: 'hawaii-absprung-mobil.mp4', question: 'Welches Video zeigt den Fallschirmsprung? Welches Standbild soll das Poster sein?' },
  arrival: { file: 'hawaii-ankunft.webp', mobile: 'hawaii-ankunft-mobil.webp', question: 'Welche Aufnahme trägt das Ankommen auf Oahu?' },
  daily: { file: 'hawaii-alltag.webp', mobile: 'hawaii-alltag-mobil.webp', question: 'Welches Motiv zeigt deinen Alltag zwischen Ala Moana und der Stadt?' },
  adventures: { file: 'hawaii-unterwegs.webp', mobile: 'hawaii-unterwegs-mobil.webp', question: 'Welche Wanderung oder Mietwagenszene soll vor dem Absprung stehen?' },
  food: { file: 'hawaii-essen.webp', mobile: 'hawaii-essen-mobil.webp', question: 'Welches eigene Essensfoto gehört zu einer Geschichte, die du erzählen möchtest?' },
  island: { file: 'hawaii-big-island.webp', mobile: 'hawaii-big-island-mobil.webp', question: 'Welches Big-Island-Motiv soll den ruhigeren Inselwechsel zeigen?' },
  departure: { file: 'radtour-aufbruch.webp', mobile: 'radtour-aufbruch-mobil.webp', question: 'Welche Aufnahme an der Einfahrt eröffnet die Radtour?' },
  turin: { file: 'radtour-turin.webp', mobile: 'radtour-turin-mobil.webp', question: 'Welches Bild erzählt den Zwischenhalt in Turin?' },
  pizza: { file: 'pizzateig-kueche.webp', mobile: 'pizzateig-kueche-mobil.webp', question: 'Soll die im Auftrag genannte Pizzateig-Szene den größten Bildraum dieser Geschichte bekommen?' },
  destination: { file: 'radtour-ankunft.webp', mobile: 'radtour-ankunft-mobil.webp', question: 'Welches Bild zeigt die Ankunft in Südfrankreich?' },
  night: { file: 'venedig-anreise-nacht.webp', mobile: 'venedig-anreise-nacht-mobil.webp', question: 'Welche der Nachtaufnahmen aus den Bergen soll das Nachtstück tragen?' },
  mountain: { file: 'venedig-anreise-berge.webp', mobile: 'venedig-anreise-berge-mobil.webp', question: 'Soll das Bergpanorama den Abschluss der Reiseübersicht bilden?' },
  sport: { file: 'steven-training.webp', mobile: 'steven-training-mobil.webp', question: 'Welches Trainingsmotiv möchtest du auf Über mich zeigen?' },
} as const;

export type PlaceholderName = keyof typeof placeholders;
