import Link from 'next/link';

import { Timeline, type TimelineItem } from '@/components/Timeline';

/**
 * Die fünf Stationen – einmal. Vorher lagen dieselben Daten dreifach auf der
 * Startseite: als Bildstreifen (`About`), als Timeline und als Balkendiagramm
 * ("Karrierebogen", `Resume`).
 */
const STATIONS: TimelineItem[] = [
  {
    meta: 'Sept. 2025 – heute',
    title: 'Angewandte Informatik (DHBW Mosbach)',
    desc: 'Duales Studium mit Praxisphasen bei Emerson.',
  },
  {
    meta: 'März 2023 – Feb. 2025',
    title: 'Maschinenbau-Techniker',
    desc: 'Konstruieren, Rechnen, erste Coding-Grundlagen. Abschluss 1,2.',
  },
  {
    meta: 'März 2021 – Dez. 2022',
    title: 'Industriemechaniker',
    desc: 'Linear-Achsenbau und Hydraulikpressenbau.',
  },
  {
    meta: 'Aug. 2017 – Juli 2021',
    title: 'Ausbildung Industriemechaniker',
    desc: 'Maschinen- und Anlagenbau, Verständnis für Industrieprozesse.',
  },
  {
    meta: 'Aug. 2011 – Juli 2017',
    title: 'Realschule',
    desc: 'Schulischer Abschluss.',
  },
];

export function Werdegang() {
  return (
    <section
      id="werdegang"
      className="home-section home-werdegang"
      aria-labelledby="home-werdegang-title"
    >
      {/* Rücksprünge aus den Unterseiten (`/#resume`, `/#career`, `/#about`)
          landen weiter hier, ohne dass die Unterseiten angefasst werden. */}
      <span id="resume" className="home-anchor-alias" aria-hidden="true" />
      <span id="career" className="home-anchor-alias" aria-hidden="true" />
      <span id="about" className="home-anchor-alias" aria-hidden="true" />

      <div className="home-shell">
        <header className="home-head">
          <p className="home-kicker">Werdegang</p>
          <h2 id="home-werdegang-title" className="home-title">
            Erst Maschinen gebaut. Jetzt Software.
          </h2>
        </header>

        <div className="home-werdegang-layout">
          <div className="home-werdegang-text">
            <p>
              Ich habe nie wirklich für die Schule gelernt – weder in der
              Realschule noch in der Berufsschule. Arbeit war körperlich, und
              das war okay, bis eine Knieverletzung diesen Plan zerstörte.
            </p>
            <p>
              Plötzlich musste ich mit dem Kopf verdienen statt mit den Händen.
              Beim Maschinenbau-Techniker habe ich mich zum ersten Mal in
              meinem Leben wirklich angestrengt – und gemerkt, dass Lernen Spaß
              macht. Abschluss: <strong>1,2</strong>.
            </p>
            <p>
              Danach war klar: Ich wollte in ein Feld, das maximales Lernen
              fordert. Aus acht Jahren Metall bleibt der Reflex, Dinge
              auseinanderzunehmen, bis ich sie verstanden habe – heute sind es
              eben Systeme statt Getriebe.
            </p>

            <p className="home-werdegang-links">
              <Link href="/karriere" className="home-link">
                Semester im Detail
                <span aria-hidden="true"> →</span>
              </Link>
              <Link href="/karriere/praxis-1" className="home-link">
                Praxisphase bei Emerson
                <span aria-hidden="true"> →</span>
              </Link>
            </p>
          </div>

          <Timeline items={STATIONS} />
        </div>
      </div>
    </section>
  );
}
