import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export async function POST(request: Request) {
	const body = await request.json()
	const session = await auth()

	if (!session) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	const createdProduct = await prisma.product.create({
		data: {
			name: body.title,
			category: body.category,
			description: body.description,
			images: body.images,
			mainImage: body.mainImage,
			price: Number(body.price),
			stock: Number(body.quantity),
			createdById: session.user?.id as string,
		},
	})

	return new Response(JSON.stringify(createdProduct), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
