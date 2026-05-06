'use client';

import { useEffect } from 'react';

const SCROLL_OFFSET = 140;

export function StickyNavActive() {
  useEffect(() => {
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.site-nav a[href^="#"]'),
    );
    const navTargets = navLinks
      .map((link) => {
        const href = link.getAttribute('href');
        return href ? document.querySelector<HTMLElement>(href) : null;
      })
      .filter((el): el is HTMLElement => el !== null);

    if (!navLinks.length || !navTargets.length) return;

    const setActive = () => {
      const scrollPos = window.scrollY + SCROLL_OFFSET;
      let current: HTMLElement = navTargets[0];
      navTargets.forEach((section) => {
        if (section.offsetTop <= scrollPos) current = section;
      });
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${current.id}`;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    };

    setActive();
    window.addEventListener('scroll', setActive, { passive: true });
    window.addEventListener('resize', setActive);
    window.addEventListener('load', setActive);
    return () => {
      window.removeEventListener('scroll', setActive);
      window.removeEventListener('resize', setActive);
      window.removeEventListener('load', setActive);
    };
  }, []);

  return null;
}
