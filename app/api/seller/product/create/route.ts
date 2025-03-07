import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import type { Color, Size } from '@prisma/client'

type sizeType = Size & { checked: boolean }

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

	const dbColors = await prisma.color.findMany()
	const newColors: Color[] = []

	const dbSizes = await prisma.size.findMany()
	const newSizes: Size[] = []

	body.colors.forEach((color: { name: string; codeHex: string }) => {
		const dbColor = dbColors.find(c => c.codeHex === color.codeHex)
		if (!dbColor) {
			return new Response(JSON.stringify({ message: 'Invalid color' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			})
		} else {
			newColors.push(dbColor)
		}
	})

	body.sizes.forEach((size: sizeType) => {
		const dbSize = dbSizes.find(
			s =>
				s.sizeCode === size.sizeCode ||
				s.waistSize === size.waistSize ||
				s.sizeNumber === Number(size.sizeCode) ||
				(s.width === size.width && s.height === size.height)
		)
		if (!dbSize) {
			return new Response(JSON.stringify({ message: 'Invalid size' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			})
		} else {
			newSizes.push(dbSize)
		}
	})

	const createdProduct = await prisma.product.create({
		data: {
			name: body.title,
			category: body.category,
			description: body.description,
			images: body.images,
			mainImage: body.mainImage,
			price: Number(body.price),
			stock: Number(body.quantity),
			colors: {
				connect: newColors.map(color => ({ id: color.id })), // Connect existing colors
			},
			Sizes: {
				connect: newSizes.map(size => ({ id: size.id })), // Connect existing sizes
			},
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
