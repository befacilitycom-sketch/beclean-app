export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[Instrumentation] Booting Next.js server...');
    console.log('[Instrumentation] Initializing Payload CMS and pushing database schema...');
    
    try {
      // Dynamically import payload to avoid Edge runtime issues
      const { getPayload } = await import('payload');
      const configPromise = (await import('@payload-config')).default;
      
      // Initialize Payload BEFORE the server accepts HTTP requests.
      // This completely solves the Drizzle Schema Push race condition 
      // where incoming requests hit an uninitialized database and crash.
      await getPayload({ config: configPromise });
      
      console.log('[Instrumentation] Database initialized and schema pushed successfully!');
    } catch (err) {
      console.error('[Instrumentation] Failed to initialize Payload Database:', err);
    }
  }
}
