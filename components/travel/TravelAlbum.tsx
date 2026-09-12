'use client';

import { useEffect, useRef, useState } from 'react';
import type { TravelAlbumData } from '@/lib/travelAlbum';
import { AlbumMap } from './AlbumMap';
import styles from './TravelAlbum.module.css';

export function TravelAlbum({ album }: { album: TravelAlbumData }) {
  const imageUrl = (id: string, width = 960) => `/reisen/archiv/${album.slug}/bilder/${id}?w=${width}`;
  const photos = album.sections.flatMap((section) => section.photos);
  const [active, setActive] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const photo = active === null ? null : photos[active];
  const cover = photos.find((item) => item.id === album.cover)!;
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previous; };
  }, [isOpen]);

  function move(direction: number) {
    setFailed(false);
    setActive((index) => index === null ? null : (index + direction + photos.length) % photos.length);
  }

  return (
    <article className={styles.album} data-album={album.slug}>
      <header className={styles.intro}>
        <a className={styles.back} href="/reisen/archiv">← Alle Reisen</a>
        <p className={styles.eyebrow}>{album.locationLabel}</p>
        <h1>{album.title}</h1>
        <p className={styles.subtitle}>{album.subtitle}</p>
        <p className={styles.description}>{album.intro}</p>
        <div className={styles.meta}><span>{album.durationLabel}</span><span>{photos.length} Erinnerungen</span><span>{album.sections.length} Kapitel</span></div>
      </header>
      <figure className={styles.cover}>
        {/* Native images preserve the session cookie; Next's public image optimizer must not cache private media. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl(cover.id, 1920)} alt={cover.alt} fetchPriority="high" />
        <figcaption>{album.coverCaption}</figcaption>
      </figure>
      <nav className={styles.chapters} aria-label="Albumkapitel">
        {album.sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>0{index + 1}</span>{section.title}</a>)}
      </nav>
      <div className={styles.content}>
        {album.sections.map((section, sectionIndex) => (
          <section id={section.id} key={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Kapitel 0{sectionIndex + 1} · {section.photos.length} Bilder</p>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              <p>{section.intro}</p>
            </header>
            {section.mapStops && section.mapStops.length > 0 && <AlbumMap stops={section.mapStops} title={section.title} />}
            <div className={styles.grid}>
              {section.photos.map((item) => (
                <figure key={item.id} id={item.id} className={styles.photo}>
                  <button type="button" aria-label={`${item.title} – Bild vergrößern`} onClick={() => { setFailed(false); setActive(photos.findIndex((p) => p.id === item.id)); }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl(item.id)} srcSet={`${imageUrl(item.id, 480)} 480w, ${imageUrl(item.id)} 960w`} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 30vw" width={item.width} height={item.height} alt={item.alt} loading="lazy" />
                    <span className={styles.zoom} aria-hidden="true">↗</span>
                  </button>
                  <figcaption><h3>{item.title}</h3><p>{item.caption}</p></figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
      <footer className={styles.end}><p>Die schönsten Erinnerungen?<br />Die Menschen darin.</p><a href="#main">Zurück nach oben ↑</a></footer>
      <dialog ref={dialog} className={styles.dialog} onCancel={() => setActive(null)} onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }} aria-label="Vergrößerte Bilderansicht">
        {photo && <div className={styles.viewer}>
          <div className={styles.viewerTop}><span>{active! + 1} / {photos.length}</span><button autoFocus type="button" onClick={() => setActive(null)} aria-label="Bilderansicht schließen">Schließen ×</button></div>
          <div className={styles.stage} onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current !== null) { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 60) move(delta < 0 ? 1 : -1); } touchStart.current = null; }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={photo.id} src={imageUrl(photo.id, 1920)} alt={photo.alt} onError={() => setFailed(true)} />
            {failed && <p role="alert">Das Bild konnte nicht geladen werden. Bitte lade die Seite neu und melde dich gegebenenfalls erneut an.</p>}
          </div>
          <div className={styles.viewerBottom}>
            <button type="button" onClick={() => move(-1)} aria-label="Vorheriges Bild">←</button>
            <div aria-live="polite"><h2>{photo.title}</h2><p>{photo.caption}</p></div>
            <button type="button" onClick={() => move(1)} aria-label="Nächstes Bild">→</button>
          </div>
        </div>}
      </dialog>
    </article>
  );
}
