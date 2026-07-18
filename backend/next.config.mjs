import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No standalone — full node_modules kept so tsx can run init-db.ts at startup
  typescript: { ignoreBuildErrors: true },
  turbopack: {
    resolveAlias: {
      '@payload-config': './payload.config.ts',
    },
  },
  // CORS headers for API access from the frontend container
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
