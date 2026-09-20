import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { phases } from '@/lib/editorial/chapters';
import { StoryHeader } from '@/components/editorial/Story';
import { learningHub, studyModules } from '@/lib/editorial/study';

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
  const modules = studyModules[phase];
  return <><StoryHeader title={entry.title} intro={entry.intro} meta="DHBW Mosbach · Duales Studium" back="/karriere" backLabel="Alle Studienphasen" /><section className="wrap study-modules" aria-labelledby="modules-title" data-sc-act="flow">
    <h2 id="modules-title">{entry.kind === 'Theorie' ? 'Meine Module im Überblick.' : 'Was ich aus der Praxis mitnehme.'}</h2>
    <p className="study-intro">{entry.kind === 'Theorie' ? 'Ein Einblick in die Themen, Übungen und Projekte aus meinem Lern-Hub. Die Tiefe der Notizen unterscheidet sich je Modul; ausgewählte gefilterte Ansichten sind direkt verlinkt.' : 'Einblicke in meine Arbeitsweise beim Praxispartner, einem international tätigen Technologieunternehmen in der Automatisierungstechnik. Unternehmensdaten und interne Projektdetails bleiben vertraulich.'}</p>
    <nav className="study-index" aria-label={entry.kind === 'Theorie' ? 'Module' : 'Praxisthemen'}>{modules.map((module, index) => <a href={`#thema-${index + 1}`} key={module.title}>{module.title}</a>)}</nav>
    <div className="study-module-grid">{modules.map((module, index) => <article className="study-module" id={`thema-${index + 1}`} key={module.title}><h3>{module.title}</h3><p>{module.summary}</p><ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>{module.view && <a className="text-link" href={`${learningHub}?v=${module.view}`} target="_blank" rel="noopener noreferrer" aria-label={`${module.title}: Lernnotizen in Notion öffnen (neuer Tab)`}>Lernnotizen in Notion <span aria-hidden="true">↗</span></a>}{!module.view && entry.kind === 'Theorie' && <p className="study-link-pending">Notion-Link wird bald hinzugefügt.</p>}</article>)}</div>
    <Link className="text-link" href="/karriere">Alle Studienphasen ↗</Link>
  </section></>;
}
