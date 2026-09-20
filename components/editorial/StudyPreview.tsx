import Link from 'next/link';
import { phases } from '@/lib/editorial/chapters';
import { studyModules } from '@/lib/editorial/study';

export function StudyPreview() {
  return <div className="study-preview">{phases.map((phase) => <article className="study-card" key={phase.slug}>
    <p className="meta">{phase.kind} · Duales Studium</p>
    <h3><Link href={`/karriere/${phase.slug}`}>{phase.title}</Link></h3>
    <p>{phase.intro}</p>
    <ul>{studyModules[phase.slug].slice(0,3).map((module) => <li key={module.title}>{module.title}</li>)}</ul>
    <Link className="text-link" href={`/karriere/${phase.slug}`}>{phase.kind === 'Theorie' ? 'Module entdecken' : 'Einblick in die Praxis'} <span aria-hidden="true">↗</span></Link>
  </article>)}</div>;
}
