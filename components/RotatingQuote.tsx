'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const QUOTES = [
  'Pressure shapes diamonds · Stay hard',
  'Trust the universe',
  'Fall in love with the process',
  'The obstacle is the way',
  'Earn it every day',
  'Silence speaks louder than excuses',
  'Build in silence, let results make noise',
  'Comfort is the enemy of growth',
  'Be relentless or be forgotten',
];

const INTERVAL = 5000;

export function RotatingQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rotating-quote">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="eyebrow"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {QUOTES[index]}
        </motion.p>
      </AnimatePresence>
      <motion.div
        key={`bar-${index}`}
        className="rotating-quote__bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}
