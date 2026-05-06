import { SectionHead } from '@/components/SectionHead';
import { SkillsTrack, type Skill } from '@/components/SkillsTrack';

const skills: Skill[] = [
  {
    title: 'Technisch-analytisch',
    desc: 'Informatik, Maschinenbau, Technikverständnis',
    tags: ['#Logik', 'Systemdenken', 'Problemlösung'],
  },
  {
    title: 'Software & Web',
    desc: 'HTML5, CSS3, JavaScript (Vanilla)',
    tags: ['Semantik', 'Flexbox', 'Grid'],
  },
  {
    title: 'Tools & Workflow',
    desc: 'Git, GitHub, VS Code, Notion',
    tags: ['Branches', 'Commits', 'Pages'],
  },
  {
    title: 'Sport & Performance',
    desc: 'Ausdauer, Routinen, mentale Stärke',
    tags: ['Disziplin', 'Fokus', 'Recovery'],
  },
  {
    title: 'Technikbegeisterung',
    desc: 'Neugier, Tüfteln, neue Tools testen',
    tags: ['Gadgets', 'Innovation', 'Lernen'],
  },
  {
    title: 'Soft Skills',
    desc: 'Kommunikation, Teamwork, Verlässlichkeit',
    tags: ['Team', 'Ownership', 'Wachstum'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="skills" aria-labelledby="skills-title">
      <SectionHead
        kicker="Skills"
        titleId="skills-title"
        title="Fähigkeiten, die mich ausmachen."
        intro="Technik, Organisation und Mindset – strukturiert nach Kategorien."
      />
      <SkillsTrack skills={skills} />
    </section>
  );
}
