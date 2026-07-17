/**
 * Next.js Instrumentation — Runs once before the server accepts any requests.
 * 
 * This is the CORRECT way to ensure Payload CMS initializes the database schema
 * BEFORE any HTTP request arrives. Without this, the race condition causes:
 *   → ERROR: relation "users" does not exist
 * 
 * In Next.js 15+, this file is automatically loaded — no config needed.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[Instrumentation] 🚀 Booting Next.js server — initializing Payload CMS...');

    let retries = 5;
    while (retries > 0) {
      try {
        const { getPayload } = await import('payload');
        const { default: configPromise } = await import('@payload-config');

        await getPayload({ config: configPromise });
        console.log('[Instrumentation] ✅ Database initialized and schema pushed successfully!');
        return; // success — exit the loop
      } catch (err: any) {
        retries--;
        console.error(`[Instrumentation] ❌ DB init failed (${5 - retries}/5 attempts):`, err?.message || err);
        if (retries > 0) {
          console.log(`[Instrumentation] ⏳ Retrying in 3 seconds...`);
          await new Promise((r) => setTimeout(r, 3000));
        } else {
          console.error('[Instrumentation] 🚨 Could not initialize DB after 5 attempts. Routes may fail!');
        }
      }
    }
  }
}
