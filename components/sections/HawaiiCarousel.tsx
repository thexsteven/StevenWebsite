'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';

/**
 * Eine Folie im Hawaii-Karussell. Bild oder Video – jeweils eine Zeile:
 *   { type: 'image', src: '…', alt: '…', caption: '…' }
 *   { type: 'video', src: '…', label: '…', caption: '…' }
 */
export type HawaiiSlide = {
  type?: 'image' | 'video';
  src: string;
  /** Alt-Text für Bilder. */
  alt?: string;
  /** aria-label für Videos. */
  label?: string;
  /** Bildunterschrift unter der Bühne. */
  caption?: string;
};

type HawaiiCarouselProps = {
  slides: HawaiiSlide[];
  /** Für aria-label & Vorlese-Texte, z. B. "Calisthenics Park". */
  label: string;
};

const TRANSITION = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

export function HawaiiCarousel({ slides, label }: HawaiiCarouselProps) {
  const n = slides.length;

  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // prefers-reduced-motion beobachten (sanftes Scrollen ggf. abschalten)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  // Aktive Folie aus der Scroll-Position ableiten (eine Quelle der Wahrheit).
  const onScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = trackRef.current;
      if (!el) return;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive(Math.max(0, Math.min(n - 1, i)));
    });
  }, [n]);

  // Videos außerhalb der aktiven Folie pausieren – nie spielt etwas im Off.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const vids = el.querySelectorAll('video');
    vids.forEach((v, i) => {
      if (i !== active) v.pause();
    });
  }, [active]);

  const goTo = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(n - 1, index));
      el.scrollTo({
        left: clamped * el.clientWidth,
        behavior: reduced ? 'auto' : 'smooth',
      });
    },
    [n, reduced],
  );

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    }
  };

  if (n === 0) return null;

  const multi = n > 1;
  const current = slides[active];

  return (
    <>
      <style>{`
        .hc-root {
          position: relative;
          width: 100%;
          margin: 0;
        }
        /* Dunkle Bühne – ein Motiv im Fokus, leicht kinoartig. */
        .hc-stage {
          position: relative;
          background: #0a0a0a;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.16);
        }
        .hc-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          outline: none;
        }
        .hc-track::-webkit-scrollbar { display: none; }
        .hc-track:focus-visible {
          box-shadow: inset 0 0 0 3px var(--color-accent);
          border-radius: var(--radius-md);
        }
        .hc-slide {
          position: relative;
          flex: 0 0 100%;
          scroll-snap-align: center;
          scroll-snap-stop: always;
          height: clamp(300px, 56vw, 520px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hc-slide img,
        .hc-slide video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background: #0a0a0a;
        }

        /* ——— Bildunterschrift (wechselt mit der aktiven Folie) ——— */
        .hc-caption {
          padding: var(--space-sm) 2px 0;
          font-size: 0.8rem;
          font-style: italic;
          line-height: 1.45;
          color: var(--color-muted);
          text-align: center;
          max-width: 60ch;
          margin: 0 auto;
          transition: opacity 0.4s ${TRANSITION};
        }

        /* ——— Steuerung (Pfeile + Punkte) ——— */
        .hc-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding-top: var(--space-sm);
        }
        .hc-arrow {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-primary);
          border-radius: 999px;
          font-size: 16px;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .hc-arrow:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
        .hc-arrow:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }
        /* Pfeile sind die Desktop-Geste – auf Touch reicht das Wischen. */
        @media (hover: none), (max-width: 640px) {
          .hc-arrow { display: none; }
        }
        .hc-dots {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hc-dot {
          width: 22px;
          height: 3px;
          padding: 0;
          border: none;
          border-radius: 999px;
          background: rgba(15, 47, 95, 0.22);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .hc-dot:hover { background: rgba(15, 47, 95, 0.45); }
        .hc-dot.is-active {
          width: 36px;
          background: var(--color-accent);
        }
        .hc-dot:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 3px;
        }
      `}</style>

      <div className="hc-root">
        <div className="hc-stage">
          <div
            className="hc-track"
            ref={trackRef}
            onScroll={onScroll}
            role="group"
            aria-roledescription="Karussell"
            aria-label={`${label} – Galerie`}
            tabIndex={multi ? 0 : -1}
            onKeyDown={multi ? onKeyDown : undefined}
          >
            {slides.map((slide, i) => (
              <div
                className="hc-slide"
                key={i}
                role="group"
                aria-roledescription="Folie"
                aria-label={`${i + 1} von ${n}`}
              >
                {slide.type === 'video' ? (
                  <video controls preload="metadata" aria-label={slide.label}>
                    <source src={slide.src} type="video/mp4" />
                    Dein Browser unterstützt dieses Videoformat leider nicht.
                  </video>
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.alt ?? ''}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {current.caption && (
          <p className="hc-caption" aria-live="polite">
            {current.caption}
          </p>
        )}

        {multi && (
          <div className="hc-controls">
            <button
              type="button"
              className="hc-arrow"
              onClick={() => goTo(active - 1)}
              aria-label="Vorherige Folie"
            >
              ←
            </button>

            <div className="hc-dots" role="group" aria-label={`${label} Auswahl`}>
              {slides.map((slide, i) => (
                <button
                  type="button"
                  key={i}
                  className={`hc-dot${i === active ? ' is-active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={
                    i === active
                      ? `Folie ${i + 1} von ${n} (aktuell)`
                      : `Zu Folie ${i + 1} von ${n}`
                  }
                  aria-current={i === active ? 'true' : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              className="hc-arrow"
              onClick={() => goTo(active + 1)}
              aria-label="Nächste Folie"
            >
              →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
