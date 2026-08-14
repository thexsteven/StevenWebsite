import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
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
        <div className="moments-wrap">
          <MomentsCarousel />
        </div>
        <Travel />
        <Sport />
        <Projects />
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
    </>
  );
}
