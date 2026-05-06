import { SiteHeader } from '@/components/SiteHeader';

export default function CannesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader variant="travel-cannes" />
      <main id="main">{children}</main>
    </>
  );
}
