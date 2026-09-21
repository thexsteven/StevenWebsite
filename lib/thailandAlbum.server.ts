import 'server-only';
import source from '@/content/albums/thailand.json';
import type { TravelAlbumData } from '@/lib/travelAlbum';
export const thailandPhotos = source.sections.flatMap((section) => section.photos);
export function getThailandAlbum(): TravelAlbumData {
  return {
    ...source,
    sections: source.sections.map((section) => ({
      ...section,
      photos: section.photos.map(({ publicId: _publicId, ...photo }) => photo),
    })),
  };
}
