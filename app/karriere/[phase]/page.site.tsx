import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { phases } from '@/lib/editorial/chapters';
import { StoryHeader, OpenQuestion } from '@/components/editorial/Story';

export const dynamicParams = false;
export function generateStaticParams() { return phases.map((phase) => ({ phase: phase.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ phase: string }> }): Promise<Metadata> {
  const { phase } = await params;
  return { title: phases.find((entry) => entry.slug === phase)?.title ?? 'Studienphase' };
}

export default async function Phase({ params }: { params: Promise<{ phase: string }> }) {
  const { phase } = await params;
  const entry = phases.find((item) => item.slug === phase);
  if (!entry) notFound();
  return <><StoryHeader title={entry.title} intro={entry.intro} back="/karriere" backLabel="Alle Studienphasen" /><article className="prose" data-sc-act="flow"><h2>{entry.kind === 'Theorie' ? 'Lernen an der Hochschule.' : 'Lernen im Arbeitsalltag.'}</h2><p>{entry.kind === 'Theorie' ? 'Die Theoriephasen meines dualen Studiums finden an der DHBW Mosbach statt. Sie wechseln sich mit den Praxisphasen ab.' : 'Die Praxisphasen gehören zu meinem dualen Studium an der DHBW Mosbach. Mein Praxispartner ist ein international tätiges Technologieunternehmen in der Automatisierungstechnik.'}</p><p>Ein Rückblick soll zeigen, was ich verstanden habe, welche Fragen geblieben sind und was ich mitnehme. Für diesen Text fehlen noch meine konkreten Erinnerungen.</p><OpenQuestion>{entry.question}</OpenQuestion><Link className="text-link" href="/karriere">Alle Studienphasen ↗</Link></article></>;
}
