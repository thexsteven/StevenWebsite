'use client';

import { useState, useEffect, useRef } from 'react';

type Moment = {
  id: number;
  image: string;
  tag: string;
  statement: string;
  location: string;
};

const CLOUDINARY_PLACEHOLDER =
  'https://res.cloudinary.com/dozdjb4fi/image/upload/v1778090896/WhatsApp_Image_2026-05-06_at_20.07.52_f4usek.jpg';

const moments: Moment[] = [
  {
    id: 1,
    // TODO: Cloudinary-URL für Halbmarathon-Foto hier eintragen
    image: CLOUDINARY_PLACEHOLDER,
    tag: 'Halbmarathon · 2026',
    statement: 'Das Gehirn lügt früher als der Körper.',
    location: 'Bad Mergentheim, Deutschland',
  },
  {
    id: 2,
    // TODO: Cloudinary-URL für Alpen-Foto hier eintragen
    image: CLOUDINARY_PLACEHOLDER,
    tag: 'Alpen',
    statement: 'Die Aussicht gehört denen, die aufsteigen.',
    location: 'Italienische Alpen',
  },
  {
    id: 3,
    // TODO: Cloudinary-URL für Venedig-Foto hier eintragen
    image: CLOUDINARY_PLACEHOLDER,
    tag: 'Venedig · 2026',
    statement: 'Schönheit braucht keine Erklärung.',
    location: 'Italien',
  },
  {
    id: 4,
    // TODO: Cloudinary-URL für Coding-Nacht-Foto hier eintragen
    image: CLOUDINARY_PLACEHOLDER,
    tag: 'Coding · Nacht',
    statement: 'Bauen ist die beste Art zu verstehen.',
    location: 'Zuhause',
  },
  {
    id: 5,
    // TODO: Cloudinary-URL für Gym-Foto hier eintragen
    image: CLOUDINARY_PLACEHOLDER,
    tag: 'Gym · täglich',
    statement: 'Wer seinen Körper kontrolliert, kontrolliert seinen Kopf.',
    location: 'Überall',
  },
];

const INTERVAL = 5000;
const TRANSITION_DURATION = 900;

export function MomentsCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (transitioning || index === current) return;
    setPrev(current);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setPrev(null);
      setTransitioning(false);
    }, TRANSITION_DURATION);
  };

  const next = () => goTo((current + 1) % moments.length);
  const prev2 = () => goTo((current - 1 + moments.length) % moments.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, paused, transitioning]);

  const currentMoment = moments[current];
  const prevMoment = prev !== null ? moments[prev] : null;

  return (
    <>
      <style>{`
        .mc-root {
          position: relative;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          height: 100vh;
          min-height: 420px;
          max-height: 520px;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.18);
          background: #0a0a0a;
          font-family: var(--font-cormorant), serif;
          cursor: default;
        }

        /* ——— Slide layers ——— */
        .mc-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mc-slide::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.38) 50%,
            rgba(0,0,0,0.18) 100%
          );
        }
        .mc-slide-current { opacity: 1; z-index: 2; }
        .mc-slide-prev    { opacity: 0; z-index: 1; }

        /* Grain overlay */
        .mc-grain {
          position: absolute;
          inset: 0;
          z-index: 3;
          opacity: 0.045;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* ——— Content ——— */
        .mc-content {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 40px;
        }

        /* Section title */
        .mc-section-title {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }

        /* Bottom area */
        .mc-bottom {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Tag */
        .mc-tag {
          display: inline-block;
          font-family: var(--font-dm-mono), monospace;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.18);
          padding: 5px 12px;
          width: fit-content;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .mc-tag.enter { opacity: 1; transform: translateY(0); }
        .mc-tag.exit  { opacity: 0; transform: translateY(8px); }

        /* Statement */
        .mc-statement {
          font-size: clamp(20px, 3vw, 38px);
          font-weight: 300;
          font-style: italic;
          color: #fff;
          line-height: 1.22;
          letter-spacing: -0.01em;
          max-width: 760px;
          transition: opacity 0.7s ease 0.08s, transform 0.7s ease 0.08s;
        }
        .mc-statement.enter { opacity: 1; transform: translateY(0); }
        .mc-statement.exit  { opacity: 0; transform: translateY(12px); }

        /* ——— Controls ——— */
        .mc-controls {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .mc-arrow {
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.6);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s;
          font-size: 16px;
          flex-shrink: 0;
        }
        .mc-arrow:hover {
          border-color: rgba(255,255,255,0.6);
          color: #fff;
        }

        .mc-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .mc-dot {
          width: 24px;
          height: 1px;
          background: rgba(255,255,255,0.25);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
          border: none;
          padding: 0;
        }
        .mc-dot.active {
          background: rgba(255,255,255,0.9);
          width: 40px;
        }

        /* Progress bar */
        .mc-progress {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .mc-progress-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          background: rgba(255,255,255,0.45);
          animation: progressAnim ${INTERVAL}ms linear;
        }
        @keyframes progressAnim {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Location */
        .mc-location {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-top: 4px;
        }

        @media (max-width: 640px) {
          .mc-root {
            border-radius: 10px;
            margin: 0 16px;
          }
          .mc-content { padding: 32px 28px; }
          .mc-tag { font-size: 9px; }
        }
      `}</style>

      <section
        id="moments"
        className="mc-root"
        aria-labelledby="moments-title"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mc-grain" />

        {prevMoment && (
          <div
            className="mc-slide mc-slide-prev"
            style={{ backgroundImage: `url(${prevMoment.image})` }}
          />
        )}

        <div
          className="mc-slide mc-slide-current"
          style={{ backgroundImage: `url(${currentMoment.image})` }}
        />

        <div className="mc-content">
          <h2 id="moments-title" className="mc-section-title">
            Moments that made me
          </h2>

          <div className="mc-bottom">
            <div>
              <div className={`mc-tag ${transitioning ? 'exit' : 'enter'}`}>
                {currentMoment.tag}
              </div>
              <div
                className={`mc-statement ${transitioning ? 'exit' : 'enter'}`}
              >
                {currentMoment.statement}
              </div>
              <div className="mc-location">{currentMoment.location}</div>
            </div>

            <div className="mc-controls">
              <button className="mc-arrow" onClick={prev2} aria-label="Previous">
                ←
              </button>
              <button className="mc-arrow" onClick={next} aria-label="Next">
                →
              </button>

              <div className="mc-dots">
                {moments.map((_, i) => (
                  <button
                    key={i}
                    className={`mc-dot${i === current ? ' active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Moment ${i + 1}`}
                  />
                ))}
              </div>

              <div className="mc-progress">
                <div
                  className="mc-progress-fill"
                  key={`${current}-${paused}`}
                  style={{ animationPlayState: paused ? 'paused' : 'running' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
