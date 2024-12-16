import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '../../../lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth')?.value;
  const publicPaths = ['/login', '/register', '/', '/api/auth/login', '/api/auth/register'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    const decoded = verifyToken(token);
    if (!decoded && !isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (decoded) {
      // Ajoutez les informations de l'utilisateur à l'objet request
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('user-id', decoded.id.toString());
      requestHeaders.set('user-role', decoded.role);
    
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return response;
    }
  }

  return NextResponse.next();
}