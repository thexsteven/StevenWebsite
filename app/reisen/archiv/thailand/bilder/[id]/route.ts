import { thailandPhotos } from '@/lib/thailandAlbum.server';
import { serveAlbumImage } from '@/lib/travelAlbumMedia.server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  return serveAlbumImage(request, context, thailandPhotos);
}
