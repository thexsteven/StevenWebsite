'use client';

import { useEffect } from 'react';

const CHAPTERS = [
  { slug: 'prolog', label: 'Prolog' },
  { slug: 'kapitel-01', label: 'Kapitel 01' },
  { slug: 'kapitel-02', label: 'Kapitel 02' },
  { slug: 'kapitel-03', label: 'Kapitel 03' },
  { slug: 'kapitel-04', label: 'Kapitel 04' },
  { slug: 'epilog', label: 'Epilog' },
] as const;

const DIR_KEY = 'love_page_dir';
const TRANSITION_MS = 320;

function chapterHref(slug: string) {
  return `/liebe/${slug}`;
}

export function LoveStoryPager({ currentSlug }: { currentSlug: string }) {
  const idx = CHAPTERS.findIndex((c) => c.slug === currentSlug);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx >= 0 && idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  useEffect(() => {
    if (idx < 0) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    const enterDir = sessionStorage.getItem(DIR_KEY);
    if (!enterDir) return;
    sessionStorage.removeItem(DIR_KEY);

    const enterClass =
      enterDir === 'next' ? 'page-enter-next' : 'page-enter-prev';
    document.body.classList.add(enterClass);
    let activeFrame: number | null = null;
    let cleanupTimer: number | null = null;

    activeFrame = requestAnimationFrame(() => {
      activeFrame = requestAnimationFrame(() => {
        document.body.classList.add('page-enter-active');
      });
    });

    cleanupTimer = window.setTimeout(() => {
      document.body.classList.remove(
        'page-enter-next',
        'page-enter-prev',
        'page-enter-active'
      );
    }, TRANSITION_MS + 60);

    return () => {
      if (activeFrame !== null) cancelAnimationFrame(activeFrame);
      if (cleanupTimer !== null) window.clearTimeout(cleanupTimer);
      document.body.classList.remove(
        'page-enter-next',
        'page-enter-prev',
        'page-enter-active'
      );
    };
  }, [idx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA' ||
          t.isContentEditable)
      ) {
        return;
      }
      if (document.querySelector('.love-modal-overlay.is-open')) return;
      if (e.key === 'ArrowRight' && next) {
        e.preventDefault();
        navigate(chapterHref(next.slug), 'next');
      } else if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault();
        navigate(chapterHref(prev.slug), 'prev');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (idx < 0) return null;

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    direction: 'next' | 'prev'
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    navigate(href, direction);
  };

  return (
    <nav className="story-pager" aria-label="Kapitelnavigation">
      {prev ? (
        <a
          className="story-pager-link story-pager-prev"
          href={chapterHref(prev.slug)}
          rel="prev"
          onClick={(e) => handleClick(e, chapterHref(prev.slug), 'prev')}
        >
          <span className="story-pager-arrow" aria-hidden="true">
            ←
          </span>
          <span className="story-pager-meta">
            <span className="story-pager-hint">Zurück</span>
            <span className="story-pager-label">{prev.label}</span>
          </span>
        </a>
      ) : (
        <span className="story-pager-placeholder" aria-hidden="true" />
      )}

      <span
        className="story-pager-progress"
        aria-label={`Seite ${idx + 1} von ${CHAPTERS.length}`}
      >
        {idx + 1} / {CHAPTERS.length}
      </span>

      {next ? (
        <a
          className="story-pager-link story-pager-next"
          href={chapterHref(next.slug)}
          rel="next"
          onClick={(e) => handleClick(e, chapterHref(next.slug), 'next')}
        >
          <span className="story-pager-meta">
            <span className="story-pager-hint">Weiter</span>
            <span className="story-pager-label">{next.label}</span>
          </span>
          <span className="story-pager-arrow" aria-hidden="true">
            →
          </span>
        </a>
      ) : (
        <span className="story-pager-placeholder" aria-hidden="true" />
      )}
    </nav>
  );
}

function navigate(href: string, direction: 'next' | 'prev') {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (reduceMotion) {
    window.location.href = href;
    return;
  }
  sessionStorage.setItem(DIR_KEY, direction);
  document.body.classList.add(
    direction === 'next' ? 'page-leave-next' : 'page-leave-prev'
  );
  window.setTimeout(() => {
    window.location.href = href;
  }, TRANSITION_MS);
}
