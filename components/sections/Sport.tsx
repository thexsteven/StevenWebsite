import { SectionHead } from '@/components/SectionHead';

const tiles = [
  { title: 'Ausdauer', desc: 'Laufen, Radfahren, tägliche Bewegung.' },
  {
    title: 'Kraft & Training',
    desc: 'Strukturiertes Workout, kontinuierliche Progression.',
  },
  { title: 'Mindset', desc: 'Disziplin, mentale Stärke, Recovery.' },
];

export function Sport() {
  return (
    <section id="sport" className="sport" aria-labelledby="sport-title">
      <SectionHead
        kicker="Sport"
        titleId="sport-title"
        title="Energie, Motivation, Fokus."
        intro="Dynamische Inhalte, die Disziplin und Fortschritt zeigen."
      />
      <div className="section-body sport-strip">
        {tiles.map((tile) => (
          <div key={tile.title} className="sport-tile">
            <h3 className="sport-tile-title">{tile.title}</h3>
            <p className="sport-tile-desc">{tile.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
