import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
  GRAPHQL_POST,
  GRAPHQL_PLAYGROUND_GET,
} from '@payloadcms/next/routes';

import configPromise from '@payload-config';

// Disable static generation — Payload API requires a live DB connection at runtime
export const dynamic = 'force-dynamic';


export const GET = REST_GET;
export const POST = REST_POST;
export const DELETE = REST_DELETE;
export const PATCH = REST_PATCH;
export const PUT = REST_PUT;
export const OPTIONS = REST_OPTIONS;

// GraphQL support
export { GRAPHQL_POST, GRAPHQL_PLAYGROUND_GET };
