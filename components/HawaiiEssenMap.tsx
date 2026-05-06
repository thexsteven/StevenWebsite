'use client';

import { useEffect, useRef } from 'react';
import { loadGoogleMaps } from '@/lib/google-maps';

export function HawaiiEssenMap({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;

        const foodtrucks = { lat: 21.2658, lng: -157.8191 };

        const map = new google.maps.Map(containerRef.current, {
          zoom: 15,
          center: foodtrucks,
          mapTypeId: 'roadmap',
        });

        new google.maps.Marker({
          position: foodtrucks,
          map,
          title: 'Food Trucks · Cartwright Road',
        });
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
