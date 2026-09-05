import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { chapters } from '@/lib/editorial/chapters';
import { StoryHeader, OpenQuestion, FallScene } from '@/components/editorial/Story';
import { MediaPlaceholder } from '@/components/editorial/MediaPlaceholder';

export const dynamicParams = false;
export function generateStaticParams() { return chapters.map((chapter) => ({ kapitel: chapter.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ kapitel: string }> }): Promise<Metadata> {
  const { kapitel } = await params;
  return { title: `${chapters.find((chapter) => chapter.slug === kapitel)?.title ?? 'Kapitel'} · Hawaii` };
}

export default async function Kapitel({ params }: { params: Promise<{ kapitel: string }> }) {
  const { kapitel } = await params;
  const index = chapters.findIndex((chapter) => chapter.slug === kapitel);
  const chapter = chapters[index];
  if (!chapter) notFound();
  const next = chapters[index + 1];
  return <>
    <StoryHeader title={chapter.title} meta="Hawaii · 2025" intro={chapter.intro} back="/reisen/hawaii" backLabel="Hawaii und alle Kapitel" />
    <div className="wrap" data-sc-act="flow"><MediaPlaceholder name={chapter.media} caption={`Vorgesehenes Motiv zum Kapitel „${chapter.title}“.`} /></div>
    <article className="prose"><h2>{chapter.heading}</h2>{chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<OpenQuestion>{chapter.question}</OpenQuestion></article>
    {kapitel === 'adventures' && <FallScene />}
    <nav className="story-next wrap" aria-label="Weiterlesen"><Link href="/reisen/hawaii">← Alle Hawaii-Kapitel</Link>{next ? <Link href={`/reisen/hawaii/${next.slug}`}>Weiter: {next.title} ↗</Link> : <Link href="/reisen/radtour-cannes">Weiter zur Radtour ↗</Link>}</nav>
  </>;
}
