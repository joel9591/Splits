import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware'; // ✅ import this

const middleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token; // ✅ no TS error now

    console.log('[Middleware] Auth check:', {
      path: req.nextUrl.pathname,
      hasToken: !!token,
      tokenAge: token ? Math.floor(Date.now() / 1000) - (token.iat as number) : null,
    });

    if (!token) {
      const url = new URL('/auth/signin', req.nextUrl.origin);
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);
      console.log('[Middleware] Redirecting to signin:', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export default middleware;

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/group/:path*',
    '/api/(dashboard|groups|expenses)/:path*',
  ],
};
