import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LoveAccess } from '@/components/LoveAccess';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { StickyNavActive } from '@/components/StickyNavActive';
import { Hero } from '@/components/sections/Hero';
import { Preview } from '@/components/sections/Preview';
import { About } from '@/components/sections/About';
import { Resume } from '@/components/sections/Resume';
import { MomentsCarousel } from '@/components/sections/MomentsCarousel';
import { CareerPreview } from '@/components/sections/CareerPreview';
import { Travel } from '@/components/sections/Travel';
import { Sport } from '@/components/sections/Sport';
import { Projects } from '@/components/sections/Projects';
import { LoveStory } from '@/components/sections/LoveStory';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="home" />
      <main id="main">
        <Hero />
        <Preview />
        <About />
        <Resume />
        <CareerPreview />
        <div className="px-6">
          <MomentsCarousel />
        </div>
        <Travel />
        <Sport />
        <Projects />
        <LoveStory />
        <Contact />
        <noscript>
          <p>
            Bitte aktivieren Sie JavaScript, um diese Website vollständig zu
            nutzen.
          </p>
        </noscript>
      </main>
      <SiteFooter />
      <StickyNavActive />
      <RevealOnScroll />
      <LoveAccess />
    </>
  );
}
