import type { Metadata } from 'next';
import { TravelAlbum } from '@/components/travel/TravelAlbum';
import { getHawaiiAlbum } from '@/lib/hawaiiAlbum.server';
import { requireArchiveSession } from '@/lib/travelSession';

export const metadata: Metadata = {
  title: 'Hawaii · Mein Fotoalbum | Steven',
  robots: { index: false, follow: false },
};

export default async function HawaiiAlbumPage() {
  await requireArchiveSession('/reisen/archiv/hawaii');
  return <TravelAlbum album={getHawaiiAlbum()} />;
}
