'use client';

import dynamic from 'next/dynamic';

const HawaiiEssenMapView = dynamic(
  () => import('./HawaiiEssenMapView').then((m) => m.HawaiiEssenMapView),
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

export function HawaiiEssenMap({ className }: { className?: string }) {
  return <HawaiiEssenMapView className={className} />;
}
