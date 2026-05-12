import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['id', 'en', 'zh', 'es', 'de', 'ko', 'ja', 'fr'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
