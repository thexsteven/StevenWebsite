import 'server-only';
import source from '@/content/albums/cannes.json';
import type { TravelAlbumData } from '@/lib/travelAlbum';
export const cannesPhotos = source.sections.flatMap((section) => section.photos);
export function getCannesAlbum(): TravelAlbumData {
  return {
    ...source,
    sections: source.sections.map((section) => ({
      ...section,
      photos: section.photos.map(({ publicId: _publicId, ...photo }) => photo),
    })),
  };
}
