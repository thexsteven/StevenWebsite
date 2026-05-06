import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { StoryDetailHeader } from '@/components/StoryDetailHeader';
import { StoryPagination } from '@/components/StoryPagination';

export const metadata: Metadata = {
  title: 'Theorie-Semester 2 | Steven',
  description:
    'Mein zweites Theorie-Semester an der DHBW Mosbach – Inhalte, Beispiele und Rückblicke. Wird im Laufe des Semesters gefüllt.',
};

const placeholderModules = [1, 2, 3, 4, 5, 6, 7];

export default function Semester2() {
  return (
    <section className="story-detail" aria-labelledby="summary-title">
      <Breadcrumb href="/karriere" label="← Zurück zur Karriere‑Übersicht" />
      <StoryDetailHeader
        kicker="Theoriephase · DHBW Mosbach"
        titleId="summary-title"
        title="Theorie-Semester 2"
        meta="März 2026 – Juli 2026 · Informatik"
        summary="Wird ab März 2026 mit Inhalten gefüllt. Pro Modul folgen Kerninhalte, ein Beispiel, praktische Anwendung, verwandte Projekte und ein Notion-Deeplink für die volle Tiefe."
      />

      <nav aria-label="Module im Überblick">
        <div className="module-nav-grid">
          {placeholderModules.map((n) => (
            <span
              key={n}
              className="module-nav-card is-placeholder"
              aria-disabled="true"
            >
              <span className="module-nav-icon" aria-hidden="true">
                ·
              </span>
              <span>Modul {n}</span>
              <span className="module-nav-label">folgt</span>
            </span>
          ))}
        </div>
      </nav>

      <article
        className="module-section is-placeholder"
        aria-label="Module folgen"
      >
        <header className="module-section-header">
          <span className="module-icon" aria-hidden="true">
            ·
          </span>
          <span className="module-badge">in Arbeit</span>
          <h2>Module folgen ab März 2026</h2>
        </header>
        <p className="module-placeholder-note">
          Dieses Semester wird im Laufe der Theoriephase gefüllt. Sobald ein
          Modul abgeschlossen ist, wird es hier ergänzt.
        </p>
      </article>

      <StoryPagination
        actions={[
          { href: '/karriere', label: 'Zur Übersicht', ghost: true },
          { href: '/karriere/semester-1', label: 'Semester 1 ansehen' },
        ]}
      />
    </section>
  );
}
