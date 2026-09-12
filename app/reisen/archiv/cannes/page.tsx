import type { Metadata } from 'next';
import { TravelAlbum } from '@/components/travel/TravelAlbum';
import { getCannesAlbum } from '@/lib/cannesAlbum.server';
import { requireArchiveSession } from '@/lib/travelSession';
export const metadata: Metadata = {
  title: 'Konstanz nach Cannes · Mein Fotoalbum | Steven',
  robots: { index: false, follow: false },
};
export default async function CannesAlbumPage() {
  await requireArchiveSession('/reisen/archiv/cannes');
  return <TravelAlbum album={getCannesAlbum()} />;
}
