'use client';

import dynamic from 'next/dynamic';

const HawaiiFlightMapView = dynamic(
  () => import('./HawaiiFlightMapView').then((m) => m.HawaiiFlightMapView),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-muted)',
          fontSize: '0.9rem',
        }}
      >
        Karte wird geladen…
      </div>
    ),
  }
);

export function HawaiiFlightMap({ className }: { className?: string }) {
  return <HawaiiFlightMapView className={className} />;
}
