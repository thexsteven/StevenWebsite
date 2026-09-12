'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { AlbumMapStop } from '@/lib/travelAlbum';
import styles from './TravelAlbum.module.css';

export function AlbumMapView({ stops, title }: { stops: AlbumMapStop[]; title: string }) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (!container.current) return;
    const map = L.map(container.current, { scrollWheelZoom: false });
    mapRef.current = map;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);
    markers.current = stops.map((stop, index) => {
      const popup = document.createElement('a');
      popup.href = `#${stop.photoId}`;
      popup.textContent = `${stop.label} · Zum Foto →`;
      const marker = L.marker([stop.lat, stop.lon], {
        title: stop.label,
        alt: `${index + 1}. ${stop.label}`,
        icon: L.divIcon({ className: styles.mapPin, html: String(index + 1), iconSize: [30, 30], iconAnchor: [15, 15] }),
      }).addTo(map).bindPopup(popup);
      marker.getElement()?.setAttribute('aria-label', String(index + 1) + '. ' + stop.label);
      marker.on('click', () => setSelected(index));
      return marker;
    });
    map.fitBounds(L.latLngBounds(stops.map((stop) => [stop.lat, stop.lon])), { padding: [36, 36], maxZoom: 12 });
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container.current);
    return () => { observer.disconnect(); map.remove(); mapRef.current = null; markers.current = []; };
  }, [stops]);

  function select(index: number) {
    setSelected(index);
    mapRef.current?.setView([stops[index].lat, stops[index].lon], 12);
    markers.current[index]?.openPopup();
  }

  return <div className={styles.mapLayout}>
    <div ref={container} className={styles.mapCanvas} role="region" aria-label={`Fotostopps: ${title}`} />
    <ol className={styles.mapStops}>
      {stops.map((stop, index) => <li key={stop.photoId}>
        <button type="button" aria-pressed={selected === index} onClick={() => select(index)}><span>{index + 1}</span>{stop.label}</button>
        <a href={`#${stop.photoId}`}>Zum Foto →</a>
      </li>)}
    </ol>
  </div>;
}
