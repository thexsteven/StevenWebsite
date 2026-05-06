'use client';

import { useEffect, useRef } from 'react';

export type TimelineItem = {
  meta: string;
  title: string;
  desc: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const itemEls = Array.from(
      timeline.querySelectorAll<HTMLLIElement>('.timeline-item'),
    );
    if (!itemEls.length) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduced) {
      itemEls.forEach((el) => el.classList.add('is-visible'));
      timeline.classList.add('is-active');
      return;
    }

    const updateLine = () => {
      let totalHeight = 0;
      let filledHeight = 0;
      let filledCount = 0;
      const gap = parseInt(getComputedStyle(timeline).gap, 10) || 0;
      const timelineRect = timeline.getBoundingClientRect();

      itemEls.forEach((item, idx) => {
        const rect = item.getBoundingClientRect();
        totalHeight += rect.height + gap;
        if (item.classList.contains('is-visible')) {
          filledCount = idx + 1;
          const itemMid = rect.top + rect.height / 2 - timelineRect.top;
          if (rect.top < window.innerHeight / 2) {
            filledHeight = Math.max(0, itemMid);
          } else {
            filledHeight = totalHeight;
          }
        }
      });

      const pct = totalHeight > 0 ? (filledHeight / totalHeight) * 100 : 0;
      timeline.style.setProperty('--filled', `${Math.min(100, pct)}%`);
      if (filledCount > 0) timeline.classList.add('is-active');
    };

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            updateLine();
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px' },
    );

    itemEls.forEach((el) => itemObserver.observe(el));

    window.addEventListener('scroll', updateLine, { passive: true });
    window.addEventListener('resize', updateLine);
    updateLine();

    return () => {
      itemObserver.disconnect();
      window.removeEventListener('scroll', updateLine);
      window.removeEventListener('resize', updateLine);
    };
  }, []);

  return (
    <ol ref={timelineRef} className="timeline">
      {items.map((item) => (
        <li key={item.title} className="timeline-item">
          <div className="timeline-dot" aria-hidden="true" />
          <div className="timeline-content">
            <span className="timeline-meta">{item.meta}</span>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-desc">{item.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
