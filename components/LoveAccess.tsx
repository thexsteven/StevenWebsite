'use client';

import { useEffect, useState } from 'react';
import { LoveModal } from '@/components/LoveModal';

const LOVE_SESSION_KEY = 'love_key';
const LOVE_SEQUENCE = ['l', 'o', 'v', 'e'] as const;
const LOGO_TAPS_TO_TRIGGER = 4;
const LOGO_TAP_RESET_MS = 600;

function unlockSection() {
  const section = document.getElementById('love-story');
  if (!section) return;
  section.classList.add('is-unlocked');
  section.removeAttribute('aria-hidden');
}

export function LoveAccess() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(LOVE_SESSION_KEY)) {
      unlockSection();
      if (window.location.hash === '#love-story') {
        const t = window.setTimeout(() => {
          document
            .getElementById('love-story')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => window.clearTimeout(t);
      }
    }
  }, []);

  useEffect(() => {
    const buffer: string[] = [];
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.repeat) return;
      const key = event.key.toLowerCase();
      if (key.length !== 1) return;

      buffer.push(key);
      if (buffer.length > LOVE_SEQUENCE.length) buffer.shift();

      if (LOVE_SEQUENCE.every((value, index) => value === buffer[index])) {
        buffer.length = 0;
        setOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const logo = document.querySelector<HTMLAnchorElement>(
      '.site-nav .logo',
    );
    if (!logo) return;

    let taps = 0;
    let timer: number | null = null;

    const onClick = (event: Event) => {
      taps += 1;
      if (timer !== null) window.clearTimeout(timer);
      if (taps >= LOGO_TAPS_TO_TRIGGER) {
        event.preventDefault();
        taps = 0;
        setOpen(true);
        return;
      }
      timer = window.setTimeout(() => {
        taps = 0;
      }, LOGO_TAP_RESET_MS);
    };

    logo.addEventListener('click', onClick);
    return () => {
      logo.removeEventListener('click', onClick);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  return (
    <LoveModal
      open={open}
      onClose={() => setOpen(false)}
      onUnlock={() => {
        setOpen(false);
        unlockSection();
        window.setTimeout(() => {
          document
            .getElementById('love-story')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }}
    />
  );
}
