'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';
import type { ProjectWithStats } from '@/lib/projects';
import { LanguageBar } from '@/components/projects/LanguageBar';
import { TechBadgeList } from '@/components/projects/TechBadge';
import {
  CARD_SHADOW_CLASSNAME,
  CARD_SHADOW_HOVER_CLASSNAME,
  CARD_SHELL_CLASSNAME,
  FEATURED_SPAN_CLASSNAME,
} from '@/components/projects/layout';

/**
 * Jede Karte beobachtet sich selbst. Der Schwellwert bezieht sich damit
 * auf ~600 px Kartenhöhe statt auf das mehrere tausend Pixel hohe Grid –
 * nur so löst der Reveal am Sektionsanfang aus und nicht erst weit
 * dahinter.
 */
const REVEAL_VIEWPORT = { once: true, amount: 0.15 } as const;

/** Startzustand des Reveals: leichter Fade plus Y-Offset. */
const HIDDEN = { opacity: 0, y: 24 } as const;

/** Endzustand – bei reduzierter Bewegung ohne Übergang direkt gesetzt. */
const SHOWN = { opacity: 1, y: 0 } as const;
const SHOWN_INSTANT = { ...SHOWN, transition: { duration: 0 } } as const;

/**
 * Staffelung von ~80 ms. Der Versatz richtet sich nach der Position
 * innerhalb der Dreierreihe, nicht nach dem Listenindex: Karten, die
 * gemeinsam ins Bild kommen, laufen dadurch nacheinander an, während
 * weiter unten liegende Karten nicht auf einen aufsummierten Delay
 * warten.
 */
function revealDelay(index: number): number {
  return (index % 3) * 0.08;
}

/** Textlinks in der Meta-Zeile – Navy, im Hover auf das DHBW-Rot. */
const LINK_CLASSNAME =
  'inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:text-accent focus-visible:underline';

// ——— Icons ————————————————————————————————————————————————————

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="currentColor"
    >
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function CommitIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="currentColor"
    >
      <path d="M10.5 7.75a2.5 2.5 0 0 0-4.9 0H1.75a.75.75 0 0 0 0 1.5H5.6a2.5 2.5 0 0 0 4.9 0h3.75a.75.75 0 0 0 0-1.5H10.5ZM8 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="currentColor"
    >
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.5-1.08-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.83-2.15-.09-.2-.36-1.02.07-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.43 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="currentColor"
    >
      <path d="M9.25 1.5a.75.75 0 0 0 0 1.5h2.19L6.22 8.22a.75.75 0 1 0 1.06 1.06L12.5 4.06v2.19a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-.75-.75h-4Z" />
      <path d="M3.5 3.75A2.25 2.25 0 0 0 1.25 6v6.5A2.25 2.25 0 0 0 3.5 14.75H10a2.25 2.25 0 0 0 2.25-2.25v-2.25a.75.75 0 0 0-1.5 0v2.25c0 .414-.336.75-.75.75H3.5a.75.75 0 0 1-.75-.75V6c0-.414.336-.75.75-.75h2.25a.75.75 0 0 0 0-1.5H3.5Z" />
    </svg>
  );
}

// ——— Screenshot ————————————————————————————————————————————————

/**
 * Kürzel aus dem Projekttitel – dient dem Fallback-Motiv, wenn noch kein
 * Screenshot hinterlegt ist.
 */
function initialsOf(title: string): string {
  return title
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

type ScreenshotProps = {
  src: string | null;
  title: string;
  featured: boolean;
};

function Screenshot({ src, title, featured }: ScreenshotProps) {
  const sizes = featured
    ? '(min-width: 1280px) 720px, (min-width: 768px) 100vw, 100vw'
    : '(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw';

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-[var(--radius-md)] bg-[rgba(15,47,95,0.06)]">
      {src ? (
        <Image
          src={src}
          alt={`Screenshot des Projekts ${title}`}
          width={1280}
          height={720}
          sizes={sizes}
          className={cn(
            'h-full w-full object-cover',
            'transition-transform duration-500 ease-out',
            'motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-within:scale-[1.03]',
          )}
        />
      ) : (
        // Kein leerer Platzhalter, sondern ein bewusst gestaltetes Motiv
        // aus dem bestehenden Navy-Verlauf.
        <div
          aria-hidden="true"
          className={cn(
            'flex h-full w-full items-center justify-center',
            'bg-gradient-to-br from-[rgba(15,47,95,0.12)] to-[rgba(15,47,95,0.03)]',
            'transition-transform duration-500 ease-out',
            'motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-within:scale-[1.03]',
          )}
        >
          <span className="font-serif text-4xl font-semibold tracking-tight text-[rgba(15,47,95,0.35)]">
            {initialsOf(title)}
          </span>
        </div>
      )}
    </div>
  );
}

