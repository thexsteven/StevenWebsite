import Link from 'next/link';
import { studyModules } from '@/lib/study';

const phases = [
  { slug: 'semester-1', title: 'Theorie-Semester 1', label: 'Grundlagen', summary: 'Von Python und dem eigenen Dungeon-Spiel bis zu linearer Algebra, Web Engineering und Elektrotechnik.' },
  { slug: 'praxis-1', title: 'Praxissemester', label: 'Anwenden', summary: 'Daten verstehen, Annahmen überprüfen und Auswertungen nachvollziehbar dokumentieren.' },
  { slug: 'semester-2', title: 'Theorie-Semester 2', label: 'Vertiefen', summary: 'Algorithmen, Webprojekte und digitale Systeme – mit Einblicken in meine Lernnotizen.' },
];

export function StudyPreview() {
  return (
    <div className="study-preview">
      {phases.map((phase) => (
        <article className="study-preview-card" key={phase.slug}>
          <p className="section-kicker">{phase.label}</p>
          <h3><Link href={`/karriere/${phase.slug}`}>{phase.title}</Link></h3>
          <p>{phase.summary}</p>
          <ul>{studyModules[phase.slug].slice(0, 3).map((module) => <li key={module.title}>{module.title}</li>)}</ul>
          <Link className="text-link" href={`/karriere/${phase.slug}`}>
            {phase.slug === 'praxis-1' ? 'Praxis-Einblicke' : 'Module entdecken'}
          </Link>
        </article>
      ))}
    </div>
  );
}
