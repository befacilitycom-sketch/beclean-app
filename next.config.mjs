import withSerwistInit from '@serwist/next';
import { withPayload } from '@payloadcms/next/withPayload';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'standalone',

  // Skip TypeScript type-checking during build
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/api/media/**' },
      { protocol: 'https', hostname: 'beclean.befacility.com', pathname: '/api/media/**' },
      { protocol: 'https', hostname: 'strapi.befacility.com', pathname: '/uploads/**' },
    ],
  },
};

export default withPayload(withSerwist(nextConfig));
