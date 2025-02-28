import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth(async function middleware(request) {
	if (!request.auth && request.nextUrl.pathname !== '/login') {
		const newUrl = new URL('/api/auth/signin', request.nextUrl.origin)
		return Response.redirect(newUrl)
	}

	return NextResponse.next()
})

export const config = {
	matcher: ['/((?!api/auth|auth|images|_next/static|auth/*|_next/image|favicon.ico|api/cloudinary/image-upload|^/$).+)'],
}
