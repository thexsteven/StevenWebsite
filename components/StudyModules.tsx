import { learningHub, studyModules } from '@/lib/study';

const anchors: Record<string, string[]> = {
  'semester-1': ['mathe', 'webeng', 'prog', 'elektro', 'thinf', 'schluessel', 'projekt'],
  'semester-2': ['mathe', 'webeng', 'algo', 'daten', 'anwendung', 'prog', 'digital'],
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
          {theory && (
            <div className="module-deepdive">
              {module.view ? (
                <a className="module-deeplink-btn" href={`${learningHub}?v=${module.view}`} target="_blank" rel="noopener noreferrer" aria-label={`${module.title}: Lernnotizen in Notion (neuer Tab)`}>
                  <span aria-hidden="true">↗</span> Lernnotizen in Notion
                </a>
              ) : <p className="study-link-pending">Notion-Link wird bald hinzugefügt.</p>}
            </div>
          )}
        </article>
      ))}
    </>
  );
}
