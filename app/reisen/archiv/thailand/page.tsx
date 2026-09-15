import type { Metadata } from 'next';
import { TravelAlbum } from '@/components/travel/TravelAlbum';
import { getThailandAlbum } from '@/lib/thailandAlbum.server';
import { requireArchiveSession } from '@/lib/travelSession';
export const metadata: Metadata = {
  title: 'Thailand · Mein Fotoalbum | Steven',
  robots: { index: false, follow: false },
};
export default async function ThailandAlbumPage() {
  await requireArchiveSession('/reisen/archiv/thailand');
  return <TravelAlbum album={getThailandAlbum()} />;
}
