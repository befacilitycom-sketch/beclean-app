import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import configPromise from '@payload-config';

// Disable static generation — Payload Admin requires a live DB connection
export const dynamic = 'force-dynamic';


import { importMap } from '../importMap.js';

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config: configPromise, params, searchParams, importMap });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config: configPromise, params, searchParams, importMap });

export default Page;
