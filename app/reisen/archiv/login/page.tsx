import type { Metadata } from 'next';

import { ArchiveLoginForm } from '@/components/travel/ArchiveLoginForm';
import { REDIRECT_PARAM, safeRedirectTarget } from '@/lib/travelAuth';

export const metadata: Metadata = {
  title: 'Reise-Archiv | Steven',
  description: 'Privater Bereich – Zugang mit Passwort.',
  // Ein Login-Formular gehört in keinen Suchindex.
  robots: { index: false, follow: false },
};

export default async function ArchivLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params[REDIRECT_PARAM];

  return (
    <ArchiveLoginForm
      redirectTo={safeRedirectTarget(Array.isArray(raw) ? raw[0] : raw)}
    />
  );
}
