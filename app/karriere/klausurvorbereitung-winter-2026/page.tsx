import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import styles from './page.module.css';

const title = 'Mein Lernplan für die Klausuren Winter 2026 | Steven Braun';
const description = 'Vier Klausuren, acht Stunden pro Woche: mein persönlicher Lernplan mit klaren Prioritäten, Wiederholungen und Platz für neugieriges Lernen.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: '/karriere/klausurvorbereitung-winter-2026' },
  twitter: { title, description },
};

const exams = [
  { name: 'Formale Sprachen und Automaten', date: '2026-11-16', label: '16. November', minutes: 90, budget: '1:30 h', practice: '75 %', recall: '25 %' },
  { name: 'Kommunikations- und Netztechnik', date: '2026-11-19', label: '19. November', minutes: 105, budget: '1:45 h', practice: '45 %', recall: '55 %' },
  { name: 'Mathematik 3', date: '2026-11-23', label: '23. November', minutes: 120, budget: '2:00 h', practice: '90 %', recall: '10 %' },
  { name: 'Systemnahe Programmierung 1', date: '2026-11-26', label: '26. November', minutes: 105, budget: '1:45 h', practice: '55 %', recall: '45 %' },
];

export default function LernplanPage() {
  return (
    <article className={styles.page} aria-labelledby="lernplan-title">
      <Breadcrumb href="/karriere" label="← Zurück zum Studium" />
      <StoryDetailHeader
        kicker="Studium · Winter 2026"
        titleId="lernplan-title"
        title="Mein Lernplan"
        meta="Klausurphase: 16.–26. November 2026"
        summary="Dieses Semester plane ich bewusst Zeit für meine Klausuren ein. Ein überschaubares Wochenbudget, klare Prioritäten und regelmäßiges Wiederholen halten den Plan einfach."
      />
      <div className={styles.intro}>
        <p>Mein Ziel ist eine <strong>1,7 je Klausur</strong>. Zuerst sichere ich das Bestehen in allen vier Fächern ab, danach arbeite ich an der Note. Dafür reserviere ich maximal acht Stunden pro Woche.</p>
        <p>Daneben lerne ich weiter die Konzepte und Dinge, die mich interessieren. Diese Zeit gehört nicht zum Klausurbudget. So hat beides seinen Platz: gezielt vorbereiten und aus Neugier dazulernen.</p>
        <p className={styles.stand}>Planungsstand: <time dateTime="2026-09-26">26. September 2026</time> · Die Übersicht zeigt meinen Plan, keine gemessenen Fortschrittswerte.</p>
      </div>

      <section className={styles.section} aria-labelledby="exams-title">
        <h2 id="exams-title">Meine Klausuren</h2>
        <ol className={styles.exams}>
          {exams.map((exam) => (
            <li key={exam.date} className={styles.card}>
              <time dateTime={exam.date}>{exam.label} 2026</time>
              <h3>{exam.name}</h3>
              <p>{exam.budget} Vorbereitung pro Woche zu Beginn</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="budget-title">
        <h2 id="budget-title">Mein Wochenbudget</h2>
        <p>Sieben feste Stunden und eine Stunde Reserve. Montag bis Donnerstag jeweils 90 Minuten, am Freitag 60 Minuten. Die Wochenenden bleiben grundsätzlich frei.</p>
        <dl className={styles.budget}>
          {exams.map((exam) => (
            <div key={exam.date}>
              <dt>{exam.name}</dt><dd>{exam.budget}</dd>
              <div className={styles.bar} aria-hidden="true"><span style={{ width: `${exam.minutes / 480 * 100}%` }} /></div>
            </div>
          ))}
          <div><dt>Flexible Reserve</dt><dd>1:00 h</dd><div className={styles.bar} aria-hidden="true"><span style={{ width: '12.5%' }} /></div></div>
        </dl>
        <p>Die Balken zeigen den Anteil am gesamten Acht-Stunden-Budget.</p>
        <details className={styles.details}>
          <summary>Mein fester Wochenrahmen ab 28. September</summary>
          <ul>
            <li>Montag: 90 Minuten Mathematik 3.</li>
            <li>Dienstag: 90 Minuten Netztechnik.</li>
            <li>Mittwoch: 90 Minuten Systemnahe Programmierung.</li>
            <li>Donnerstag: 90 Minuten Formale Sprachen.</li>
            <li>Freitag: 30 Minuten Mathematik, je 15 Minuten Netztechnik und Systemnahe Programmierung.</li>
          </ul>
          <p>Fällige Wiederholungen gehören zum jeweiligen Morgenblock und kommen nicht zusätzlich dazu. Die Reserve von höchstens 60 Minuten wird bei Bedarf durch die Fehlersteuerung freigegeben.</p>
        </details>
        <details className={styles.details}>
          <summary>Wie sich die Zeit nach einer Klausur verschiebt</summary>
          <p>50 % des frei werdenden Fachbudgets gehen an die unmittelbar nächste Klausur. Die anderen 50 % nutze ich für das größte diagnostizierte Defizit. Das Wochenlimit bleibt bestehen.</p>
        </details>
      </section>

      <section className={styles.section} aria-labelledby="method-title">
        <h2 id="method-title">So lerne ich</h2>
        <ul className={styles.mix}>
          <li><strong>60 %</strong><span>Lerntrainer</span></li>
          <li><strong>30 %</strong><span>Aufgaben aus aktuellen Originalunterlagen</span></li>
          <li><strong>10 %</strong><span>Abruf ohne Unterlagen oder Hilfe</span></li>
        </ul>
        <h3>Wiederholen nach 1–3–7</h3>
        <p>Nach der ersten Bearbeitung wiederhole ich ein Thema an Tag 1, Tag 3 und Tag 7. Dafür sind höchstens 20 Minuten pro Morgen vorgesehen.</p>
        <ol className={styles.steps}>
          {[1, 3, 7].map((day) => <li key={day}><strong>Tag {day}</strong><span>Ohne Hilfe abrufen</span></li>)}
        </ol>
        <p>Ein Thema gilt erst nach zwei korrekten, ungestützten Abrufen an unterschiedlichen Tagen als beherrscht. Einen Wiederholungsstau arbeite ich nicht vollständig ab.</p>
        <h3>Was hat gerade Priorität?</h3>
        <dl className={styles.relevance}>
          <div><dt>A · prüfungsbestätigt</dt><dd>Ausdrücklich angekündigter Stoff oder eine offizielle Musteraufgabe.</dd></div>
          <div><dt>B · kursbestätigt</dt><dd>Inhalt aus den aktuellen Unterlagen der Lehrveranstaltung.</dd></div>
          <div><dt>C · ergänzend</dt><dd>Alte, fremde oder selbst erzeugte Vertiefung.</dd></div>
        </dl>
        <p>Nur A und B kommen in die verpflichtende Tagesqueue. Zu jeder Aufgabe gehören Quelle, Relevanz und ein kurzer Grund, weshalb sie heute dran ist. Ein altes Skript allein belegt keine Klausurrelevanz.</p>
        <details className={styles.details}>
          <summary>Aufgaben und Fakten je Fach</summary>
          <ul>{exams.map((exam) => <li key={exam.date}><strong>{exam.name}:</strong> {exam.practice} Aufgaben und Verfahren, {exam.recall} Fakten und Abruf.</li>)}</ul>
        </details>
        <details className={styles.details}>
          <summary>Diagnose und Probeklausuren</summary>
          <p>In der Eingangswoche ist jeden Tag ein Fach vorgesehen: Montag Mathematik, Dienstag Netztechnik, Mittwoch Systemnahe Programmierung und Donnerstag Formale Sprachen. Freitag folgen erste Wiederholungen und die Auswertung.</p>
          <p>Unter 60 % beginne ich bei den Grundlagen, bei 60–79 % schließe ich gezielt Lücken, ab 80 % übe ich Anwendung und Transfer.</p>
          <p>Je Klausur plane ich eine frühe Teilsimulation, eine vollständige Simulation 7–10 Tage vorher und eine Generalprobe 3–5 Tage vorher. Drei Tage vor der Prüfung endet neuer Stoff; dann folgen Abruf, Fehlerkorrektur und Simulation.</p>
          <p>Simulationen entstehen aus belegten Quellen. Dauer, Hilfsmittel und endgültige Stoffgrenzen ergänze ich erst, wenn sie bestätigt sind.</p>
        </details>
        <details className={styles.details}>
          <summary>Die Phasen bis zur Klausur</summary>
          <ul>
            <li>28. September–2. Oktober: Eingangstests und erste Wiederholungen.</li>
            <li>5.–30. Oktober: Grundlagen und diagnostizierte Lücken, mit A- und B-Inhalten.</li>
            <li>2.–6. November: frühe Teilsimulationen und Fehlerlisten.</li>
            <li>9.–13. November: Vollsimulationen nach dem jeweiligen Prüfungsabstand, soweit belegte Aufgaben vorhanden sind; Generalprobe für Formale Sprachen.</li>
            <li>14.–26. November: Klausurstaffel mit Abruf, Fehlerkorrektur und Generalproben. Je Fach endet neuer Stoff drei Tage vor der Prüfung.</li>
          </ul>
        </details>
        <details className={styles.details}>
          <summary>Wenn eine Aufgabe noch nicht klappt</summary>
          <ol>
            <li>Beim ersten Fehler: Erklärung und ein geführtes Beispiel.</li>
            <li>Am Folgetag: eine neue Aufgabe desselben Typs ohne Hilfe.</li>
            <li>Beim zweiten Fehler: höhere Priorität.</li>
            <li>Beim dritten Fehler: zurück zu den Grundlagen, bei Bedarf mit der Reservestunde.</li>
          </ol>
          <p>Eine assistierte Lösung zählt nicht als Beherrschungsnachweis.</p>
        </details>
      </section>

      <section className={styles.section} aria-labelledby="routine-title">
        <h2 id="routine-title">Ein einfacher Einstieg</h2>
        <p>Der Morgen folgt derselben Reihenfolge: fällige Wiederholung, eine Haupteinheit, eine Abschlussaufgabe ohne Hilfe. Danach speichere ich das Ergebnis und bereite den nächsten Einstieg vor.</p>
        <h3>Wenn der Tag anders läuft</h3>
        <p>Ein Zehn-Minuten-Mindestblock hält den Einstieg klein. Fällt ein Block aus, verdopple ich den nächsten nicht. Vier von fünf Morgenblöcken gelten als erfolgreiche Woche. Liege ich zwei Wochen darunter, vereinfache ich das System.</p>
      </section>

      <section className={styles.section} aria-labelledby="tools-title">
        <h2 id="tools-title">Werkzeug und Quellen</h2>
        <p>Der Plan gibt die Richtung vor. Zum interaktiven Üben nutze ich meinen separaten <a className="home-link" href="https://lern-trainer.vercel.app">Lerntrainer</a>. Diese Übersicht übernimmt keinen persönlichen Lernstand daraus.</p>
        <p>Mein persönlicher Lernplan, Stand <time dateTime="2026-09-26">26. September 2026</time> — basierend auf meinen aktuellen Kursunterlagen. Kein offizieller Studien- oder Prüfungsplan.</p>
      </section>
    </article>
  );
}
