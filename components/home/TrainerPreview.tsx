'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import styles from './FeaturedProjects.module.css';

export function TrainerPreview({ src }: { src: string }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    let active = true;
    let effect: { destroy?: () => void } | undefined;
    const loader = '/assets/moments/moments.js';
    import(/* webpackIgnore: true */ loader).then(async ({ mount }) => {
      if (!active) return;
      effect = await mount(el);
      if (!active) effect?.destroy?.();
    }).catch(() => { /* Der Screenshot ist schon im HTML sichtbar. */ });
    return () => {
      active = false;
      effect?.destroy?.();
    };
  }, []);

  return (
    <div className={styles.preview}>
      <div ref={frame} className={styles.art} data-moment="picture-develops" data-moment-opts='{"look":"film"}'>
        <Image
          src={src}
          width={1280}
          height={720}
          sizes="(max-width: 600px) 145vw, (max-width: 1320px) 100vw, 1248px"
          alt="Im Dijkstra-Trainer leuchtet der Weg vom Startknoten s zu a. Die Kante hat das Gewicht 2."
        />
      </div>
    </div>
  );
}
