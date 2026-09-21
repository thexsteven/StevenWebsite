import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export default function VenedigLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader variant="sub" />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
