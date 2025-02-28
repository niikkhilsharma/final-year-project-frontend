import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import prisma from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma) as any,
	session: {
		strategy: 'jwt',
	},
	pages: { signIn: '/auth/sign-in', signOut: '/auth/sign-out' },
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async credentials => {
				let user = null

				// logic to verify if the user exists
				user = await prisma.user.findUnique({
					where: {
						email: credentials.email as string,
					},
				})

				if (!user) {
					return null
				}

				// logic to salt and hash password
				const pwHash = await compare(credentials.password as string, user.password)

				// if (pwHash) {

				return user
				// } else {
				// 	throw new InvalidLoginError()
				// }
			},
		}),
	],
	callbacks: {
		async jwt({ user, token }) {
			if (user) {
				token.user = user
			}
			return token
		},
		async session({ session, token }: any) {
			session.user = token.user
			return session
		},
	},
})
