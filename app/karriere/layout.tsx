import { SiteHeader } from '@/components/SiteHeader';

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader variant="career" />
      <main id="main">{children}</main>
    </>
  );
}
