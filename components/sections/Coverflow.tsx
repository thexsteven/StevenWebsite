'use client';

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';

/**
 * Eine Folie im Coverflow. Mehr braucht es nicht, um eine neue Station
 * hinzuzufügen: eine Zeile pro Foto.
 *   { src: '…cloudinary…/foto.jpg', alt: 'Beschreibung', caption: 'Story-Satz' }
 */
export type CoverflowSlide = {
  src: string;
  alt: string;
  caption?: string;
};

type CoverflowProps = {
  slides: CoverflowSlide[];
  /** Wird für aria-label & eindeutige IDs genutzt, z. B. "Hawaii". */
  label: string;
};

const INTERVAL = 5000; // Auto-Play-Takt (~5 s)
const TRANSITION = 550; // ms, gemäß Vorgabe
const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const SWIPE_THRESHOLD = 45; // px, ab hier zählt es als Wisch

// 3D-Geometrie je nach Abstand zur Mitte. Desktop = volle Tiefe,
// "compact" (Mobile) = abgeflacht, damit nichts überläuft und alles tappbar bleibt.
function geometry(offset: number, compact: boolean) {
  const dir = Math.sign(offset);
  const dist = Math.abs(offset);

  if (dist > 2) {
    // außerhalb des Sichtfensters – ausblenden
    return { x: dir * (compact ? 140 : 320), z: -600, ry: 0, scale: 0.4, opacity: 0 };
  }
  if (dist === 0) {
    return { x: 0, z: 0, ry: 0, scale: 1, opacity: 1 };
  }

  const step = compact ? 118 : 210; // horizontaler Abstand pro Folie
  const x = dir * (step * dist);
  const z = compact ? dist * -45 : dist * -165; // Tiefe (flach auf Mobile)
  const ry = -dir * (compact ? 18 : 42); // Y-Rotation, Mitte zugewandt
  const scale = dist === 1 ? (compact ? 0.84 : 0.82) : compact ? 0.7 : 0.66;
  const opacity = dist === 1 ? 0.5 : 0.22;

  return { x, z, ry, scale, opacity };
}

