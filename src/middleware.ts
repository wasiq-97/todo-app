import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = getCookie('authToken',{ cookies })
    if(!cookie){
        if (request.nextUrl.pathname !== '/login') {
            if (request.nextUrl.pathname !== '/register') {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        }
    }else{
        if (request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/register') {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
      "/((?!api|static|favicon.ico|assets|favicon|manifest.json|_next).*)",
    ],
  };