'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const HOTEL: [number, number] = [21.279, -157.8295];
const EF: [number, number] = [21.2912, -157.843];
const ROUTE: [number, number][] = [
  [21.279, -157.8295],
  [21.283, -157.831],
  [21.2855, -157.833],
  [21.2875, -157.836],
  [21.2895, -157.84],
  [21.2912, -157.843],
];

function chip(label: string, primary = false) {
  const bg = primary ? '#c8102e' : '#ffffff';
  const fg = primary ? '#ffffff' : '#0f2f5f';
  const border = primary ? '#c8102e' : '#0f2f5f';
  return L.divIcon({
    className: '',
    html: `<div style="background:${bg};color:${fg};border:2px solid ${border};border-radius:999px;padding:4px 8px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.25);font-family:-apple-system,sans-serif;">${label}</div>`,
    iconAnchor: [0, 10],
  });
}

export function HawaiiAlltagMapView({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current).setView([21.2855, -157.837], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.polyline(ROUTE, {
      color: '#c8102e',
      weight: 3,
      opacity: 0.9,
      dashArray: '6,6',
      lineJoin: 'round',
    }).addTo(map);

    L.marker(HOTEL, { icon: chip('🏨 Waikiki Malia', true) }).addTo(map);
    L.marker(EF, { icon: chip('🎓 EF Education First') }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
