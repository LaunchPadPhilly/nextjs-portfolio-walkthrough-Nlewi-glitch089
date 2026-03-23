import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, verifyAdminCookie } from '../../../../lib/adminAuth'

export async function GET(req) {
  const cookieHeader = req.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${ADMIN_COOKIE_NAME}=([^;\\s]+)`))
  const token = match ? decodeURIComponent(match[1]) : null
  const ok = await verifyAdminCookie(token)
  return NextResponse.json({ authenticated: ok })
}
