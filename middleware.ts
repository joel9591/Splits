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
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const sessionToken = req.cookies.get('next-auth.session-token') || 
                            req.cookies.get('__Secure-next-auth.session-token');
        
        // Return true if we have a valid token OR a session cookie
        return !!token || !!sessionToken;
    },
  }
}
);

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/group/:path*', 
     // Exclude NextAuth API routes explicitly
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    // '/api/groups/:path*', 
    // '/api/dashboard/:path*',
    // '/api/expenses/:path*'
  ],
};



// middleware.ts  ✅ simplified
// import { withAuth } from 'next-auth/middleware';

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => !!token,
//   },
// });

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/group/:path*',
//     // API routes that require auth
//     '/api/(dashboard|groups|expenses)/:path*',
//   ],
// };
