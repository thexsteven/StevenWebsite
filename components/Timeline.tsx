'use client';

import { useEffect, useRef } from 'react';

export type TimelineItem = {
  meta: string;
  title: string;
  desc: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const entries = Array.from(el.querySelectorAll<HTMLElement>('.tl-item'));

    if (reduced) {
      entries.forEach((e) => e.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (obs) => {
        obs.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    entries.forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="tl" role="list">
      {items.map((item) => {
        const year = item.meta.match(/\d{4}/)?.[0] ?? '';
        return (
          <div
            key={item.title}
            className="tl-item"
            role="listitem"
          >
            <span className="tl-ghost" aria-hidden="true">
              {year}
            </span>
            <div className="tl-body">
              <span className="tl-meta">{item.meta}</span>
              <h3 className="tl-title">{item.title}</h3>
              <p className="tl-desc">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
