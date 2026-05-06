'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const FRA: [number, number] = [50.0379, 8.5622];
const ORD: [number, number] = [41.9742, -87.9073];
const HNL: [number, number] = [21.3187, -157.9225];
const HOTEL: [number, number] = [21.279, -157.8295];

function greatCircle(
  start: [number, number],
  end: [number, number],
  steps = 64
): [number, number][] {
  const lat1 = (start[0] * Math.PI) / 180;
  const lon1 = (start[1] * Math.PI) / 180;
  const lat2 = (end[0] * Math.PI) / 180;
  const lon2 = (end[1] * Math.PI) / 180;

  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
      )
    );
  if (d === 0) return [start, end];

  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * (180 / Math.PI);
    const lon = Math.atan2(y, x) * (180 / Math.PI);
    points.push([lat, lon]);
  }
  return points;
}

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

export function HawaiiFlightMapView({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, { worldCopyJump: true }).setView(
      [40, -80],
      2
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    L.polyline([...greatCircle(FRA, ORD), ...greatCircle(ORD, HNL).slice(1)], {
      color: '#0f2f5f',
      weight: 3,
      opacity: 0.85,
      lineJoin: 'round',
    }).addTo(map);

    L.polyline([HNL, HOTEL], {
      color: '#c8102e',
      weight: 2,
      opacity: 0.9,
      dashArray: '6,6',
    }).addTo(map);

    L.marker(FRA, { icon: chip('✈ FRA · Frankfurt') }).addTo(map);
    L.marker(ORD, { icon: chip("✈ ORD · Chicago O'Hare") }).addTo(map);
    L.marker(HNL, { icon: chip('✈ HNL · Honolulu') }).addTo(map);
    L.marker(HOTEL, { icon: chip('🏨 Waikiki Malia', true) }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
