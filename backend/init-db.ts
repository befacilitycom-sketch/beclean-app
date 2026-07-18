/**
 * DB Initialization Script — runs via tsx BEFORE next start
 * 
 * This guarantees Payload pushes the schema to PostgreSQL before
 * the HTTP server accepts any request. Completely eliminates the
 * "relation users does not exist" race condition.
 */
import configPromise from './payload.config.js';
import { getPayload } from 'payload';

console.log('[init-db] Connecting to PostgreSQL and pushing Payload schema...');

let retries = 10;
while (retries > 0) {
  try {
    await getPayload({ config: configPromise });
    console.log('[init-db] ✅ Database schema ready!');
    process.exit(0);
  } catch (err) {
    retries--;
    const msg = err?.message || String(err);
    console.error(`[init-db] ❌ Attempt ${10 - retries}/10 failed: ${msg}`);
    if (retries > 0) {
      console.log('[init-db] Retrying in 3s...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}
console.error('[init-db] 🚨 Could not initialize DB after 10 attempts. Aborting.');
process.exit(1);
