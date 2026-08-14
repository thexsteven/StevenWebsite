import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyNavActive } from '@/components/StickyNavActive';
import { Hero } from '@/components/home/Hero';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Werdegang } from '@/components/home/Werdegang';
import { BeyondCode } from '@/components/home/BeyondCode';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="home" />
      <main id="main" className="home-main">
        <Hero />
        <FeaturedProjects />
        <Werdegang />
        <BeyondCode />
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
    </>
  );
}
