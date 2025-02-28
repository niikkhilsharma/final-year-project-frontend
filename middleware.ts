import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth(async function middleware(request) {
	const session = await auth()
	console.log(session, 'from middleware')

	if (!request.auth && request.nextUrl.pathname !== '/login') {
		const newUrl = new URL('/api/auth/signin', request.nextUrl.origin)
		return Response.redirect(newUrl)
	}

	return NextResponse.next()
})

export const config = {
	matcher: ['/((?!api/auth|auth|images|_next/static|auth/*|_next/image|favicon.ico|api/cloudinary/image-upload|^/$).+)'],
	unstable_allowDynamic: [
		'/node_modules/@nextui-org/calendar/dist/chunk-NABLCSM5.mjs',
		'/node_modules/@nextui-org/theme/dist/chunk-YSA7EQBH.mjs',
		'/node_modules/@nextui-org/calendar/dist/index.mjs',
		'/node_modules/@nextui-org/react/dist/index.mjs',
		'/node_modules/@nextui-org/theme/dist/index.mjs',
		'/node_modules/lodash.kebabcase/index.js',
		'/node_modules/lodash.debounce/index.js',
		'/node_modules/lodash.mapkeys/index.js',
		'/node_modules/lodash.omit/index.js',
		'/node_modules/lodash.get/index.js',
	],
}
