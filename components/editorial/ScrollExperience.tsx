'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { mountScrollcraft } from '@/lib/editorial/scrollcraft';

export function ScrollExperience() {
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    let dispose: (() => void) | undefined;
    const start = async () => {
      const response = await fetch('/scrollcraft.js', { signal: controller.signal });
      if (!response.ok) throw new Error('Scrollcraft konnte nicht geladen werden.');
      const source = await response.text();
      await document.fonts.ready;
      if (controller.signal.aborted) return;
      const main = document.getElementById('main');
      if (main) {
        const peak = main.querySelector<HTMLElement>('[data-sc-fall]');
        if (peak && matchMedia('(max-width: 700px)').matches) peak.dataset.scSpan = '2.3';
        dispose = mountScrollcraft(source, main);
      }
    };
    start().catch((error) => { if (!controller.signal.aborted) console.error(error); });
    return () => { controller.abort(); dispose?.(); };
  }, [pathname]);
  return null;
}
