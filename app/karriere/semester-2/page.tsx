import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Theorie-Semester 2 | Steven',
  description:
    'Mein zweites Theorie-Semester an der DHBW Mosbach – Inhalte, Beispiele und persönliche Rückblicke aus allen 7 Modulen.',
};

const moduleNav = [
  { href: '#modul-mathe', icon: '∫', label: 'Mathe 2', sub: 'Analysis · Differenzial- & Integralrechnung' },
  { href: '#modul-webeng', icon: '🌐', label: 'Web Engineering 2', sub: 'React · Frameworks · APIs' },
  { href: '#modul-algo', icon: '⚡', label: 'Algorithmen', sub: 'Sortieren · O-Notation · Graphen' },
  { href: '#modul-daten', icon: '🗄️', label: 'Datenverarbeitung', sub: 'SQL · Pandas · Analyse' },
  { href: '#modul-anwendung', icon: '🚀', label: 'Anwendungsprojekt', sub: 'Industrie 4.0 · Umsetzung' },
  { href: '#modul-prog', icon: '☕', label: 'Programmieren 2', sub: 'Java · OOP · Flugzeug-Projekt' },
  { href: '#modul-digital', icon: '01', label: 'Digitaltechnik', sub: 'Boolesche Algebra · Gatter · Schaltwerke' },
];

const NOTION_LINKS = {
  mathe: 'https://www.notion.so/2dea49695fb8808a89ccd95b93eb216b?v=359a49695fb8805184c7000cfcfff639&source=copy_link',
  webeng: 'https://www.notion.so/2dea49695fb8808a89ccd95b93eb216b?v=359a49695fb88039b9f8000c419bb8a5&source=copy_link',
  algo: 'https://www.notion.so/2dea49695fb8808a89ccd95b93eb216b?v=359a49695fb880ac8d14000cb29a80d7&source=copy_link',
  daten: 'https://www.notion.so/2dea49695fb8808a89ccd95b93eb216b?v=359a49695fb88017a590000cb4ef30f3&source=copy_link',
  anwendung: 'https://www.notion.so/',
  prog: 'https://www.notion.so/',
  digital: 'https://www.notion.so/',
};

function NotionDeeplink({ href }: { href: string }) {
  return (
    <section className="module-deepdive" aria-label="Vertiefung in Notion">
      <h3>Tiefer ins Material</h3>
      <p className="module-deepdive-intro">
        Vollständige Lerneinheiten und Karteikarten pflege ich in meinem
        Lern-Hub.
      </p>
      <a
        className="module-deeplink-btn"
        href={href}
        target="_blank"
        rel="noopener"
      >
        <span className="module-deeplink-icon" aria-hidden="true">
          ↗
        </span>
        Modul in Notion öffnen
      </a>
    </section>
  );
}

