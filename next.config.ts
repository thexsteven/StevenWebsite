import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  // Limit page extensions to TypeScript + MDX so legacy *.js / *.html files
  // in pages/ are NOT picked up as routes during the migration.
  pageExtensions: ['ts', 'tsx', 'mdx'],
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
