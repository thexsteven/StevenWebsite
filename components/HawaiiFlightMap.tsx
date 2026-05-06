'use client';

import { useEffect, useRef } from 'react';
import { loadGoogleMaps } from '@/lib/google-maps';

export function HawaiiFlightMap({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        const map = new google.maps.Map(containerRef.current, {
          zoom: 3,
          center: { lat: 42, lng: -100 },
          mapTypeId: 'terrain',
        });

        const fra = { lat: 50.0379, lng: 8.5622 };
        const ord = { lat: 41.9742, lng: -87.9073 };
        const hnl = { lat: 21.3187, lng: -157.9225 };
        const hotel = { lat: 21.279, lng: -157.8295 };

        [
          { pos: fra, label: 'FRA · Frankfurt' },
          { pos: ord, label: "ORD · Chicago O'Hare" },
          { pos: hnl, label: 'HNL · Honolulu Airport' },
        ].forEach(({ pos, label }) => {
          new google.maps.Marker({ position: pos, map, title: label });
        });

        new google.maps.Marker({
          position: hotel,
          map,
          title: 'Hotel Waikiki Malia · 2211 Kuhio Ave',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#c8102e',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        new google.maps.Polyline({
          path: [fra, ord, hnl],
          geodesic: true,
          strokeColor: '#0f2f5f',
          strokeOpacity: 0.85,
          strokeWeight: 2.5,
        }).setMap(map);

        new google.maps.Polyline({
          path: [hnl, hotel],
          geodesic: false,
          strokeColor: '#0f2f5f',
          strokeOpacity: 0,
          strokeWeight: 0,
          icons: [
            {
              icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 0.9,
                strokeColor: '#c8102e',
                scale: 3,
              },
              offset: '0',
              repeat: '10px',
            },
          ],
        }).setMap(map);
      })
      .catch((err) => {
        console.error('Google Maps konnte nicht geladen werden:', err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
