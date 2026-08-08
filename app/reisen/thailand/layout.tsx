import { SiteHeader } from '@/components/SiteHeader';

export default function ThailandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader variant="travel-thailand" />
      <main id="main">{children}</main>
    </>
  );
}
