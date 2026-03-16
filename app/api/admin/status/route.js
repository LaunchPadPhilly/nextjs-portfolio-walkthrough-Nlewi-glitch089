import { NextResponse } from 'next/server'
import crypto from 'crypto'

function verifyAdminCookie(cookie) {
  try {
    if (!cookie) return false
    const [ts, hmac] = cookie.split(':')
    const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'changeme'
    const expected = crypto.createHmac('sha256', secret).update(ts).digest('hex')
    if (!hmac || !expected) return false
    if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))) return false
    const tsNum = parseInt(ts, 10)
    if (Number.isNaN(tsNum)) return false
    if (Date.now() - tsNum > 1000 * 60 * 60 * 24 * 7) return false
    return true
  } catch (e) {
    return false
  }
}

export async function GET(req) {
  const cookieHeader = req.headers.get('cookie') || ''
  const match = cookieHeader.match(/admin_auth=([^;\s]+)/)
  const token = match ? decodeURIComponent(match[1]) : null
  const ok = verifyAdminCookie(token)
  return NextResponse.json({ authenticated: ok })
}
