import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, isSecureCookieRequest } from '../../../../lib/adminAuth'

export async function POST(req) {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: isSecureCookieRequest(req.url),
    maxAge: 0,
  })
  return res
}
