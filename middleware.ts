import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token
		const isAuth = !!token
		const isAuthPage = req.nextUrl.pathname.startsWith('/signin') ||
			req.nextUrl.pathname.startsWith('/signup') ||
			req.nextUrl.pathname.startsWith('/verify') ||
			req.nextUrl.pathname.startsWith('/forgotpassword') ||
			req.nextUrl.pathname.startsWith('/resetpassword')

		const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') ||
			req.nextUrl.pathname.startsWith('/create')

		// Redirect authenticated users away from auth pages
		if (isAuthPage && isAuth) {
			return NextResponse.redirect(new URL('/dashboard', req.url))
		}

		// Redirect unauthenticated users trying to access protected routes
		if (isProtectedRoute && !isAuth) {
			return NextResponse.redirect(new URL('/signin', req.url))
		}

		return NextResponse.next()
	},
	{
		callbacks: {
			authorized: () => {
				// This is a work-around for handling redirect on auth pages.
				// We return true here so that the middleware function above
				// is always called.
				return true
			},
		},
	}
)

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
	],
}