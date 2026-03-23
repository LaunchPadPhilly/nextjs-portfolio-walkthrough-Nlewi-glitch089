const encoder = new TextEncoder()

export const ADMIN_COOKIE_NAME = 'admin_auth'
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

function getAdminSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'changeme'
}

function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, '0')).join('')
}

async function importSigningKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
}

function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

export async function signAdminTimestamp(ts, secret = getAdminSecret()) {
  const key = await importSigningKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(ts))
  return bytesToHex(signature)
}

export async function createAdminToken(secret = getAdminSecret()) {
  const ts = Date.now().toString()
  const signature = await signAdminTimestamp(ts, secret)
  return `${ts}:${signature}`
}

export async function verifyAdminCookie(cookie, secret = getAdminSecret()) {
  try {
    if (!cookie) return false
    const [ts, signature] = cookie.split(':')
    if (!ts || !signature) return false
    const tsNum = Number.parseInt(ts, 10)
    if (Number.isNaN(tsNum)) return false
    if (Date.now() - tsNum > ADMIN_COOKIE_MAX_AGE * 1000) return false
    const expected = await signAdminTimestamp(ts, secret)
    return timingSafeEqual(signature, expected)
  } catch {
    return false
  }
}

export function getAdminTokenFromRequest(req) {
  const directCookie = req?.cookies?.get?.(ADMIN_COOKIE_NAME)?.value
  if (directCookie) return directCookie

  const cookieHeader = req?.headers?.get?.('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${ADMIN_COOKIE_NAME}=([^;\\s]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export async function isAdminRequest(req) {
  return verifyAdminCookie(getAdminTokenFromRequest(req))
}

export function isSecureCookieRequest(url) {
  try {
    return new URL(url).protocol === 'https:' || process.env.NODE_ENV === 'production'
  } catch {
    return process.env.NODE_ENV === 'production'
  }
}
