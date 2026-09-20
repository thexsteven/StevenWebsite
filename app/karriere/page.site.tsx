import type { Metadata } from 'next';
import { StoryHeader } from '@/components/editorial/Story';
import { StudyPreview } from '@/components/editorial/StudyPreview';

export const metadata: Metadata = { title: 'Studium und Werdegang' };

export default function Karriere() {
  return <><StoryHeader title="Lernen. Anwenden. Weiterdenken." intro="Mein duales Studium an der DHBW Mosbach verbindet Theorie- und Praxisphasen. Hier findest du die Themen meiner Module, Lernprojekte und Einblicke in meine Arbeitsweise." back="/" backLabel="Startseite" /><section className="wrap" aria-labelledby="phases-title" data-sc-act="flow"><h2 id="phases-title" className="study-section-title">Theorie- und Praxissemester</h2><StudyPreview /></section><div className="prose"><h2>Von der Hochschule in die Praxis.</h2><p>Mein Praxispartner ist ein international tätiges Technologieunternehmen in der Automatisierungstechnik. Hier erzähle ich von meinem eigenen Lernen. Namen, Projektinhalte, Kunden und Interna des Unternehmens bleiben vertraulich.</p><p>Die Modulübersichten geben einen Einblick in meine Lernnotizen. Sie sind kein vollständiges Modulhandbuch. Über die ausgewählten Notion-Links kannst du einzelne Themen weiterverfolgen.</p></div></>;
}
