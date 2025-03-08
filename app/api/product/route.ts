import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CategoryEnum } from '@prisma/client'

type WhereClauseType = {
	category?: CategoryEnum
	name?: {
		contains: string
		mode: 'insensitive'
	}
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = searchParams.get('id')
		const name = searchParams.get('name')
		const category = searchParams.get('category')

		// Handle case for fetching by ID
		if (id) {
			const product = await prisma.product.findUnique({
				where: {
					id,
				},
				include: { colors: true, Sizes: true },
			})

			if (product) {
				return NextResponse.json(product)
			} else {
				return NextResponse.json({ message: 'No product found with the given id' }, { status: 404 })
			}
		}

		// Building the where clause for filtering
		const whereClause: WhereClauseType = {}

		if (category && Object.values(CategoryEnum).includes(category as CategoryEnum)) {
			whereClause.category = category as CategoryEnum
		}

		if (name) {
			whereClause.name = {
				contains: name,
				mode: 'insensitive', // Case insensitive search
			}
		}

		// Fetch products with filters if any, or all products
		const products = await prisma.product.findMany({
			where: whereClause,
			include: { colors: true, Sizes: true },
		})

		if (products.length === 0) {
			return NextResponse.json({ message: 'No matching products found' }, { status: 404 })
		}

		return NextResponse.json(products)
	} catch (error) {
		console.error('Error fetching products:', error)
		return NextResponse.json({ message: 'Internal Server Error', error: String(error) }, { status: 500 })
	}
}
