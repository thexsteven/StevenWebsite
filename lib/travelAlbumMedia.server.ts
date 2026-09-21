import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import { hasArchiveSession } from '@/lib/travelSession';

const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' };

export async function serveAlbumImage(request: Request, context: { params: Promise<{ id: string }> }, photos: { id: string; publicId: string }[]) {
  if (!(await hasArchiveSession())) return new Response(null, { status: 401, headers });
  const { id } = await context.params;
  const photo = photos.find((item) => item.id === id);
  if (!photo) return new Response(null, { status: 404, headers });
  const width = Number(new URL(request.url).searchParams.get('w') ?? 960);
  if (![480, 960, 1920].includes(width)) return new Response(null, { status: 400, headers });
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiSecret) return new Response(null, { status: 503, headers });
  try {
    const url = cloudinary.url(photo.publicId, {
      cloud_name: cloudName, api_secret: apiSecret, type: 'authenticated',
      secure: true, sign_url: true, format: 'jpg',
    });
    const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
    if (!response.ok) return new Response(null, { status: 502, headers });
    const body = await sharp(Buffer.from(await response.arrayBuffer()))
      .rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    return new Response(new Uint8Array(body), { headers: { ...headers, 'Content-Type': 'image/webp' } });
  } catch {
    return new Response(null, { status: 502, headers });
  }
}
