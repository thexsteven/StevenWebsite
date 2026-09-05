import type { Metadata } from 'next';
import Link from 'next/link';
import { StoryHeader } from '@/components/editorial/Story';
import { phases } from '@/lib/editorial/chapters';

export const metadata: Metadata = { title: 'Studium und Werdegang' };

export default function Karriere() {
  return <><StoryHeader title="Lernen. Anwenden. Weiterdenken." intro="Mein duales Studium an der DHBW Mosbach verbindet Theorie- und Praxisphasen. Hier ist Platz für die Rückblicke auf beide Seiten." back="/" backLabel="Startseite" /><section className="wrap" data-sc-act="flow"><div className="phase-list">{phases.map((phase) => <Link href={`/karriere/${phase.slug}`} key={phase.slug}><span>{phase.kind}</span><h2>{phase.title}</h2><span aria-hidden="true">↗</span></Link>)}</div></section><div className="prose"><h2>Von der Hochschule in die Praxis.</h2><p>Mein Praxispartner ist ein international tätiges Technologieunternehmen in der Automatisierungstechnik. Hier erzähle ich von meinem eigenen Lernen. Namen, Projektinhalte, Kunden und Interna des Unternehmens bleiben vertraulich.</p><p>Neben dem Studium baue ich Software und KI-Systeme. Die Website selbst zeigt einen Teil dieser Arbeit.</p></div></>;
}
