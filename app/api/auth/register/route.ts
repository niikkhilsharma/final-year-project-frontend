import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
	try {
		const { firstName, lastName, email, password, gstNumber } = await req.json()
		console.log(firstName, lastName, email, password)

		// Hash the password before storing it
		const hashedPassword = await hash(password, 10)

		// Create the user with the hashed password (only once)
		const prismaUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: hashedPassword,
				role: 'Seller',
				gstNumber: gstNumber,
			},
		})

		console.log(prismaUser, 'user')

		return new Response(JSON.stringify(prismaUser), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify(error), {
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
}
