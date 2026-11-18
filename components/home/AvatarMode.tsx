'use client';

import Image from 'next/image';
import { useState } from 'react';

import { learnModeOutfit, type AvatarOutfit } from '@/lib/avatar';

import styles from './AvatarMode.module.css';

export function AvatarMode({ outfit }: { outfit: AvatarOutfit }) {
  const [isLearnMode, setIsLearnMode] = useState(false);

  return (
    <div className={styles.portrait}>
      <Image
        className={styles.image}
        src={outfit.image}
        alt={outfit.alt}
        aria-hidden={isLearnMode}
        width={1024}
        height={1536}
        priority
        sizes="(max-width: 767px) 100vw, (max-width: 1320px) 40vw, 528px"
      />
      <Image
        className={styles.image}
        src={learnModeOutfit.image}
        alt={learnModeOutfit.alt}
        aria-hidden={!isLearnMode}
        width={1024}
        height={1536}
        loading="eager"
        fetchPriority="low"
        sizes="(max-width: 767px) 100vw, (max-width: 1320px) 40vw, 528px"
      />
      <button
        type="button"
        className={styles.control}
        aria-pressed={isLearnMode}
        onClick={() => setIsLearnMode((currentMode) => !currentMode)}
      >
        <span className={styles.label}>
          Learn Mode
          <span className={styles.track} aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}
