import { SiteHeader } from '@/components/SiteHeader';

export default function HawaiiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader variant="travel-hawaii" />
      <main id="main">{children}</main>
    </>
  );
}
