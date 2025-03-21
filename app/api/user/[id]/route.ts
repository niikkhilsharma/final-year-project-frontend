import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { User } from '@prisma/client'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const userId = (await params).id

		// Authenticate the current user
		const session = await auth()
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		// Only allow users to update their own profile unless they are an admin
		const currentUser = await prisma.user.findUnique({
			where: { email: session.user.email as string },
		})

		if (!currentUser) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		if (currentUser.id !== userId && currentUser.role !== 'Admin') {
			return NextResponse.json({ error: 'You are not authorized to update this profile' }, { status: 403 })
		}

		// Parse the request body
		const body = await request.json()

		// Validate required fields
		if (!body.firstName || !body.lastName || !body.email) {
			return NextResponse.json({ error: 'First name, last name, and email are required' }, { status: 400 })
		}

		// Build the update data object with type safety
		const updateData: Partial<User> = {
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			updatedAt: new Date(),
		}

		// Add optional fields if they exist in the request
		if (body.phoneNo !== undefined) updateData.phoneNo = body.phoneNo
		if (body.gender !== undefined) updateData.gender = body.gender
		if (body.address !== undefined) updateData.address = body.address

		// Handle date object conversion for date of birth
		if (body.dob) {
			updateData.dob = new Date(body.dob)
		}

		// Only Admin users can update GST number
		if (currentUser.role === 'Admin' && body.gstNumber !== undefined) {
			updateData.gstNumber = body.gstNumber
		}

		// Update the user in the database
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: updateData,
		})

		// Remove sensitive information before returning
		const safeUser = {
			...updatedUser,
			password: undefined,
		}

		return NextResponse.json(safeUser)
	} catch (error) {
		console.error('Error updating user:', error)
		return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 })
	}
}
