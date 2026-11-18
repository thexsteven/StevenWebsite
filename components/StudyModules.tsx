import Link from 'next/link';
import { learningHub, studyModules } from '@/lib/study';

const anchors: Record<string, string[]> = {
  'semester-1': ['mathe', 'webeng', 'prog', 'elektro', 'thinf', 'schluessel', 'projekt'],
  'semester-2': ['mathe', 'webeng', 'algo', 'daten', 'anwendung', 'prog', 'digital'],
  'semester-3': ['datenbanken', 'formale-sprachen', 'netztechnik', 'mathe', 'software-engineering', 'systemnah', 'webeng'],
  'praxis-1': ['daten', 'fragen', 'struktur'],
};

export function StudyModules({ phase }: { phase: string }) {
  const modules = studyModules[phase];
  const theory = phase !== 'praxis-1';

  return (
    <>
      <nav className="module-nav-grid" aria-label={theory ? 'Module im Überblick' : 'Praxisthemen'}>
        {modules.map((module, index) => (
          <a className="module-nav-card" href={`#modul-${anchors[phase][index]}`} key={module.title}>
            <span>{module.title}</span>
            <span className="module-nav-label">{module.topics[0]}</span>
          </a>
        ))}
      </nav>
      {modules.map((module, index) => (
        <article className="module-section" id={`modul-${anchors[phase][index]}`} key={module.title} aria-labelledby={`modul-${anchors[phase][index]}-title`}>
          <header className="module-section-header">
            <span className="module-badge">{theory ? 'Modul' : 'Einblick'} {index + 1}</span>
            <h2 id={`modul-${anchors[phase][index]}-title`}>{module.title}</h2>
          </header>
          <div className="module-intro"><p>{module.summary}</p></div>
          <ul className="study-topics">{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
          {module.projects && (
            <ul className="study-topics">
              {module.projects.map((project) => (
                <li key={project.slug}>
                  <Link className="home-link" href={`/projekte#project-${project.slug}-title`}>
                    Projekt ansehen · {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {theory && module.view && (
            <div className="module-deepdive">
              <a className="module-deeplink-btn" href={`${learningHub}?v=${module.view}`} target="_blank" rel="noopener noreferrer" aria-label={`${module.title}: Lernnotizen in Notion (neuer Tab)`}>
                <span aria-hidden="true">↗</span> Lernnotizen in Notion
              </a>
            </div>
          )}
        </article>
      ))}
    </>
  );
}
