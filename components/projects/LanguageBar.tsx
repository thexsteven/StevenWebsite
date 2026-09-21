'use client';

import { motion, useReducedMotion } from 'framer-motion';

import type { LanguageSlice } from '@/lib/github';

/**
 * Navy-Rampe für die Balkensegmente. Bewusst nur ein Farbton in
 * abgestufter Deckkraft – so kommen keine neuen Farben ins System.
 */
const RAMP = [
  'rgba(15, 47, 95, 0.95)',
  'rgba(15, 47, 95, 0.74)',
  'rgba(15, 47, 95, 0.55)',
  'rgba(15, 47, 95, 0.38)',
  'rgba(15, 47, 95, 0.24)',
  'rgba(15, 47, 95, 0.14)',
] as const;

const PERCENT_FORMATTER = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 1,
});

type Segment = {
  name: string;
  share: number;
  color: string;
};

/**
 * Fasst alles jenseits von `maxSegments` zu „Andere" zusammen, damit der
 * Balken lesbar bleibt. Die Summe bleibt dabei 100 %.
 */
function toSegments(
  languages: readonly LanguageSlice[],
  maxSegments: number,
): Segment[] {
  const visible = languages.slice(0, maxSegments);
  const rest = languages.slice(maxSegments);

  const segments: Segment[] = visible.map((language, index) => ({
    name: language.name,
    share: language.share,
    color: RAMP[Math.min(index, RAMP.length - 1)],
  }));

  if (rest.length > 0) {
    segments.push({
      name: 'Andere',
      share: rest.reduce((sum, language) => sum + language.share, 0),
      color: RAMP[RAMP.length - 1],
    });
  }

  return segments;
}

type LanguageBarProps = {
  languages: readonly LanguageSlice[];
  /** Anzahl einzeln ausgewiesener Sprachen, der Rest wird gebündelt. */
  maxSegments?: number;
};

/**
 * Gestapelter Sprach-Balken aus den GitHub-Languages inklusive Legende.
 *
 * Der Balken selbst ist rein dekorativ (`aria-hidden`) – die Legende
 * darunter trägt dieselbe Information als Text und ist damit die
 * zugängliche Fassung.
 */
export function LanguageBar({ languages, maxSegments = 4 }: LanguageBarProps) {
  const prefersReducedMotion = useReducedMotion();

  if (languages.length === 0) return null;

  const segments = toSegments(languages, maxSegments);

  return (
    <div className="flex flex-col gap-2">
      <div
        aria-hidden="true"
        className="flex h-1.5 w-full overflow-hidden rounded-full bg-line"
      >
        {segments.map((segment, index) => (
          <motion.span
            key={segment.name}
            className="block h-full"
            style={{ backgroundColor: segment.color }}
            initial={
              prefersReducedMotion
                ? { width: `${segment.share}%` }
                : { width: '0%' }
            }
            whileInView={{ width: `${segment.share}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 0.7,
                    delay: 0.12 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          />
        ))}
      </div>

      <ul
        aria-label="Sprachverteilung im Repository"
        className="m-0 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-xs text-muted"
      >
        {segments.map((segment) => (
          <li key={segment.name} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span>
              {segment.name} {PERCENT_FORMATTER.format(segment.share)} %
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
