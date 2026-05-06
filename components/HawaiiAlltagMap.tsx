'use client';

import dynamic from 'next/dynamic';

const HawaiiAlltagMapView = dynamic(
  () => import('./HawaiiAlltagMapView').then((m) => m.HawaiiAlltagMapView),
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

export function HawaiiAlltagMap({ className }: { className?: string }) {
  return <HawaiiAlltagMapView className={className} />;
}
