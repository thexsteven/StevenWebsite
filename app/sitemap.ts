import type { MetadataRoute } from 'next';

const routes = [
  '',
  '/projekte',
  '/karriere',
  '/karriere/klausurvorbereitung-winter-2026',
  '/karriere/semester-1',
  '/karriere/semester-2',
  '/karriere/praxis-1',
  '/sport',
  '/motivation',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://braun-steven.de${route}`,
    changeFrequency: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : 0.7,
  }));
}
