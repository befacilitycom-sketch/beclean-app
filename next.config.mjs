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

  // FIX: Explicitly define @payload-config alias for Turbopack.
  // withPayload() only configures this for Webpack. Since Next.js 16 defaults
  // to Turbopack for builds, instrumentation.ts fails to import the config
  // without this, causing the DB schema to never be pushed (users table missing).
  turbopack: {
    resolveAlias: {
      '@payload-config': './payload.config.ts',
    },
  },

  // Skip TypeScript type-checking during build
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/api/media/**' },
      { protocol: 'http', hostname: '192.168.1.137', port: '8090', pathname: '/api/media/**' },
      { protocol: 'https', hostname: 'beclean.befacility.com', pathname: '/api/media/**' },
    ],
  },
};

export default withPayload(withSerwist(nextConfig));
