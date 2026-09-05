'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MediaPlaceholder } from './MediaPlaceholder';
import type { PlaceholderName } from '@/lib/editorial/placeholders';

const journeys: { label: string; title: string; description: string; media: PlaceholderName; href: string }[] = [
  { label: 'Hawaii', title: 'Ein anderer Alltag.', description: 'Sprachreise auf Oahu und unterwegs auf Big Island. Hawaii 2025.', media: 'hawaii', href: '/reisen/hawaii' },
  { label: 'Radtour', title: 'Über die Alpen.', description: 'Mit dem Fahrrad bis nach Südfrankreich. Sommer 2025.', media: 'cycling', href: '/reisen/radtour-cannes' },
  { label: 'Anreise nach Venedig', title: 'Die Berge bei Nacht.', description: 'Zu viert im Van auf dem Weg nach Venedig. 2026.', media: 'night', href: '/reisen' },
];

export function TravelWindow() {
  const [selected, setSelected] = useState(0);
  const journey = journeys[selected];
  return <div className="travel-window">
    <aside className="window-person"><MediaPlaceholder name="portrait" /><div><p>Steven Braun</p><span>Bad Mergentheim</span><Link href="/ueber-mich">Über mich ↗</Link></div></aside>
    <div className="window-journey">
      <div className="journey-options" role="group" aria-label="Reiseauswahl">{journeys.map((item, index) => <button key={item.label} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.label}</button>)}</div>
      <div className="window-media"><MediaPlaceholder name={journey.media} /></div>
      <div className="window-caption" aria-live="polite"><div><h2>{journey.title}</h2><p>{journey.description}</p></div><Link href={journey.href} aria-label={`${journey.label} entdecken`}>Entdecken ↗</Link></div>
    </div>
  </div>;
}
