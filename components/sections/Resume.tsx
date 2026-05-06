import { SectionHead } from '@/components/SectionHead';
import { Timeline, type TimelineItem } from '@/components/Timeline';

const items: TimelineItem[] = [
  {
    meta: 'Sept. 2025 – heute',
    title: 'Angewandte Informatik (DHBW)',
    desc: 'Dualer Studiengang mit Praxisphasen in der Industrie.',
  },
  {
    meta: 'März 2023 – Feb. 2025',
    title: 'Maschinenbau-Techniker',
    desc: 'Konstruieren, Rechnen, Erste Coding-Grundlagen',
  },
  {
    meta: 'März 2021 – Dez. 2022',
    title: 'Industriemechaniker Job',
    desc: 'Linear-Achsenbau und Hydraulikpressenbau',
  },
  {
    meta: 'Aug. 2017 – Juli 2021',
    title: 'Ausbildung Industriemechaniker - Maschinen/Anlagenbau',
    desc: 'Mechanische Grundlagen und Verständnis für Industrieprozesse',
  },
  {
    meta: 'Aug. 2011 – Juli 2017',
    title: 'Schulischer Abschluss',
    desc: 'Lesen, Schreiben, Rechnen.',
  },
];

const stats = [
  { value: '15', label: 'Jahre Werdegang' },
  { value: '5', label: 'Stationen' },
  { value: "'25", label: 'Studienstart' },
];

const phases = [
  { label: 'Schulzeit',       period: '2011 – 2017', years: 6,   color: '#94a3b8' },
  { label: 'Ausbildung',      period: '2017 – 2021', years: 4,   color: '#60a5fa' },
  { label: 'Beruf',           period: '2021 – 2022', years: 1.5, color: '#3b82f6' },
  { label: 'Techniker',       period: '2023 – 2025', years: 2,   color: '#c8102e' },
  { label: 'Duales Studium',  period: '2025 – heute', years: 2,  color: '#0f2f5f', current: true },
];

const MAX_YEARS = 6;

export function Resume() {
  return (
    <section id="resume" className="resume" aria-labelledby="resume-title">
      <SectionHead
        kicker="Lebenslauf"
        titleId="resume-title"
        title="Meine Stationen auf einen Blick."
        intro="Stationen die ich in meinem Leben bisher durchlaufen habe"
      />
      <div className="resume-layout">
        <Timeline items={items} />

        <aside className="resume-sidebar" aria-label="Karriere-Übersicht">
          <div className="resume-stat-grid">
            {stats.map((s) => (
              <div key={s.label} className="resume-stat">
                <span className="resume-stat-value">{s.value}</span>
                <span className="resume-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="resume-phases">
            <span className="resume-phases-title">Karrierebogen</span>
            {phases.map((p) => (
              <div key={p.label} className="resume-phase">
                <div className="resume-phase-meta">
                  <span
                    className="resume-phase-dot"
                    style={{ '--phase-color': p.color } as React.CSSProperties}
                    aria-hidden="true"
                  />
                  <span className="resume-phase-period">{p.period}</span>
                </div>
                <div className="resume-phase-bar-wrap">
                  <div
                    className={`resume-phase-bar${p.current ? ' resume-phase-bar--current' : ''}`}
                    style={{
                      '--phase-color': p.color,
                      '--phase-width': `${(p.years / MAX_YEARS) * 100}%`,
                    } as React.CSSProperties}
                    aria-label={`${p.label}: ${p.years} Jahre`}
                  />
                </div>
                <span className="resume-phase-name">{p.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
