import { NextRequest, NextResponse } from 'next/server';

/**
 * API to save domain credentials securely.
 * Persists encrypted (using server DEFAULT_PASSPHRASE or SECURE_PASSPHRASE env) to Postgres via SecureStore.
 * Real username/password are looked up and injected ONLY inside the operator at Playwright execution time — never sent to any model.
 *
 * IMPORTANT: We use dynamic import for secure-store to avoid top-level module
 * evaluation errors (e.g. Prisma client issues) from breaking the route handler.
 * This ensures we always return JSON, never HTML error pages.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { domain, username, password } = body;

    if (!domain || !username || !password) {
      return NextResponse.json({ error: 'domain, username and password required' }, { status: 400 });
    }

    // Dynamic import so any Prisma / DB setup errors are caught here and turned into JSON.
    const { getSecureStore } = await import('@/lib/secure-store');

    // Best-effort connect (non-fatal)
    try {
      const { default: prisma } = await import('@/lib/prisma');
      await prisma.$connect();
    } catch (connectErr) {
      console.warn('[secure/credentials] Prisma connect warning:', connectErr);
    }

    const store = getSecureStore();
    await store.setCredential(domain, { username, password });

    // If a task is currently paused waiting for these credentials, unblock it.
    try {
      const { getBrowserOperator } = await import('@/lib/operators/BrowserOperator');
      const op = getBrowserOperator();
      if (op.getCredentialRequired()?.domain) {
        op.clearCredentialRequired();
      }
    } catch { /* operator may not be initialized */ }

    return NextResponse.json({ ok: true, message: `Credentials for ${domain} saved.` });
  } catch (e: any) {
    console.error('[secure/credentials] Save failed:', e);
    return NextResponse.json({ error: e.message || 'Failed to save credentials' }, { status: 500 });
  }
}