export default function Semester2() {
  return (
    <section className="story-detail" aria-labelledby="summary-title">
      <Breadcrumb href="/karriere" label="← Zurück zur Karriere‑Übersicht" />
      <StoryDetailHeader
        kicker="Theoriephase · DHBW Mosbach"
        titleId="summary-title"
        title="Theorie-Semester 2"
        meta="April 2026 – September 2026 · Informatik"
        summary="Vom Fundament zur Anwendung – im zweiten Semester vertieft sich alles: Algorithmen bekommen Komplexität, Mathe wird Kalkül, und aus kleinen Skripten werden echte Softwareprojekte."
      />

      <nav aria-label="Module im Überblick">
        <div className="module-nav-grid">
          {moduleNav.map((m) => (
            <a key={m.href} href={m.href} className="module-nav-card">
              <span className="module-nav-icon" aria-hidden="true">
                {m.icon}
              </span>
              <span>{m.label}</span>
              <span className="module-nav-label">{m.sub}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* MODUL 1: MATHEMATIK 2 – ANALYSIS */}
      <article
        className="module-section"
        id="modul-mathe"
        data-color="blue"
        aria-labelledby="modul-mathe-title"
      >
        <header className="module-section-header">
          <span className="module-icon" aria-hidden="true">∫</span>
          <span className="module-badge">Modul 1</span>
          <h2 id="modul-mathe-title">Mathematik 2 – Analysis</h2>
        </header>

        <div className="module-intro">
          <p className="module-intro-lead">
            Wenn Lineare Algebra die Statik der Mathematik ist, ist Analysis
            ihre Dynamik. Hier geht es um Veränderung: Wie schnell wächst etwas?
            Wie verhält sich eine Funktion im Grenzwert? Wie summiert man unendlich viele Werte?
          </p>
          <p>
            Differenzial- und Integralrechnung sind die zentralen Werkzeuge für
            alles, was mit kontinuierlichen Größen zu tun hat – von Physik-Simulationen über
            Signalverarbeitung bis hin zum Gradient Descent moderner KI-Modelle. Wer einmal verstanden
            hat, dass Backpropagation nichts anderes ist als die Kettenregel im großen Stil, sieht
            Machine Learning mit anderen Augen.
          </p>
        </div>

        <div className="module-body">
          <div className="module-topics">
            <h3>Kerninhalte</h3>
            <ul>
              <li>Folgen &amp; Reihen – Konvergenz, Grenzwerte, geometrische Reihe</li>
              <li>Stetigkeit &amp; Grenzwerte von Funktionen</li>
              <li>Differenzialrechnung: Ableitung, Produkt-, Quotienten- &amp; Kettenregel</li>
              <li>Kurvendiskussion: Extrem-, Wende- &amp; Sattelpunkte</li>
              <li>Integralrechnung: bestimmtes &amp; unbestimmtes Integral, Substitution, partielle Integration</li>
              <li>Taylor- und Potenzreihen zur Funktionsapproximation</li>
              <li>Anwendung in der Optimierung (Gradientenverfahren)</li>
            </ul>
          </div>

          <div className="module-highlight">
            <h3>Beispiel – Kettenregel &amp; Sigmoid</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              Die Sigmoid-Funktion taucht in jedem klassischen neuronalen Netz auf.
              Ihre Ableitung – die Grundlage für Backpropagation – fällt mit der Kettenregel
              überraschend elegant aus:
            </p>
            <pre>
              <code>{`σ(x) = 1 / (1 + e^(-x))

σ'(x) = d/dx [ (1 + e^(-x))^(-1) ]
      = -(1 + e^(-x))^(-2) · (-e^(-x))
      = e^(-x) / (1 + e^(-x))²
      = σ(x) · (1 - σ(x))`}</code>
            </pre>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginTop: '0.6rem' }}>
              Schöner Trick: Die Ableitung lässt sich aus dem Funktionswert selbst berechnen –
              ein Grund, warum Sigmoid in frühen Netzen so beliebt war.
            </p>
          </div>
        </div>

        <div className="module-praxis">
          <section className="module-application" aria-label="Praktische Anwendung">
            <h3>Praktische Anwendung</h3>
            <p>
              Ableitungen begegnen mir konkret beim Verständnis von ML-Trainingsverfahren:
              Gradient Descent ist im Kern eine Anwendung der Kettenregel auf
              hintereinandergeschaltete Funktionen. Auch Animationen mit{' '}
              <code>cubic-bezier</code> auf dieser Webseite folgen letztlich
              Differenzialgleichungen.
            </p>
          </section>
          <section className="module-projects" aria-label="Verwandte Projekte">
            <h3>Verwandte Projekte</h3>
            <p className="module-projects-empty">
              Keine direkten Projekte, aber Grundlage für jedes ML- und Optimierungsthema.
            </p>
          </section>
        </div>

        <NotionDeeplink href={NOTION_LINKS.mathe} />

        <div className="module-retro">
          <strong>Rückblick:</strong> Analysis hatte ich in der Schule, aber erst im
          Studium fiel der Groschen, <em>warum</em> Ableiten so wichtig ist. In dem Moment,
          in dem ich Backpropagation als &quot;Kettenregel über tausende Schichten&quot;
          gesehen habe, war Mathematik plötzlich kein Selbstzweck mehr, sondern Werkzeug.
        </div>
      </article>

      {/* MODUL 2: WEB ENGINEERING 2 */}
      <article
        className="module-section"
        id="modul-webeng"
        data-color="teal"
        aria-labelledby="modul-webeng-title"
      >
        <header className="module-section-header">
          <span className="module-icon" aria-hidden="true">🌐</span>
          <span className="module-badge">Modul 2</span>
          <h2 id="modul-webeng-title">Web Engineering 2</h2>
        </header>

        <div className="module-intro">
          <p className="module-intro-lead">
            Web Engineering 2 ist der Schritt von &quot;ich kann eine Webseite bauen&quot;
            zu &quot;ich kann eine Web-Anwendung bauen&quot;. Komponentenbasierte
            Frameworks, deklaratives Rendering, API-Integration und Deployment-Pipelines –
            das tägliche Werkzeug eines Frontend-Entwicklers.
          </p>
          <p>
            Im Mittelpunkt steht <strong>React</strong>: ein Paradigmenwechsel weg vom
            händischen DOM-Manipulieren hin zu deklarativen Komponentenbäumen, die ihren
            Zustand selbst verwalten. Darauf bauen Frameworks wie <strong>Next.js</strong>{' '}
            auf, die Server-Rendering, Routing und Build-Optimierung mitbringen. Am Ende
            steht der vollständige Lebenszyklus moderner Webapps – vom ersten Commit bis
            zum Production-Deploy.
          </p>
        </div>

        <div className="module-body">
          <div className="module-topics">
            <h3>Kerninhalte</h3>
            <ul>
              <li>React: Komponenten, Props, State, JSX</li>
              <li>Hooks (<code>useState</code>, <code>useEffect</code>, <code>useMemo</code>) &amp; Lifecycle</li>
              <li>Frameworks: Next.js, App Router, Server- &amp; Client-Components</li>
              <li>REST-APIs &amp; GraphQL – Konsumieren und Bereitstellen</li>
              <li>State Management (Context API, externe Stores)</li>
              <li>Build-Tools, Bundling &amp; Deployment-Pipelines</li>
              <li>Testing: Unit-, Integrations- &amp; End-to-End-Tests</li>
            </ul>
          </div>

          <div className="module-highlight">
            <h3>Beispiel – React-Komponente mit State</h3>
            <pre>
              <code>{`function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Klicks: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Geklickt: {count}×
    </button>
  );
}`}</code>
            </pre>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginTop: '0.6rem' }}>
              Drei Konzepte in zehn Zeilen: Komponente, lokaler State, Side-Effect.
              React rendert die Differenz, der Browser sieht den finalen DOM-Zustand.
            </p>
          </div>
        </div>

        <div className="module-praxis">
          <section className="module-application" aria-label="Praktische Anwendung">
            <h3>Praktische Anwendung</h3>
            <p>
              Diese Webseite ist die direkte Anwendung – sie ist mit{' '}
              <strong>Next.js 15</strong> und dem App-Router gebaut. Jede Story-Seite,
              jede Karte und jede Animation auf <code>braun-steven.de</code> ist eine
              React-Komponente. Das Cloudinary-Upload-Skript spricht eine REST-API,
              die Bibliothek nutzt clientseitige Filterung mit Hooks.
            </p>
          </section>
          <section className="module-projects" aria-label="Verwandte Projekte">
            <h3>Verwandte Projekte</h3>
            <ul>
              <li>
                <a href="/">braun-steven.de (Next.js-Anwendung)</a>
              </li>
            </ul>
          </section>
        </div>

        <NotionDeeplink href={NOTION_LINKS.webeng} />

        <div className="module-retro">
          <strong>Rückblick:</strong> Nach Web Engineering 1 hatte ich verstanden, wie
          das Web funktioniert – nach Web Engineering 2 konnte ich es selbst bauen.
          Der Sprung vom imperativen <code>document.querySelector</code> zum
          deklarativen Komponentenbaum war einer der zwei größten Paradigmen­wechsel
          des Studiums (der andere war Prolog).
        </div>
      </article>

      {/* MODUL 3: ALGORITHMEN & KOMPLEXITÄT */}
      <article
        className="module-section"
        id="modul-algo"
        data-color="orange"
        aria-labelledby="modul-algo-title"
      >
        <header className="module-section-header">
          <span className="module-icon" aria-hidden="true">⚡</span>
          <span className="module-badge">Modul 3</span>
          <h2 id="modul-algo-title">Algorithmen &amp; Komplexität</h2>
        </header>

        <div className="module-intro">
          <p className="module-intro-lead">
            Algorithmen sind das Herzstück der Informatik – und Komplexität ist die
            Brille, durch die man ihre Qualität beurteilt. Ob ein Programm bei einer
            Million Datensätzen Sekunden oder Stunden braucht, entscheidet sich nicht
            am Hardware-Preis, sondern am gewählten Algorithmus.
          </p>
          <p>
            Das Modul vertieft die O-Notation aus der Theoretischen Informatik und
            wendet sie auf reale Algorithmenklassen an: Sortieren, Suchen,
            Graphenprobleme. Die zentrale Frage lautet: Wie skaliert ein Verfahren
            mit der Eingabegröße? Und wann ist ein Problem so schwer, dass es
            grundsätzlich keinen schnellen Lösungsweg gibt (NP-vollständig)?
          </p>
        </div>

        <div className="module-body">
          <div className="module-topics">
            <h3>Kerninhalte</h3>
            <ul>
              <li>Sortieralgorithmen: BubbleSort, MergeSort, QuickSort, HeapSort</li>
              <li>O-Notation: best-, average- &amp; worst-case-Analyse</li>
              <li>Such-Algorithmen: lineare Suche, binäre Suche, Hashing</li>
              <li>Datenstrukturen: Heaps, balancierte Bäume, Hash-Tabellen</li>
              <li>Graphen: Repräsentation, BFS, DFS, Dijkstra, A*</li>
              <li>Strategien: Divide &amp; Conquer, Greedy, Dynamic Programming</li>
              <li>Komplexitätsklassen: P, NP, NP-vollständig (Reduktion)</li>
            </ul>
          </div>

          <div className="module-highlight">
            <h3>Beispiel – MergeSort (Pseudocode)</h3>
            <pre>
              <code>{`function mergeSort(A):
    if len(A) <= 1:
        return A
    mid   = len(A) // 2
    left  = mergeSort(A[:mid])
    right = mergeSort(A[mid:])
    return merge(left, right)

function merge(L, R):
    result = []
    while L and R:
        if L[0] <= R[0]:
            result.append(L.pop(0))
        else:
            result.append(R.pop(0))
    return result + L + R

# Komplexität: O(n log n) – stabil sortierend`}</code>
            </pre>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginTop: '0.6rem' }}>
              MergeSort ist das Lehrbuch-Beispiel für Divide &amp; Conquer:
              Halbieren, rekursiv lösen, kombinieren – und das in garantiert O(n log n).
            </p>
          </div>
        </div>

        <div className="module-praxis">
          <section className="module-application" aria-label="Praktische Anwendung">
            <h3>Praktische Anwendung</h3>
            <p>
              Beim Entwickeln entscheide ich täglich auf Basis von Komplexität: Set für
              Existenz-Checks (O(1)) statt Liste (O(n)), Map für Lookup-Tabellen,
              binäre Suche bei sortierten Daten. Bei der Bibliothek auf dieser Seite
              läuft die Filterung über vorberechnete Indizes – das spart bei jedem
              Tastendruck Rechenzeit.
            </p>
          </section>
          <section className="module-projects" aria-label="Verwandte Projekte">
            <h3>Verwandte Projekte</h3>
            <p className="module-projects-empty">
              Indirekt überall: Die Filterlogik in der Bibliothek und die
              Suchimplementierung im Karriere-Hub.
            </p>
          </section>
        </div>

        <NotionDeeplink href={NOTION_LINKS.algo} />

        <div className="module-retro">
          <strong>Rückblick:</strong> Das &quot;Aha&quot; bei diesem Modul war der
          Unterschied zwischen O(n²) und O(n log n) bei einer Million Einträgen:
          eine Trillion gegenüber zwanzig Millionen Operationen. Davor habe ich
          Datenstrukturen nach Bauchgefühl gewählt – seitdem nach Komplexitätsklasse.
        </div>
      </article>

      {/* MODUL 4: PRAKTISCHE DATENVERARBEITUNG */}
      <article
        className="module-section"
        id="modul-daten"
        data-color="purple"
        aria-labelledby="modul-daten-title"
      >
        <header className="module-section-header">
          <span className="module-icon" aria-hidden="true">🗄️</span>
          <span className="module-badge">Modul 4</span>
          <h2 id="modul-daten-title">Praktische Datenverarbeitung</h2>
        </header>

        <div className="module-intro">
          <p className="module-intro-lead">
            Daten sind in fast jedem realen Softwareprojekt der eigentliche Wert –
            der Code drumherum ist nur die Hülle. Dieses Modul vermittelt die
            Werkzeuge, mit denen man Daten strukturiert speichert, gezielt abfragt
            und für Analysen aufbereitet.
          </p>
          <p>
            Im Mittelpunkt stehen <strong>relationale Datenbanken</strong> mit SQL als
            universeller Abfragesprache: Wie modelliert man Realität in Tabellen?
            Wann braucht es welche Normalform? Und wie holt man aus mehreren
            verbundenen Tabellen genau die richtige Antwort? Anschließend kommt
            <strong> Pandas</strong> als pragmatischer Einstieg in datengetriebene
            Analysen mit Python.
          </p>
        </div>

        <div className="module-body">
          <div className="module-topics">
            <h3>Kerninhalte</h3>
            <ul>
              <li>Relationales Datenbankmodell &amp; ER-Diagramme</li>
              <li>Normalformen (1NF–3NF) zur Vermeidung von Redundanz</li>
              <li>SQL: <code>SELECT</code>, <code>JOIN</code>, <code>GROUP BY</code>, Aggregat­funktionen</li>
              <li>Transaktionen, ACID-Eigenschaften, Indizes</li>
              <li>Pandas: DataFrames, GroupBy, Merge, Pivot</li>
              <li>Datenbereinigung &amp; -visualisierung (matplotlib)</li>
              <li>Ausblick auf NoSQL (Dokument-, Key-Value-, Graph-Datenbanken)</li>
            </ul>
          </div>

          <div className="module-highlight">
            <h3>Beispiel – SQL-Query mit JOIN</h3>
            <pre>
              <code>{`SELECT
    k.name,
    COUNT(b.id)        AS bestellungen,
    SUM(b.gesamtpreis) AS umsatz
FROM kunden k
LEFT JOIN bestellungen b
       ON b.kunde_id = k.id
WHERE b.datum >= '2026-01-01'
GROUP BY k.id, k.name
HAVING SUM(b.gesamtpreis) > 500
ORDER BY umsatz DESC;`}</code>
            </pre>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginTop: '0.6rem' }}>
              Aus zwei Tabellen wird ein Bericht: Kunden mit über 500 € Umsatz
              im laufenden Jahr, sortiert absteigend. Das alles deklarativ in einem Statement.
            </p>
          </div>
        </div>

        <div className="module-praxis">
          <section className="module-application" aria-label="Praktische Anwendung">
            <h3>Praktische Anwendung</h3>
            <p>
              SQL nutze ich bei der Praxisphase regelmäßig zur Auswertung von
              Datenbeständen. Pandas ist das Werkzeug der Wahl, wenn ich CSV- oder
              Log-Exporte schnell analysieren muss – deutlich pragmatischer als alles
              händisch in Excel oder via Schleifen in Python.
            </p>
          </section>
          <section className="module-projects" aria-label="Verwandte Projekte">
            <h3>Verwandte Projekte</h3>
            <p className="module-projects-empty">
              Wird im Industrie-4.0-Projekt eingesetzt – dort bildet eine relationale
              Datenbank die persistente Schicht des Dashboards.
            </p>
          </section>
        </div>

        <NotionDeeplink href={NOTION_LINKS.daten} />

        <div className="module-retro">
          <strong>Rückblick:</strong> Datenbanken klangen nach trockenem Stoff, bis
          ich gemerkt habe: SQL ist ein deklaratives Paradigma – ähnlich wie Prolog.
          Man beschreibt das gewünschte Ergebnis, nicht den Weg dorthin. Dass ein
          guter Index eine Anfrage tausendfach beschleunigen kann, war der Moment,
          in dem ich Datenbankdesign ernst genommen habe.
        </div>
      </article>

      {/* MODUL 5: ANWENDUNGSPROJEKT INFORMATIK – DURCHFÜHRUNG */}
      <article
        className="module-section"
        id="modul-anwendung"
        data-color="green"
        aria-labelledby="modul-anwendung-title"
      >
        <header className="module-section-header">
          <span className="module-icon" aria-hidden="true">🚀</span>
          <span className="module-badge">Modul 5</span>
          <h2 id="modul-anwendung-title">Anwendungsprojekt Informatik – Durchführung</h2>
        </header>

        <div className="module-intro">
          <p className="module-intro-lead">
            Im ersten Semester war das Anwendungsprojekt vor allem <em>Planung</em> –
            jetzt geht es an die <strong>Umsetzung</strong>. Aus Architektur-Diagrammen
            werden Module, aus Schnittstellendefinitionen werden APIs, aus
            Anforderungslisten wird laufender, getesteter Code.
          </p>
          <p>
            Das Industrie-4.0-Dashboard, das wir konzipiert haben, wird in diesem
            Semester gebaut: Sensordaten kommen über <strong>MQTT</strong> und{' '}
            <strong>Kafka</strong> herein, werden serverseitig verarbeitet, in einer
            relationalen Datenbank persistiert und in einem Web-Frontend visualisiert.
            Parallel zum Coden wird die Methodik geübt – Sprints, Reviews, Doku.
          </p>
        </div>

        <div className="module-body">
          <div className="module-topics">
            <h3>Projektphase 2 – Umsetzung</h3>
            <ul>
              <li>MQTT- und Kafka-Anbindung der realen &amp; simulierten Sensoren</li>
              <li>Serverseitige Verarbeitung &amp; Persistenz in der relationalen DB</li>
              <li>Berechnung der Kennzahlen (Verbrauch, Effizienz, Auslastung)</li>
              <li>Web-Frontend mit interaktiven Charts &amp; Live-Updates</li>
              <li>Test-Strategie: Unit-, Integrations- &amp; End-to-End-Tests</li>
              <li>Versionskontrolle, Code-Reviews, CI-Pipeline im Team</li>
              <li>Abschlussdokumentation &amp; Präsentation der Ergebnisse</li>
            </ul>
          </div>

          <div className="module-highlight">
            <h3>Architektur – aus dem Plan wird Code</h3>
            <div
              className="module-flow"
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span className="module-flow-step">Sensor (real/sim)</span>
                <span className="module-flow-arrow">→</span>
                <span className="module-flow-step">MQTT / Kafka</span>
                <span className="module-flow-arrow">→</span>
                <span className="module-flow-step">Backend-Service</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span className="module-flow-arrow" style={{ paddingLeft: '0.2rem' }}>→</span>
                <span className="module-flow-step">Relationale DB</span>
                <span className="module-flow-arrow">→</span>
                <span className="module-flow-step">REST-API</span>
                <span className="module-flow-arrow">→</span>
                <span className="module-flow-step">Web-Dashboard</span>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginTop: '0.75rem' }}>
              Die Pfeile aus dem Architektur-PDF des ersten Semesters sind jetzt echte
              Verbindungen – jeder Schritt ist eine eigene Komponente mit eigener
              Verantwortlichkeit.
            </p>
          </div>
        </div>

        <div className="module-praxis">
          <section className="module-application" aria-label="Praktische Anwendung">
            <h3>Praktische Anwendung</h3>
            <p>
              Das Projekt ist die direkte Anwendung – aus Theorie wird ein laufendes
              System. Hier zahlt sich alles aus, was wir parallel im Modul lernen:
              SQL aus der Datenverarbeitung, React aus Web Engineering 2,
              Komplexitätsdenken aus Algorithmen.
            </p>
          </section>
          <section className="module-projects" aria-label="Verwandte Projekte">
            <h3>Verwandte Projekte</h3>
            <ul>
              <li>
                <a href="/karriere/semester-1#modul-projekt">
                  Anwendungsprojekt – Semester 1 (Planung)
                </a>
              </li>
              <li>
                <a href="/karriere/praxis-1">Praxis-Insights · 1. Projektarbeit</a>
              </li>
            </ul>
          </section>
        </div>

        <NotionDeeplink href={NOTION_LINKS.anwendung} />

        <div className="module-retro">
          <strong>Rückblick:</strong> Der Sprung von &quot;wir haben einen Plan&quot;
          zu &quot;wir haben ein laufendes System&quot; ist viel größer, als das
          Diagramm aus Semester 1 vermuten ließ. Schnittstellen, die auf dem Papier
          klar wirkten, mussten im Code dreimal nachverhandelt werden – genau das ist
          die Lektion: <em>echtes</em> Engineering passiert beim Bauen, nicht beim Planen.
        </div>
      </article>

      {/* MODUL 6: PROGRAMMIEREN 2 – JAVA */}
      <article
        className="module-section"
        id="modul-prog"
        data-color="indigo"
        aria-labelledby="modul-prog-title"
      >
        <header className="module-section-header">
          <span className="module-icon" aria-hidden="true">☕</span>
          <span className="module-badge">Modul 6</span>
          <h2 id="modul-prog-title">Programmieren 2 – Java</h2>
        </header>

        <div className="module-intro">
          <p className="module-intro-lead">
            Nach Python im ersten Semester kommt jetzt <strong>Java</strong> – eine
            statisch typisierte, objektorientierte Sprache, die in vielen Unternehmen
            das Rückgrat der Backend-Welt bildet. Der Wechsel ist gewollt: was Python
            elegant verbirgt, macht Java explizit – Typen, Sichtbarkeiten,
            Klassenstrukturen.
          </p>
          <p>
            Der rote Faden ist ein semesterlanges Projekt: ein
            <strong> Flugzeug</strong> in Java zu modellieren – Klassenhierarchien für
            unterschiedliche Flugzeugtypen, Passagiere, Crew, Buchungen. Ein perfektes
            Spielfeld, um Vererbung, Polymorphismus, Interfaces und sauberes
            OOP-Design zu üben, ohne sich in Frameworks zu verlieren.
          </p>
        </div>

        <div className="module-body">
          <div className="module-topics">
            <h3>Kerninhalte</h3>
            <ul>
              <li>Java-Syntax: Typen, Sichtbarkeiten, Pakete, Compile-Modell</li>
              <li>OOP vertieft: Klassen, abstrakte Klassen, Interfaces</li>
              <li>Vererbung &amp; Polymorphismus, <code>@Override</code></li>
              <li>Generics &amp; Java Collections Framework (List, Map, Set)</li>
              <li>Exception-Handling: checked &amp; unchecked Exceptions</li>
              <li>I/O, Streams, Lambdas &amp; funktionale Interfaces</li>
              <li>Unit-Tests mit JUnit</li>
            </ul>
          </div>

          <div className="module-highlight">
            <h3>Beispiel – Flugzeug-Modell in Java</h3>
            <pre>
              <code>{`public abstract class Flugzeug {
    protected final String kennzeichen;
    protected final int sitzplaetze;

    protected Flugzeug(String kennz, int plaetze) {
        this.kennzeichen = kennz;
        this.sitzplaetze = plaetze;
    }

    public abstract void starten();
    public abstract void landen();
}

public class Verkehrsflugzeug extends Flugzeug {
    private final List<Passagier> passagiere = new ArrayList<>();

    public Verkehrsflugzeug(String k, int p) { super(k, p); }

    @Override public void starten() {
        System.out.println(kennzeichen + " hebt ab.");
    }
    @Override public void landen()  {
        System.out.println(kennzeichen + " ist gelandet.");
    }

    public void einsteigen(Passagier p) {
        if (passagiere.size() < sitzplaetze) passagiere.add(p);
    }
}`}</code>
            </pre>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginTop: '0.6rem' }}>
              Eine abstrakte Basisklasse legt die Struktur fest, konkrete Unterklassen
              füllen sie aus – das Lehrbuch-Setup für Polymorphismus.
            </p>
          </div>
        </div>

        <div className="module-sub">
          <h3>Projekt – Flugzeug-Simulation</h3>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>
            Über das Semester wächst aus einer einzelnen <code>Flugzeug</code>-Klasse
            ein kleines System: verschiedene Flugzeugtypen (Verkehrs-, Fracht-,
            Privatflugzeug), Passagiere und Crew, Sitzplatzverwaltung, Buchungen
            und Flugpläne. Die Übungen zeigen Schritt für Schritt, wie Vererbung,
            Interfaces, Collections und Exceptions zusammenspielen.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            Größte Lerneffekte: bewusst über Sichtbarkeiten nachdenken
            (<code>private</code> vs. <code>protected</code>) und Verantwortlichkeiten
            sauber trennen – wer kennt wen, und wer ändert was?
          </p>
        </div>

        <div className="module-praxis">
          <section className="module-application" aria-label="Praktische Anwendung">
            <h3>Praktische Anwendung</h3>
            <p>
              Java ist im Unternehmensumfeld weit verbreitet – Kenntnisse darüber
              helfen mir, fremde Codebasen schneller zu verstehen. Die statische
              Typisierung hat mein Denken über Schnittstellen geschärft: Was ein Typ
              <em> nicht</em> akzeptiert, sagt oft mehr aus als das, was er erlaubt.
            </p>
          </section>
          <section className="module-projects" aria-label="Verwandte Projekte">
            <h3>Verwandte Projekte</h3>
            <p className="module-projects-empty">Flugzeug-Projekt-Repo folgt.</p>
          </section>
        </div>

        <NotionDeeplink href={NOTION_LINKS.prog} />

        <div className="module-retro">
          <strong>Rückblick:</strong> Nach Python fühlte sich Java zunächst sperrig an –
          jeder kleine Schritt verlangt eine Typdeklaration, eine Sichtbarkeit, einen
          Block. Aber genau dieser &quot;Zwang zur Klarheit&quot; war lehrreich: in
          Python kann man Strukturen erraten, in Java muss man sie aussprechen.
          Das hat mir geholfen, OOP nicht nur zu benutzen, sondern wirklich zu denken.
        </div>
      </article>

      {/* MODUL 7: DIGITALTECHNIK */}
      <article
        className="module-section"
        id="modul-digital"
        data-color="red"
        aria-labelledby="modul-digital-title"
      >
        <header className="module-section-header">
          <span className="module-icon" aria-hidden="true">01</span>
          <span className="module-badge">Modul 7</span>
          <h2 id="modul-digital-title">Digitaltechnik</h2>
        </header>

        <div className="module-intro">
          <p className="module-intro-lead">
            Digitaltechnik ist die Brücke zwischen physischer Hardware und logischem
            Code. Hier wird sichtbar, wie aus zwei einfachen Zuständen –{' '}
            <strong>0</strong> und <strong>1</strong> – jede Berechnung der Welt
            zusammengesetzt werden kann.
          </p>
          <p>
            Das Modul beginnt bei der <strong>booleschen Algebra</strong>: Wie lassen
            sich logische Aussagen formal beschreiben und vereinfachen? Daraus entstehen{' '}
            <strong>Logikgatter</strong>, aus Gattern <strong>Schaltnetze</strong>{' '}
            (kombinatorisch, ohne Gedächtnis) und schließlich <strong>Schaltwerke</strong>{' '}
            (sequenziell, mit Speicher) – die Bausteine, aus denen am Ende ein
            Prozessor entsteht.
          </p>
        </div>

        <div className="module-body">
          <div className="module-topics">
            <h3>Kerninhalte</h3>
            <ul>
              <li>Zahlensysteme: binär, oktal, hexadezimal, BCD</li>
              <li>Boolesche Algebra: Gesetze, Normalformen (DNF/KNF)</li>
              <li>Logikgatter: AND, OR, NOT, XOR, NAND, NOR</li>
              <li>KV-Diagramme zur Vereinfachung von Funktionen</li>
              <li>Schaltnetze: Halb- &amp; Volladdierer, Multiplexer, Decoder</li>
              <li>Schaltwerke: RS-, D-, JK-Flipflops, Zähler, Register</li>
              <li>Ausblick: Aufbau einer einfachen ALU</li>
            </ul>
          </div>

          <div className="module-highlight">
            <h3>Beispiel – Halbaddierer</h3>
            <pre>
              <code>{`Wahrheitstabelle (a, b → s, c)
 a | b || s | c
---+---++---+---
 0 | 0 || 0 | 0
 0 | 1 || 1 | 0
 1 | 0 || 1 | 0
 1 | 1 || 0 | 1

Funktionen:
  s (Summe)   = a XOR b
  c (Carry)   = a AND b`}</code>
            </pre>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginTop: '0.6rem' }}>
              Zwei Gatter, vier Eingangskombinationen – der kleinste Baustein
              jeder binären Addition. Aus mehreren Halbaddierern wird ein
              Volladdierer, daraus ein n-Bit-Addierwerk.
            </p>
          </div>
        </div>

        <div className="module-praxis">
          <section className="module-application" aria-label="Praktische Anwendung">
            <h3>Praktische Anwendung</h3>
            <p>
              Boolesche Algebra ist nicht nur Hardware-Theorie: Jeder{' '}
              <code>if</code>-Ausdruck im Code ist ein Boolescher Term, der sich mit
              denselben Regeln vereinfachen lässt. Ein KV-Diagramm im Kopf hilft, aus
              verschachtelten Bedingungen klare Logik zu machen.
            </p>
          </section>
          <section className="module-projects" aria-label="Verwandte Projekte">
            <h3>Verwandte Projekte</h3>
            <p className="module-projects-empty">
              Direkter Anschluss an die Elektrotechnik aus Semester 1 – dort der
              Transistor als Schalter, hier dieselben Schalter als Logikgatter.
            </p>
          </section>
        </div>

        <NotionDeeplink href={NOTION_LINKS.digital} />

        <div className="module-retro">
          <strong>Rückblick:</strong> Vor Digitaltechnik wusste ich, <em>dass</em>{' '}
          ein Computer rechnet, aber nicht <em>wie</em>. Nach diesem Modul kann ich
          den Weg von einer Wahrheitstabelle über ein Schaltnetz bis zu einem echten
          Addierwerk zeichnen. Damit schließt sich der Kreis, der mit dem Transistor
          aus Semester 1 begonnen hat.
        </div>
      </article>

      {/* GESAMTFAZIT */}
      <div className="semester-retro" role="region" aria-label="Gesamtfazit">
        <h2>Fazit – Was bleibt?</h2>
        <p>
          Das zweite Theorie-Semester war der Übergang vom Lernen zum Anwenden:
          Aus Schleifen wurden Algorithmen mit messbarer Komplexität, aus Funktionen
          wurden React-Komponenten mit klar definiertem Zustand, aus &quot;Mathe&quot;
          wurde das Werkzeug, mit dem moderne KI rechnet. Was im ersten Semester noch
          isoliert nebeneinander stand, wuchs zu einem Bild zusammen.
        </p>
        <p>
          Das Anwendungsprojekt war der rote Faden, der alles verknüpft hat: das
          Konzept aus Semester 1 wurde echter, laufender Code – mit React aus Web
          Engineering 2, SQL aus der Datenverarbeitung und Komplexitätsdenken aus
          den Algorithmen. Der größte Lerneffekt lag dabei nicht im Coden, sondern
          in der Abstimmung im Team.
        </p>
        <p>
          Java in Programmieren 2 hat gezeigt, wie eine zweite Sprache die OOP-Konzepte
          neu schärft – Sichtbarkeiten, Typen und Interfaces sieht man in Python nicht
          so deutlich. Und Digitaltechnik hat den Bogen zur Elektrotechnik aus Semester 1
          geschlossen: Vom Transistor zum Logikgatter, vom Logikgatter zum Addierwerk.
        </p>
      </div>

      <StoryPagination
        actions={[
          { href: '/karriere/semester-1', label: 'Semester 1', ghost: true },
          { href: '/karriere', label: 'Zur Übersicht' },
        ]}
      />
    </section>
  );
}
