'use client';

import { useEffect, useRef } from 'react';

export type Skill = {
  title: string;
  desc: string;
  tags: string[];
};

const SCROLL_SPEED = 0.4;

export function SkillsTrack({ skills }: { skills: Skill[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;

    let scrollPos = 0;
    let paused = false;
    let rafId = 0;
    const loopPoint = track.scrollWidth / 2;

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    const step = () => {
      if (!paused) {
        scrollPos += SCROLL_SPEED;
        if (scrollPos >= loopPoint) scrollPos = 0;
        container.scrollLeft = scrollPos;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="section-body">
      <div ref={trackRef} className="skills-track">
        {skills.map((skill) => (
          <SkillCard key={skill.title} skill={skill} />
        ))}
        {skills.map((skill) => (
          <SkillCard
            key={`clone-${skill.title}`}
            skill={skill}
            ariaHidden
          />
        ))}
      </div>
    </div>
  );
}

function SkillCard({
  skill,
  ariaHidden = false,
}: {
  skill: Skill;
  ariaHidden?: boolean;
}) {
  return (
    <div className="card" {...(ariaHidden ? { 'aria-hidden': 'true' } : {})}>
      <h3>{skill.title}</h3>
      <p>{skill.desc}</p>
      <div className="tags">
        {skill.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
