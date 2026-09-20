import Image from 'next/image';
import Link from 'next/link';
import { techOutfit, type AvatarOutfit } from '@/lib/editorial/avatar';

export function AvatarHero({ outfit = techOutfit }: { outfit?: AvatarOutfit }) {
  return <section className="avatar-hero" data-outfit={outfit.id} aria-labelledby="avatar-title">
    <div className="avatar-copy">
      <p className="identity-line"><span /> Steven Braun · Reisen und Gedanken</p>
      <h1 id="avatar-title">Unterwegs sein.<br /><span>Neugierig bleiben.</span></h1>
      <p>Dualer Student. Ich baue Software und KI-Systeme.<br />Und entdecke gern, was hinter dem Alltag liegt.</p>
      <div className="avatar-links"><Link className="solid-link" href="/reisen">Reisen entdecken <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/ueber-mich">Mehr über mich ↗</Link></div>
    </div>
    <div className="avatar-studio">
      <div className="avatar-portrait">
        <Image src={outfit.image} alt={outfit.alt} width={1024} height={1536} priority unoptimized />
      </div>
      <p className="avatar-caption">Cyborg Steven</p>
    </div>
  </section>;
}
