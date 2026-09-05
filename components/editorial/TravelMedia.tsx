'use client';

import { useSyncExternalStore } from 'react';
import { media, mediaAsset, imageUrl, type AssetId, type MediaName } from '@/lib/editorial/media';

function subscribe(callback: () => void) {
  const query = matchMedia('(max-width: 700px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const isMobile = () => matchMedia('(max-width: 700px)').matches;
const serverMobile = () => false;
const sources = (id: AssetId) => [480, 640, 960, 1280, 1920].map(width => `${imageUrl(id, width)} ${width}w`).join(', ');

export function TravelMedia({ name, className = '', caption = true, priority = false, sizes = '(max-width: 700px) 100vw, (max-width: 1100px) 75vw, 960px' }: { name: MediaName; className?: string; caption?: boolean; priority?: boolean; sizes?: string }) {
  const mobile = useSyncExternalStore(subscribe, isMobile, serverMobile);
  const selection = media[name];
  const mobileId = 'mobile' in selection ? selection.mobile : selection.desktop;
  const asset = mediaAsset(mobile ? mobileId : selection.desktop);
  return <figure className={`media-figure ${className}`} data-media={name}>
    <picture className="media-image">
      <source media="(max-width: 700px)" srcSet={sources(mobileId)} sizes={sizes} />
      {/* Cloudinary supplies format, compression and responsive widths directly. */}
      <img src={imageUrl(selection.desktop, 960)} srcSet={sources(selection.desktop)} sizes={sizes} alt={asset.alt} width={asset.width} height={asset.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
    </picture>
    {caption && <figcaption>{asset.caption}</figcaption>}
  </figure>;
}
