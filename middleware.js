import { NextResponse } from 'next/server'
import crypto from 'crypto'

// Protect admin pages and sensitive write APIs. Public GET access is allowed for client-side features.
const ADMIN_ONLY_PATHS = ['/admin']
const WRITE_PROTECTED_PREFIXES = ['/api/context', '/api/upload-avatar', '/api/conversations']

function isAdminPath(pathname) {
  return ADMIN_ONLY_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
}

function isWriteProtected(pathname, method) {
  // Only protect non-GET methods for these API prefixes (POST/PUT/DELETE)
  if (!method || method.toUpperCase() === 'GET') return false
  return WRITE_PROTECTED_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))
}

function verifyAdminCookie(cookie) {
  try {
    if (!cookie) return false
    // token format: ts:hmac
    const [ts, hmac] = cookie.split(':')
    const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'changeme'
    const expected = crypto.createHmac('sha256', secret).update(ts).digest('hex')
    if (!hmac || !expected) return false
    if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))) return false
    const tsNum = parseInt(ts, 10)
    if (Number.isNaN(tsNum)) return false
    // valid for 7 days
    if (Date.now() - tsNum > 1000 * 60 * 60 * 24 * 7) return false
    return true
  } catch (e) {
    return false
  }
}

export function middleware(req) {
  const { pathname } = req.nextUrl

  // Allow public access unless this is an admin page or a write-protected API.
  if (!isAdminPath(pathname) && !isWriteProtected(pathname, req.method)) return NextResponse.next()

  // Let Next.js prefetch/navigation probes through to avoid client-side prefetches
  // from triggering a 401 which can cause the app to consider the user signed-out.
  const isPrefetch = req.headers.get('x-middleware-prefetch') || req.headers.get('purpose') === 'prefetch'
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
  const match = cookieHeader.match(/admin_auth=([^;\s]+)/)
  const token = match ? decodeURIComponent(match[1]) : null
  if (verifyAdminCookie(token)) return NextResponse.next()

  // Not authorized — return 401 without a WWW-Authenticate header
  return new NextResponse('Unauthorized', { status: 401 })
}

export const config = {
  matcher: ['/admin/:path*', '/api/context/:path*', '/api/upload-avatar/:path*', '/api/conversations/:path*'],
}
