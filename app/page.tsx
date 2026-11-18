import type { Metadata } from 'next';

import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StickyNavActive } from '@/components/StickyNavActive';
import { Hero } from '@/components/home/Hero';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Werdegang } from '@/components/home/Werdegang';
import { BeyondCode } from '@/components/home/BeyondCode';

export const metadata: Metadata = {
  title: 'Steven Braun · Vom Maschinenbau zur Informatik',
  description: 'Mein Weg vom Industriemechaniker zum Informatikstudenten an der DHBW Mosbach. Mit Lerntrainern aus meiner Klausurvorbereitung und Einblicken ins Studium.',
  other: { 'page-type': 'service', 'site-kind': 'other' },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="home" />
      <main id="main" className="home-main">
        <Hero />
        <FeaturedProjects />
        <Werdegang />
        <BeyondCode />
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
