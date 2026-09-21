'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { AlbumMapStop } from '@/lib/travelAlbum';
import styles from './TravelAlbum.module.css';

const MapView = dynamic(() => import('./AlbumMapView').then((module) => module.AlbumMapView), {
  ssr: false,
  loading: () => <p className={styles.mapLoading}>Karte wird geladen …</p>,
});

export function AlbumMap({ stops, title }: { stops: AlbumMapStop[]; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details className={styles.mapCard} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>Unterwegs verortet <span>{stops.length} Fotostopps auf der Karte entdecken</span></summary>
      {open && <>
        <p className={styles.mapNote}>Hier sind diese Fotos entstanden. Die Punkte stammen aus den Standortdaten der Aufnahmen und zeigen ausgewählte Stopps, keinen aufgezeichneten Routenverlauf.</p>
        <MapView stops={stops} title={title} />
      </>}
    </details>
  );
}