export function Coverflow({ slides, label }: CoverflowProps) {
  const n = slides.length;

  const [current, setCurrent] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);
  const [engaged, setEngaged] = useState(false); // Hover oder Tastatur-Fokus
  const [inView, setInView] = useState(false); // im Viewport sichtbar
  const [canHover, setCanHover] = useState(true); // Zeigegerät mit Hover?

  const rootRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);

  // prefers-reduced-motion, Breakpoint & Hover-Fähigkeit beobachten
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 640px)');
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      setReduced(motion.matches);
      setCompact(small.matches);
      setCanHover(hover.matches);
    };
    sync();
    motion.addEventListener('change', sync);
    small.addEventListener('change', sync);
    hover.addEventListener('change', sync);
    return () => {
      motion.removeEventListener('change', sync);
      small.removeEventListener('change', sync);
      hover.removeEventListener('change', sync);
    };
  }, []);

  // Nur abspielen, wenn das Karussell auch wirklich im Bild ist
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => setCurrent(((index % n) + n) % n),
    [n],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Modernes Auto-Play: ruht standardmäßig. Auf Hover-Geräten läuft nur das
  // Karussell, mit dem man gerade interagiert (Hover/Fokus); auf Touch-Geräten
  // das, was im Viewport steht. So bewegen sich nie beide gleichzeitig.
  const autoplaying =
    !reduced && n > 1 && inView && (canHover ? engaged : true);

  useEffect(() => {
    if (!autoplaying) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % n), INTERVAL);
    return () => clearInterval(id);
  }, [autoplaying, n]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointerStart.current = e.clientX;
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const dx = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <>
      <style>{`
        /* Sitzt bündig zwischen Kopf und Stats – keine eigenen runden Ecken,
           sonst blitzt der weiße Karton als Kerbe am Übergang durch. */
        .cf-root {
          position: relative;
          width: 100%;
          margin: 0;
          background: #0a0a0a;
          overflow: hidden;
        }
        .cf-stage {
          position: relative;
          width: 100%;
          height: clamp(280px, 52vw, 420px);
          perspective: 1400px;
          outline: none;
          touch-action: pan-y;
          cursor: grab;
        }
        .cf-stage:active { cursor: grabbing; }
        .cf-stage:focus-visible {
          box-shadow: inset 0 0 0 3px var(--color-accent);
          border-radius: var(--radius-md);
        }
        .cf-track {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }
        .cf-slide {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(220px, 58%, 460px);
          height: 78%;
          margin: 0;
          padding: 0;
          border: none;
          background: #111;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          will-change: transform, opacity;
          transition:
            transform ${TRANSITION}ms ${EASE},
            opacity ${TRANSITION}ms ${EASE};
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
        }
        .cf-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          -webkit-user-drag: none;
          user-select: none;
        }
        /* Dunkles Scrim für Lesbarkeit der Caption */
        .cf-caption {
          position: absolute;
          inset: auto 0 0 0;
          padding: 30px 18px 16px;
          font-family: var(--font-cormorant), var(--font-serif), serif;
          font-size: 0.95rem;
          font-style: italic;
          line-height: 1.35;
          color: #fff;
          text-align: left;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.82) 0%,
            rgba(0, 0, 0, 0.35) 60%,
            rgba(0, 0, 0, 0) 100%
          );
          transition: opacity ${TRANSITION}ms ${EASE};
        }

        /* ——— Steuerung (unter der Bühne, auf hellem Karton) ——— */
        .cf-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 14px 16px 18px;
          background: #0a0a0a;
        }
        .cf-arrow {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: rgba(255, 255, 255, 0.7);
          border-radius: 999px;
          font-size: 16px;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .cf-arrow:hover {
          border-color: #fff;
          color: #fff;
        }
        .cf-arrow:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }
        .cf-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cf-dot {
          width: 22px;
          height: 3px;
          padding: 0;
          border: none;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.25);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .cf-dot:hover { background: rgba(255, 255, 255, 0.5); }
        .cf-dot.is-active {
          width: 40px;
          background: var(--color-accent);
        }
        .cf-dot:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 3px;
        }
        /* Auto-Play-Fortschritt: dezente Linie an der Unterkante der Bühne */
        .cf-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.12);
          z-index: 40;
          pointer-events: none;
        }
        .cf-progress-fill {
          height: 100%;
          width: 0;
          background: var(--color-accent);
          animation: cf-progress ${INTERVAL}ms linear;
        }
        @keyframes cf-progress {
          from { width: 0; }
          to { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cf-slide { transition: opacity ${TRANSITION}ms ease; }
        }
      `}</style>

      <div
        className="cf-root"
        ref={rootRef}
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        onFocus={() => setEngaged(true)}
        onBlur={(e) => {
          // nur lösen, wenn der Fokus das Karussell ganz verlässt
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setEngaged(false);
        }}
      >
        <div
          className="cf-stage"
          role="group"
          aria-roledescription="Karussell"
          aria-label={`${label} – Bildergalerie`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div className="cf-track">
            {slides.map((slide, i) => {
              // kürzester Abstand auf dem Ring → unendliches Looping in beide Richtungen
              let offset = i - current;
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;

              const isCurrent = offset === 0;
              const g = reduced
                ? { x: 0, z: 0, ry: 0, scale: 1, opacity: isCurrent ? 1 : 0 }
                : geometry(offset, compact);

              const style: CSSProperties = {
                transform: `translate(-50%, -50%) translateX(${g.x}px) translateZ(${g.z}px) rotateY(${g.ry}deg) scale(${g.scale})`,
                opacity: g.opacity,
                zIndex: 100 - Math.abs(offset),
                pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto',
              };

              return (
                <button
                  type="button"
                  key={i}
                  className="cf-slide"
                  style={style}
                  aria-hidden={isCurrent ? 'false' : 'true'}
                  tabIndex={-1}
                  onClick={() => !isCurrent && goTo(i)}
                >
                  <img src={slide.src} alt={slide.alt} loading="lazy" decoding="async" />
                  {slide.caption && (
                    <span
                      className="cf-caption"
                      style={{ opacity: isCurrent ? 1 : 0 }}
                    >
                      {slide.caption}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {autoplaying && (
            <div className="cf-progress" aria-hidden="true">
              <div className="cf-progress-fill" key={current} />
            </div>
          )}
        </div>

        <div className="cf-controls">
          <button type="button" className="cf-arrow" onClick={() => prev()} aria-label="Vorheriges Bild">
            ←
          </button>

          <div className="cf-dots" role="group" aria-label={`${label} Bildauswahl`}>
            {slides.map((slide, i) => (
              <button
                type="button"
                key={i}
                className={`cf-dot${i === current ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={
                  i === current
                    ? `Bild ${i + 1} von ${n} (aktuell): ${slide.alt}`
                    : `Zu Bild ${i + 1} von ${n}: ${slide.alt}`
                }
              />
            ))}
          </div>

          <button type="button" className="cf-arrow" onClick={() => next()} aria-label="Nächstes Bild">
            →
          </button>
        </div>
      </div>
    </>
  );
}
