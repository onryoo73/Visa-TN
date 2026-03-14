import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function decodeBase64(input: string) {
  try {
    if (typeof atob === 'function') return atob(input)
  } catch (e) {}
  try {
    const buf = Buffer.from(input, 'base64')
    return buf.toString('utf-8')
  } catch (e) {
    return ''
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect the admin UI and its subpaths
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const auth = req.headers.get('authorization') || ''
  if (auth.startsWith('Basic ')) {
    const base64 = auth.split(' ')[1]
    const decoded = decodeBase64(base64)
    const [user, pass] = decoded.split(':')

    const expectedUser = process.env.BASIC_AUTH_USER || ''
    const expectedPass = process.env.BASIC_AUTH_PASS || ''

    if (user === expectedUser && pass === expectedPass) return NextResponse.next()
  }

  // Challenge browser for credentials
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Restricted"' },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}
