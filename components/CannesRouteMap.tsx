'use client';

import dynamic from 'next/dynamic';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

const CannesRouteMapView = dynamic(
  () => import('./CannesRouteMapView').then((m) => m.CannesRouteMapView),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: 420,
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

export function CannesRouteMap(props: Props) {
  return <CannesRouteMapView {...props} />;
}
