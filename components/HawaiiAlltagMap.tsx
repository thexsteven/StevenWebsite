'use client';

import { useEffect, useRef } from 'react';
import { loadGoogleMaps } from '@/lib/google-maps';

export function HawaiiAlltagMap({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        const hotel = { lat: 21.279, lng: -157.8295 };
        const ef = { lat: 21.2912, lng: -157.843 };
        const center = { lat: 21.2855, lng: -157.837 };

        const map = new google.maps.Map(containerRef.current, {
          zoom: 14,
          center,
          mapTypeId: 'roadmap',
        });

        new google.maps.Marker({
          position: hotel,
          map,
          title: 'Waikiki Malia Hotel · 2211 Kuhio Ave',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#c8102e',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        new google.maps.Marker({
          position: ef,
          map,
          title: 'EF Education First · Kapiolani Blvd',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#0f2f5f',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        const route = [
          { lat: 21.279, lng: -157.8295 },
          { lat: 21.283, lng: -157.831 },
          { lat: 21.2855, lng: -157.833 },
          { lat: 21.2875, lng: -157.836 },
          { lat: 21.2895, lng: -157.84 },
          { lat: 21.2912, lng: -157.843 },
        ];

        new google.maps.Polyline({
          path: route,
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
