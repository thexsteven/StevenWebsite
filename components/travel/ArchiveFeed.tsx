'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

import type { TravelEntry } from '@/lib/travelArchive';
import { formatDateRange } from '@/lib/travelArchive';

import styles from './Archive.module.css';

/**
 * Der durchgehende Foto-Feed der Reise-Galerie.
 *
 * Eine Sektion pro Reise, neueste zuerst. Die Rahmen blenden beim Scrollen
 * ein – „schwebend", wie an einer Museumswand aufgehängt.
 */
export function ArchiveFeed({ entries }: { entries: TravelEntry[] }) {
  const reduced = useReducedMotion();

  if (entries.length === 0) {
    return (
      <p className={styles.empty}>
        Hier steht noch nichts. Sobald die erste Reise in{' '}
        <code>content/reisen/</code> liegt, erscheint sie an dieser Wand.
      </p>
    );
  }

  return (
    <div className={styles.trips}>
      {entries.map((entry) => (
        <section key={entry.id} className={styles.trip} aria-label={entry.title}>
          <header className={styles.tripHeader}>
            <p className={styles.tripMeta}>
              {entry.country !== '' && (
                <span className={styles.tripCountry}>{entry.country}</span>
              )}
              <span>{formatDateRange(entry.startDate, entry.endDate)}</span>
            </p>
            <h2 className={styles.tripTitle}>{entry.title}</h2>
            {entry.description !== '' && (
              <p className={styles.tripText}>{entry.description}</p>
            )}
          </header>

          <div className={styles.frames}>
            {entry.images.map((image, index) => (
              <motion.figure
                key={`${entry.id}-${image.src}-${index}`}
                className={styles.frame}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  // Gestaffelt, damit die Kacheln nacheinander eintrudeln
                  // statt als Block aufzuploppen.
                  delay: Math.min(index, 3) * 0.07,
                }}
              >
                <div className={styles.framePlate}>
                  <div className={styles.frameImage}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1000px) 33vw, (min-width: 640px) 50vw, 100vw"
                      // Nur das erste Motiv der ersten Reise ist beim Laden
                      // sichtbar; alles andere wird lazy nachgeladen.
                      priority={index === 0 && entry.id === entries[0].id}
                    />
                  </div>
                  {image.alt !== entry.title && (
                    <figcaption className={styles.frameCaption}>
                      {image.alt}
                    </figcaption>
                  )}
                </div>
              </motion.figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
