import Link from 'next/link';

import gallery from '@/content/projects/lern-trainer-galerie.json';
import { TrainerPreview } from './TrainerPreview';
import styles from './FeaturedProjects.module.css';

export function FeaturedProjects() {
  return (
    <section
      id="projekte"
      className={`home-section ${styles.project}`}
      aria-labelledby="home-projekte-title"
    >
      <div className="wrap">
        <header className={styles.intro}>
          <h2 id="home-projekte-title" className={styles.title}>
            Wie findet Dijkstra den kürzesten Weg?
          </h2>
          <div>
            <p className={styles.copy}>
              Für meine Klausuren habe ich über 30 interaktive Übungen gebaut.
              Im <a className="home-link" href={new URL('/trainer/dijkstra', gallery.liveUrl).href}>Dijkstra-Trainer</a> gehst du den Graphen Schritt für Schritt durch
              und siehst, welcher Knoten als Nächstes an der Reihe ist.
            </p>
            <div className={styles.actions}>
              <a href={gallery.liveUrl} className="home-btn home-btn--primary">
                Lerntrainer ausprobieren
              </a>
              <Link href="/projekte" className={`home-link ${styles.all}`}>
                Alle Projekte <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </header>
        <TrainerPreview src={gallery.screenshot} />
      </div>
    </section>
  );
}
