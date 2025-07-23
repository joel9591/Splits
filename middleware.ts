import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // Check token age and reject if too old (1 hour)
    if (token) {
      const tokenAge = Math.floor(Date.now() / 1000) - (token.iat as number);
      if (tokenAge > 60 * 60) { // 1 hour in seconds
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }
    
    // Add security headers
    const response = NextResponse.next();
    
    // Security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()'); 
    
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/group/:path*', 
    '/api/groups/:path*', 
    '/api/dashboard/:path*',
    '/api/expenses/:path*'
  ],
};