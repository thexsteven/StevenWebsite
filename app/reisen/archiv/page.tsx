import type { Metadata } from 'next';

import { Breadcrumb } from '@/components/Breadcrumb';
import { ArchiveFeed } from '@/components/travel/ArchiveFeed';
import styles from '@/components/travel/Archive.module.css';
import { ARCHIVE_PATH } from '@/lib/travelAuth';
import { getTravelEntries } from '@/lib/travelArchive.server';
import { requireArchiveSession } from '@/lib/travelSession';

import { logout } from './login/actions';

export const metadata: Metadata = {
  title: 'Reise-Archiv | Steven',
  description: 'Alle Reisen seit 2021 in einem durchgehenden Foto-Feed.',
  // Privat – nicht indexieren, auch wenn der Crawler nie durchkäme.
  robots: { index: false, follow: false },
};

export default async function ArchivPage() {
  // Die Middleware hat hier schon geprüft; das ist die zweite Linie.
  await requireArchiveSession(ARCHIVE_PATH);

  const entries = await getTravelEntries();
  const photoCount = entries.reduce(
    (total, entry) => total + entry.images.length,
    0,
  );
  const oldestYear = entries.at(-1)?.startDate.slice(0, 4) ?? '2021';

  return (
    <div className={styles.wall}>
      <header className={styles.intro}>
        <Breadcrumb href="/reisen" label="← Zurück zu den Reisen" />
        <p className={styles.kicker}>Privates Archiv</p>
        <h1 className={styles.introTitle}>Alle Reisen seit {oldestYear}</h1>
        <p className={styles.introText}>
          {entries.length === 0
            ? 'Noch keine Reisen hinterlegt.'
            : `${entries.length} ${entries.length === 1 ? 'Reise' : 'Reisen'}, ${photoCount} ${photoCount === 1 ? 'Bild' : 'Bilder'} – neueste zuerst. Einfach durchscrollen.`}
        </p>
        <div className={styles.introActions}>
          <form action={logout}>
            <button type="submit" className={styles.ghostButton}>
              Abmelden
            </button>
          </form>
        </div>
      </header>

      <ArchiveFeed entries={entries} />
    </div>
  );
}
