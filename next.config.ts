import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  // Limit page extensions to TypeScript + MDX so legacy *.js / *.html files
  // in pages/ are NOT picked up as routes during the migration.
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // Die Projektdateien werden zur Laufzeit per `fs` gelesen. Next.js kann
  // ein dynamisch gelesenes Verzeichnis nicht selbst tracen – deshalb hier
  // explizit ins Deployment-Bundle aufnehmen.
  outputFileTracingIncludes: {
    '/': ['./content/projects/**/*'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dozdjb4fi/**',
      },
    ],
  },
};

export default withMDX(nextConfig);
