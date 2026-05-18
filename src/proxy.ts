import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Locale } from '@/hooks/use-translation'

const locales: Locale[] = ['pt-BR', 'en']
const defaultLocale: Locale = 'pt-BR'

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
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
    // Skip all internal paths (_next, api) and all static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
