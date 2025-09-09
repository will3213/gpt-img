import { NextRequest, NextResponse } from 'next/server';
import { locales } from './lib/translations';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for global files and legal pages
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt' || pathname === '/terms' || pathname === '/privacy') {
    return NextResponse.next();
  }
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

function getLocale(request: NextRequest): string {
  // 1. Check URL parameter
  const urlLocale = new URL(request.url).searchParams.get('lang');
  if (urlLocale && locales.includes(urlLocale)) {
    return urlLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale;
      }
    }
  }

  // 3. Default to English
  return 'en';
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and global files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|terms|privacy).*)'],
};