import { Breadcrumb } from '@/components/Breadcrumb';
import { LoveGuard } from '@/components/LoveGuard';
import { LoveStoryPager } from '@/components/LoveStoryPager';

export default function LoveKapitel02() {
  return (
    <section className="story-detail" aria-label="Privater Inhalt">
      <Breadcrumb href="/#love-story" label="← Zurück zur Übersicht" />
      <LoveGuard chapter="kapitel-02" />
      <LoveStoryPager currentSlug="kapitel-02" />
    </section>
  );
}
