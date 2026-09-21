import { describe, expect, it, vi } from 'vitest';
import { getThailandAlbum, thailandPhotos } from '@/lib/thailandAlbum.server';
import { GET } from '@/app/reisen/archiv/thailand/bilder/[id]/route';
import { hasArchiveSession } from '@/lib/travelSession';

vi.mock('@/lib/travelSession', () => ({ hasArchiveSession: vi.fn() }));

describe('Thailand album', () => {
  it('includes the 68 selected photos once across the four trip stops without exposing source IDs', () => {
    const album = getThailandAlbum();
    expect(album.sections.map((section) => section.id)).toEqual(['bangkok', 'koh-phangan', 'koh-samui', 'phuket']);
    expect(album.sections.map((section) => section.photos.length)).toEqual([20, 31, 6, 11]);
    expect(new Set(thailandPhotos.map((photo) => photo.publicId)).size).toBe(68);
    expect(new Set(thailandPhotos.map((photo) => photo.id)).size).toBe(68);
    expect(thailandPhotos.some((photo) => photo.id === album.cover)).toBe(true);
    expect(thailandPhotos.every((photo) => photo.alt && photo.caption && photo.width > 0 && photo.height > 0)).toBe(true);
    expect(JSON.stringify(album)).not.toContain('publicId');
    expect(JSON.stringify(album)).not.toContain('cloudinary.com');
  });

  it('requires a session and rejects foreign photos and unsupported sizes', async () => {
    const request = new Request('https://example.com/reisen/archiv/thailand/bilder/thailand-01');
    vi.mocked(hasArchiveSession).mockResolvedValue(false);
    const denied = await GET(request, { params: Promise.resolve({ id: 'thailand-01' }) });
    expect(denied.status).toBe(401);
    expect(denied.headers.get('Cache-Control')).toBe('private, no-store');
    vi.mocked(hasArchiveSession).mockResolvedValue(true);
    for (const id of ['hawaii-01', 'cannes-01', 'thailand-21', 'thailand-70']) {
      expect((await GET(request, { params: Promise.resolve({ id }) })).status).toBe(404);
    }
    expect((await GET(new Request(`${request.url}?w=9999`), { params: Promise.resolve({ id: 'thailand-01' }) })).status).toBe(400);
  });
});
