import { placeholders, type PlaceholderName } from '@/lib/editorial/placeholders';

export function MediaPlaceholder({ name, className = '', caption }: { name: PlaceholderName; className?: string; caption?: string }) {
  const media = placeholders[name];
  return (
    <figure className={`media-figure ${className}`}>
      <div className="media-placeholder" data-placeholder={name} role="img" aria-label={`Medienplatzhalter: ${media.file}`}>
        <span className="placeholder-label"><span className="desktop-filename">{media.file}</span><span className="mobile-filename">{media.mobile}</span></span>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