// ——— Karte ————————————————————————————————————————————————————

type ProjectCardProps = {
  project: ProjectWithStats;
  /** Position im Grid – steuert nur den Versatz des Reveals. */
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { stats } = project;

  const headingId = `project-${project.slug}-title`;
  const repoUrl =
    stats?.repoUrl ?? (project.repo ? `https://github.com/${project.repo}` : null);

  // Ohne Live-Daten und ohne Links bliebe nur eine leere Trennlinie stehen.
  const hasLinks = Boolean(repoUrl || project.liveUrl);
  const hasMetaRow = Boolean(stats) || hasLinks;

  return (
    <motion.article
      aria-labelledby={headingId}
      initial={HIDDEN}
      // `useReducedMotion` ist beim Server-Rendering noch `false`, die Karte
      // geht also immer mit opacity 0 raus. Bei reduzierter Bewegung muss
      // sie deshalb aktiv sichtbar geschaltet werden – und zwar sofort und
      // unabhängig vom Scrollen, sonst bleibt sie für immer unsichtbar.
      animate={prefersReducedMotion ? SHOWN_INSTANT : undefined}
      whileInView={
        prefersReducedMotion
          ? undefined
          : {
              ...SHOWN,
              transition: {
                duration: 0.5,
                delay: revealDelay(index),
                ease: [0.22, 1, 0.36, 1],
              },
            }
      }
      viewport={REVEAL_VIEWPORT}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      // Gilt für den Hover; der Reveal bringt seine eigene Transition mit.
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'group',
        CARD_SHELL_CLASSNAME,
        CARD_SHADOW_CLASSNAME,
        CARD_SHADOW_HOVER_CLASSNAME,
        'transition-shadow duration-300',
        project.featured && FEATURED_SPAN_CLASSNAME,
      )}
    >
      <Screenshot
        src={project.screenshot}
        title={project.title}
        featured={project.featured}
      />

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <header className="flex flex-col gap-1">
          {project.featured && (
            <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-section-projects">
              Highlight
            </p>
          )}
          <h3 id={headingId} className="m-0 text-xl font-semibold text-ink">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="m-0 text-sm font-medium text-primary">
              {project.tagline}
            </p>
          )}
        </header>

        {project.description && (
          <p className="m-0 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        )}

        <TechBadgeList
          items={project.techStack}
          label={`Technologien in ${project.title}`}
        />

        {stats && stats.languages.length > 0 && (
          <LanguageBar languages={stats.languages} />
        )}

        {hasMetaRow && (
          <footer className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs text-muted">
            {stats && (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <StarIcon />
                  <span>
                    {stats.starsLabel}
                    <span className="sr-only">
                      {' '}
                      Sterne auf GitHub für {project.title}
                    </span>
                    <span aria-hidden="true"> Stars</span>
                  </span>
                </span>

                {stats.lastCommitRelative && stats.lastCommitIso && (
                  <span className="inline-flex items-center gap-1.5">
                    <CommitIcon />
                    <span>
                      <span className="sr-only">Letzter Commit </span>
                      <time
                        dateTime={stats.lastCommitIso}
                        title={stats.lastCommitAbsolute ?? undefined}
                      >
                        {stats.lastCommitRelative}
                      </time>
                    </span>
                  </span>
                )}
              </>
            )}

            {hasLinks && (
              <span
                className={cn(
                  'inline-flex flex-wrap items-center gap-x-4 gap-y-2',
                  stats && 'ml-auto',
                )}
              >
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={LINK_CLASSNAME}
                  >
                    <GitHubIcon />
                    Quellcode
                    <span className="sr-only">
                      {' '}
                      von {project.title} auf GitHub
                    </span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={LINK_CLASSNAME}
                  >
                    <ExternalLinkIcon />
                    Live ansehen
                    <span className="sr-only">: {project.title}</span>
                  </a>
                )}
              </span>
            )}
          </footer>
        )}
      </div>
    </motion.article>
  );
}
