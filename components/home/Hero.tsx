'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

import { HeroBadge } from '@/components/HeroBadge';

/**
 * Gestaffelter Eintritt: Eyebrow → Headline → Lead → CTAs.
 *
 * Die Staffelung ist hier kein Effekt, sondern die Lesereihenfolge – sie
 * führt den Blick einmalig durch die Hierarchie und ist nach ~600 ms vorbei.
 */
const GROUP_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const STATIC_VARIANTS: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const group = prefersReducedMotion ? STATIC_VARIANTS : GROUP_VARIANTS;
  const item = prefersReducedMotion ? STATIC_VARIANTS : ITEM_VARIANTS;

  return (
    <section id="top" className="home-hero" aria-labelledby="home-hero-title">
      <motion.div
        className="home-shell home-hero-shell"
        variants={group}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="home-hero-eyebrow" variants={item}>
          Angewandte Informatik · DHBW Mosbach · Praxis bei Emerson
        </motion.p>

        <motion.h1 id="home-hero-title" className="home-hero-title" variants={item}>
          Ich baue Werkzeuge, die Lernen schneller machen
          <span className="home-hero-dot" aria-hidden="true">
            .
          </span>
        </motion.h1>

        <motion.p className="home-hero-lead" variants={item}>
          Zuletzt: ein Klausurtrainer mit über 30 interaktiven Übungen und eine
          Prüfschicht für physikalische Plausibilität in einer
          Messdaten-Pipeline. React, Python, Next.js.
        </motion.p>

        <motion.div className="home-hero-actions" variants={item}>
          <a href="#projekte" className="home-btn home-btn--primary">
            Projekte ansehen
          </a>
          <a href="#werdegang" className="home-btn home-btn--ghost">
            Werdegang
          </a>
        </motion.div>
      </motion.div>

      <HeroBadge />
    </section>
  );
}
