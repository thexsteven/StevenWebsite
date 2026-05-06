'use client';

import { useEffect, useState } from 'react';

const SECRET = ['h', 'i'] as const;

export function HeroBadge() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const buffer: string[] = [];
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const key = event.key.toLowerCase();
      if (key.length !== 1) return;
      buffer.push(key);
      if (buffer.length > SECRET.length) buffer.shift();
      if (SECRET.every((value, index) => value === buffer[index])) {
        setRevealed(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className={`hero-badge ${revealed ? 'is-visible' : 'is-hidden'}`}
      role="status"
      aria-live="polite"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://res.cloudinary.com/dozdjb4fi/image/upload/v1774237627/images/Mr_Bean_GIF.gif"
        alt="Easter Egg: Winken"
        className="hero-badge-gif"
      />
      <span>Secret unlocked · HI</span>
    </div>
  );
}
