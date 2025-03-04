import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import { CredentialsSignin } from 'next-auth'
import prisma from './lib/prisma'

class InvalidLoginError extends CredentialsSignin {
	code = 'Invalid identifier or password'
}

// Notice this is only an object, not a full Auth.js instance
export default {
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

				if (pwHash) {
					return user
				} else {
					throw new InvalidLoginError()
				}
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
} satisfies NextAuthConfig
