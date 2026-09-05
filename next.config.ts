import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  // Only the rebuild participates in routing. Legacy areas stay on disk.
  pageExtensions: ['site.tsx', 'site.mdx'],
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
