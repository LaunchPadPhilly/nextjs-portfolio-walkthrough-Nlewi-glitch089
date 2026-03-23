import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, verifyAdminCookie } from './lib/adminAuth'

// Protect sensitive write APIs. Public GET access is allowed for client-side features.
const WRITE_PROTECTED_PREFIXES = ['/api/context', '/api/upload-avatar', '/api/conversations', '/api/projects']

function isWriteProtected(pathname, method) {
  // Only protect non-GET methods for these API prefixes (POST/PUT/DELETE)
  if (!method || method.toUpperCase() === 'GET') return false
  return WRITE_PROTECTED_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))
}

export async function middleware(req) {
  const { pathname } = req.nextUrl

  // Hard guard: this middleware only applies to API routes. Page routes (including /admin)
  // always pass through and handle their own auth client-side via AdminGate. Without this,
  // Vercel's edge runtime can invoke middleware for page navigations even when the matcher
  // should have excluded them, causing the raw "Unauthorized" string to be served instead
  // of the React page.
  if (!pathname.startsWith('/api/')) return NextResponse.next()

  // Never block the admin auth endpoints themselves — login/logout/status must always be reachable.
  if (pathname.startsWith('/api/admin/')) return NextResponse.next()

  // Allow public access unless this is a write-protected API.
  if (!isWriteProtected(pathname, req.method)) return NextResponse.next()

  // Let Next.js prefetch/navigation probes through to avoid client-side prefetches
  // from triggering a 401 which can cause the app to consider the user signed-out.
  const isPrefetch =
    Boolean(req.headers.get('x-middleware-prefetch')) ||
    req.headers.get('purpose') === 'prefetch' ||
    req.headers.get('next-router-prefetch') === '1' ||
    req.headers.get('sec-purpose') === 'prefetch'
  if (isPrefetch) return NextResponse.next()

  // Allow Basic Auth (useful for scripts)
  const auth = req.headers.get('authorization') || ''
  if (auth.startsWith('Basic ')) {
    try {
      const b64 = auth.split(' ')[1]
      const decoded = Buffer.from(b64, 'base64').toString('utf8')
      const [user, pass] = decoded.split(':')
      const expectedUser = process.env.ADMIN_USER || 'admin'
      const expectedPass = process.env.ADMIN_PASSWORD || 'changeme'
      if (user === expectedUser && pass === expectedPass) return NextResponse.next()
    } catch (e) { /* fallthrough to cookie check */ }
  }

  // Check admin cookie
  const cookieHeader = req.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${ADMIN_COOKIE_NAME}=([^;\\s]+)`))
  const token = match ? decodeURIComponent(match[1]) : null
  if (await verifyAdminCookie(token)) return NextResponse.next()

  // Not authorized — return 401 without a WWW-Authenticate header
  return new NextResponse('Unauthorized', { status: 401 })
}

export const config = {
  matcher: ['/api/context/:path*', '/api/upload-avatar/:path*', '/api/conversations/:path*', '/api/projects/:path*'],
}
