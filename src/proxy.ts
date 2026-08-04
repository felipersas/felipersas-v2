import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Locale } from '@/hooks/use-translation'
import { RateLimiter, clientKeyFromHeaders } from '@/lib/rate-limit'

const locales: Locale[] = ['pt-BR', 'en']
const defaultLocale: Locale = 'pt-BR'

const AGENT_PATH_PREFIX = '/eve/v1'

// The agent channel is unauthenticated, so anyone can open sessions against
// Felipe's OpenRouter key. Session limits cap one conversation; this caps how
// many a single client may start. State is per-instance and therefore
// best-effort — it stops floods, not a distributed attacker.
const agentLimiter = new RateLimiter({
  limit: Number(process.env.AGENT_RATE_LIMIT ?? 30),
  windowMs: Number(process.env.AGENT_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1_000),
})

function rateLimitAgent(request: NextRequest) {
  // Only writes are limited. The stream is a long-lived GET for a session the
  // client already paid for, and counting it would cut conversations short.
  if (request.method !== 'POST') return

  const decision = agentLimiter.check(clientKeyFromHeaders(request.headers))
  if (decision.allowed) return

  return NextResponse.json(
    { error: 'Too many requests' },
    {
      status: 429,
      headers: {
        'Retry-After': String(decision.retryAfterSeconds),
        'X-RateLimit-Limit': String(decision.limit),
        'X-RateLimit-Remaining': '0',
      },
    }
  )
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith(AGENT_PATH_PREFIX)) {
    return rateLimitAgent(request)
  }
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Check for the portfolio-locale cookie
  const cookieLocale = request.cookies.get('portfolio-locale')?.value as Locale | undefined
  if (cookieLocale && locales.includes(cookieLocale)) {
    request.nextUrl.pathname = `/${cookieLocale}${pathname}`
    return NextResponse.rewrite(request.nextUrl)
  }

  // Rewrite to default locale if none found
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files. /eve/v1 is matched on purpose so
    // the agent endpoint can be rate limited before it reaches the runtime.
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
