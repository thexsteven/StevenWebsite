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

export function Resume() {
  return (
    <section id="resume" className="resume" aria-labelledby="resume-title">
      <SectionHead
        kicker="Lebenslauf"
        titleId="resume-title"
        title="Meine Stationen auf einen Blick."
        intro="Stationen die ich in meinem Leben bisher durchlaufen habe"
      />
      <Timeline items={items} />
    </section>
  );
}
