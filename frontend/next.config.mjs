import withSerwistInit from '@serwist/next';

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
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/api/media/**' },
      { protocol: 'http', hostname: 'beclean-backend', port: '3000', pathname: '/api/media/**' },
      { protocol: 'http', hostname: '192.168.1.137', port: '8091', pathname: '/api/media/**' },
      { protocol: 'https', hostname: 'beclean.befacility.com', pathname: '/api/media/**' },
    ],
  },
};

export default withSerwist(nextConfig);
