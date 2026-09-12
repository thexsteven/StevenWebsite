import 'server-only';
import source from '@/content/albums/hawaii.json';

export const hawaiiPhotos = source.sections.flatMap((section) => section.photos);

// Cloudinary identifiers stay on the server; the browser receives session-protected URLs.
export function getHawaiiAlbum() {
  return {
    ...source,
    slug: 'hawaii',
    locationLabel: 'Oʻahu & Big Island · März – April 2025',
    durationLabel: '6 Wochen',
    coverCaption: 'Hawaii, wie ich es in Erinnerung habe.',
    sections: source.sections.map((section) => ({
      ...section,
      photos: section.photos.map(({ publicId: _publicId, ...photo }) => photo),
    })),
  };
}
