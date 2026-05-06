import { Breadcrumb } from '@/components/Breadcrumb';
import { LoveGuard } from '@/components/LoveGuard';
import { LoveStoryPager } from '@/components/LoveStoryPager';

export default function LoveEpilog() {
  return (
    <section className="story-detail" aria-label="Privater Inhalt">
      <Breadcrumb href="/#love-story" label="← Zurück zur Übersicht" />
      <LoveGuard chapter="epilog" />
      <LoveStoryPager currentSlug="epilog" />
    </section>
  );
}
