import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { BodyClass } from '@/components/BodyClass';

export const metadata: Metadata = {
  title: 'Privat · Unsere Geschichte',
  robots: { index: false, follow: false },
};

export default function LoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BodyClass className="story-body" />
      <SiteHeader variant="love" />
      <main id="main">{children}</main>
      <SiteFooter variant="love" />
    </>
  );
}
