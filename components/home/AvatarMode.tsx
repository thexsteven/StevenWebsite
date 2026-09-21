'use client';

import Image from 'next/image';
import { useState } from 'react';

import { learnModeOutfit, type AvatarOutfit } from '@/lib/avatar';

export function AvatarMode({ outfit }: { outfit: AvatarOutfit }) {
  const [isLearnMode, setIsLearnMode] = useState(false);

  return (
    <button
      type="button"
      className={`home-avatar${isLearnMode ? ' home-avatar--powered' : ''}`}
      aria-pressed={isLearnMode}
      aria-label={isLearnMode ? 'Normal mode aktivieren' : 'Learn mode aktivieren'}
      onClick={() => setIsLearnMode((currentMode) => !currentMode)}
    >
      <span className="home-avatar-stage" aria-hidden="true">
        <Image
          className="home-avatar-image home-avatar-image--normal"
          src={outfit.image}
          alt=""
          width={1024}
          height={1536}
          priority
          unoptimized
        />
        <Image
          className="home-avatar-image home-avatar-image--powered"
          src={learnModeOutfit.image}
          alt=""
          width={1024}
          height={1536}
          priority
          unoptimized
        />
      </span>
      <span className="home-avatar-label">
        {isLearnMode ? 'Normal mode' : 'Learn mode'}
      </span>
    </button>
  );
}
