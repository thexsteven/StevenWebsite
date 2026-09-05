import { imageUrl, mediaAsset } from '@/lib/editorial/media';

export function FlightScene() {
  const asset = mediaAsset('flug-selfie');
  return <section className="flight-scene dark" data-sc-act="scrub" data-sc-span="2.2" data-sc-dwell="0.25">
    <div data-sc-stage>
      <div className="flight-copy"><h2>Auf dem Weg<br /> nach Hawaii.</h2><p>{asset.caption}</p></div>
      {/* The poster remains visible until the engine has painted a video frame. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sc-stage__poster" src={imageUrl('flug-selfie', 960)} alt={asset.alt} width={asset.width} height={asset.height} />
      <video data-sc-scrub data-sc-src="/scrub/hawaii-flug.mp4" data-sc-src-mobile="/scrub/hawaii-flug-mobile.mp4" poster={imageUrl('flug-selfie', 960)} preload="none" playsInline muted aria-label={asset.alt} />
    </div>
  </section>;
}
