'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const FOODTRUCKS: [number, number] = [21.2658, -157.8191];

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

export function HawaiiEssenMapView({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current).setView(FOODTRUCKS, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.marker(FOODTRUCKS, {
      icon: chip('🌮 Food Trucks · Cartwright Rd', true),
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
