import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getHawaiiAlbum, hawaiiPhotos } from '@/lib/hawaiiAlbum.server';
import { GET } from '@/app/reisen/archiv/hawaii/bilder/[id]/route';
import { hasArchiveSession } from '@/lib/travelSession';

vi.mock('@/lib/travelSession', () => ({ hasArchiveSession: vi.fn() }));

describe('Hawaii album', () => {
  it('contains all 41 distinct photos in at most five nonempty chapters', () => {
    const album = getHawaiiAlbum();
    expect(album.sections.length).toBeLessThanOrEqual(5);
    expect(album.sections.every((section) => section.photos.length > 0)).toBe(true);
    expect(hawaiiPhotos).toHaveLength(41);
    expect(new Set(hawaiiPhotos.map((photo) => photo.publicId)).size).toBe(41);
    expect(hawaiiPhotos.every((photo) => photo.caption && photo.alt)).toBe(true);
    expect(JSON.stringify(album)).not.toContain('publicId');
  });
  it('keeps the two Punaluʻu photos together', () => {
    const ids = getHawaiiAlbum().sections.find((section) => section.id === 'big-island')!.photos.map((photo) => photo.id);
    expect(Math.abs(ids.indexOf('hawaii-32') - ids.indexOf('hawaii-33'))).toBe(1);
    expect(ids).not.toContain('hawaii-40');
  });
});

describe('private album media', () => {
  beforeEach(() => { vi.mocked(hasArchiveSession).mockReset(); });
  it('rejects requests without a session and disables caching', async () => {
    vi.mocked(hasArchiveSession).mockResolvedValue(false);
    const result = await GET(new Request('https://example.com/reisen/archiv/hawaii/bilder/hawaii-01'), { params: Promise.resolve({ id: 'hawaii-01' }) });
    expect(result.status).toBe(401);
    expect(result.headers.get('Cache-Control')).toBe('private, no-store');
  });
  it('rejects unknown assets and arbitrary transformations', async () => {
    vi.mocked(hasArchiveSession).mockResolvedValue(true);
    expect((await GET(new Request('https://example.com/?w=960'), { params: Promise.resolve({ id: 'unknown' }) })).status).toBe(404);
    expect((await GET(new Request('https://example.com/?w=99999'), { params: Promise.resolve({ id: 'hawaii-01' }) })).status).toBe(400);
  });
});
