import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './src/collections/Users';
import { Media } from './src/collections/Media';
import { Services } from './src/collections/Services';
import { Products } from './src/collections/Products';
import { BlogPosts } from './src/collections/BlogPosts';
import { Testimonials } from './src/collections/Testimonials';
import { SiteSettings } from './src/globals/SiteSettings';
import { HomePage } from './src/globals/HomePage';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
  },
  cors: '*', // Autorise toutes les origines pour le dev/VM
  csrf: ['http://192.168.1.137:8090', 'https://beclean.befacility.com', 'http://localhost:3000', 'http://localhost:8090'],
  globals: [
    SiteSettings,
    HomePage,
  ],
  collections: [
    Users,
    Media,
    Services,
    Products,
    BlogPosts,
    Testimonials,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'a_secret_fallback_key_for_dev_mode',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres@localhost:5432/beclean_payload',
    },
    push: true, // Forces schema creation even in production mode
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
