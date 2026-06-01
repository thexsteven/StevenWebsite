type HawaiiSectionHeaderProps = {
  /** Überschrift / Eyecatcher der Unter-Sektion. */
  title: string;
  /** Optionale Lead-Bild-URL → Hero mit Titel-Overlay. Ohne → typografischer Kopf. */
  image?: string;
  /** Alt-Text für das Lead-Bild. */
  imageAlt?: string;
  /** Optionale id zum Verlinken / aria. */
  id?: string;
};

/**
 * Eyecatcher am Kopf jeder Hawaii-Unter-Sektion.
 * – Mit `image`: Hero-Bild, Titel als Overlay.
 * – Ohne: kräftiger typografischer Kopf in den Markenfarben.
 */
export function HawaiiSectionHeader({
  title,
  image,
  imageAlt,
  id,
}: HawaiiSectionHeaderProps) {
  if (image) {
    return (
      <header className="hawaii-shead hawaii-shead--hero">
        <img
          className="hawaii-shead-img"
          src={image}
          alt={imageAlt ?? ''}
          loading="lazy"
          decoding="async"
        />
        <div className="hawaii-shead-overlay">
          <h2 id={id} className="hawaii-shead-title">
            {title}
          </h2>
        </div>
      </header>
    );
  }

  return (
    <header className="hawaii-shead">
      <h2 id={id} className="hawaii-shead-title">
        {title}
      </h2>
    </header>
  );
}
