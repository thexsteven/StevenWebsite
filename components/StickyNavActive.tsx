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

    // Mobile Pill-Rail: die aktive Pille horizontal mittig nachziehen,
    // ohne die Seite selbst zu scrollen.
    const rail = document.querySelector<HTMLElement>('.site-nav .nav-links');
    let lastActive: HTMLAnchorElement | null = null;

    const revealInRail = (link: HTMLAnchorElement) => {
      if (!rail || rail.scrollWidth <= rail.clientWidth + 4) return;
      const target =
        link.offsetLeft - rail.clientWidth / 2 + link.offsetWidth / 2;
      const max = rail.scrollWidth - rail.clientWidth;
      rail.scrollTo({
        left: Math.max(0, Math.min(target, max)),
        behavior: 'smooth',
      });
    };

    const setActive = () => {
      const scrollPos = window.scrollY + SCROLL_OFFSET;
      let current: HTMLElement = navTargets[0];
      navTargets.forEach((section) => {
        if (section.offsetTop <= scrollPos) current = section;
      });
      let activeLink: HTMLAnchorElement | null = null;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${current.id}`;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          activeLink = link;
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
      if (activeLink && activeLink !== lastActive) {
        lastActive = activeLink;
        revealInRail(activeLink);
      }
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
