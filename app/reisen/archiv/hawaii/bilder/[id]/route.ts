import { hawaiiPhotos } from '@/lib/hawaiiAlbum.server';
import { serveAlbumImage } from '@/lib/travelAlbumMedia.server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  return serveAlbumImage(request, context, hawaiiPhotos);
}
