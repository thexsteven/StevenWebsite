import { describe, expect, it, vi } from 'vitest';
import { getCannesAlbum, cannesPhotos } from '@/lib/cannesAlbum.server';
import sources from '@/content/albums/cannes-map-sources.json';
import { GET } from '@/app/reisen/archiv/cannes/bilder/[id]/route';
import { hasArchiveSession } from '@/lib/travelSession';

vi.mock('@/lib/travelSession', () => ({ hasArchiveSession: vi.fn() }));

describe('Konstanz–Cannes album', () => {
  it('includes each supplied photo exactly once in five chapters', () => {
    const album = getCannesAlbum();
    expect(album.sections).toHaveLength(5);
    expect(cannesPhotos).toHaveLength(76);
    expect(new Set(cannesPhotos.map((photo) => photo.publicId)).size).toBe(76);
    expect(cannesPhotos.every((photo) => photo.alt && photo.caption)).toBe(true);
    expect(cannesPhotos.some((photo) => photo.id === album.cover)).toBe(true);
    expect(JSON.stringify(album)).not.toContain('publicId');
  });

  it('maps only photos from their own chapter using recorded GPS coordinates', () => {
    const sections = getCannesAlbum().sections.filter((section) => section.mapStops);
    expect(sections).toHaveLength(3);
    for (const section of sections) {
      for (const stop of section.mapStops!) {
        expect(section.photos.some((photo) => photo.id === stop.photoId)).toBe(true);
        const source = sources.find((item) => item.photoId === stop.photoId)!;
        expect(source).toBeDefined();
        const latitude = source.GPSLatitude.match(/[\d.]+/g)!.map(Number);
        const longitude = source.GPSLongitude.match(/[\d.]+/g)!.map(Number);
        expect(stop.lat).toBeCloseTo(latitude[0] + latitude[1] / 60 + latitude[2] / 3600, 4);
        expect(stop.lon).toBeCloseTo(longitude[0] + longitude[1] / 60 + longitude[2] / 3600, 4);
      }
    }
  });

  it('omits private homes and gardens from the map', () => {
    const ids = getCannesAlbum().sections.flatMap((section) => section.mapStops ?? []).map((stop) => stop.photoId);
    for (const id of ['cannes-74', 'cannes-15', 'cannes-02', 'cannes-05', 'cannes-11', 'cannes-75', 'cannes-76']) {
      expect(ids).not.toContain(id);
    }
  });

  it('protects Cannes media and cannot serve Hawaii assets via the Cannes endpoint', async () => {
    const request = new Request('https://example.com/reisen/archiv/cannes/bilder/cannes-01');
    vi.mocked(hasArchiveSession).mockResolvedValue(false);
    const denied = await GET(request, { params: Promise.resolve({ id: 'cannes-01' }) });
    expect(denied.status).toBe(401);
    expect(denied.headers.get('Cache-Control')).toBe('private, no-store');
    vi.mocked(hasArchiveSession).mockResolvedValue(true);
    expect((await GET(request, { params: Promise.resolve({ id: 'hawaii-01' }) })).status).toBe(404);
  });
});
