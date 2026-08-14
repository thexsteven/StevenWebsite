'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

import type { ProjectWithStats } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { PROJECT_GRID_CLASSNAME } from '@/components/projects/layout';

/** Staffelung der Karten: ~80 ms Versatz, nur beim ersten Sichtbarwerden. */
const GRID_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const STATIC_GRID_VARIANTS: Variants = {
  hidden: {},
  visible: {},
};

type ProjectGridProps = {
  projects: readonly ProjectWithStats[];
};

/**
 * Responsives Grid der Projektkarten. Übernimmt die Orchestrierung des
 * Scroll-Reveals; die einzelnen Karten liefern ihre eigenen Varianten.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  const prefersReducedMotion = useReducedMotion();

  if (projects.length === 0) return null;

  return (
    <motion.div
      className={PROJECT_GRID_CLASSNAME}
      variants={prefersReducedMotion ? STATIC_GRID_VARIANTS : GRID_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}
