import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
import prisma from '@/lib/prisma'
import { CategoryEnum } from '@prisma/client'
// const prisma = new PrismaClient()
type WhereClause = { name: string; category: CategoryEnum }

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const name = searchParams.get('name')
		const category = searchParams.get('category')
		// const color = searchParams.get('color')
		// const minPrice = searchParams.get('minPrice')
		// const maxPrice = searchParams.get('maxPrice')
		// const stockAvailable = searchParams.get('stock') // 'true' or 'false'

		let whereClause: Partial<WhereClause> = {}

		if (name) whereClause.name = name
		if (category) whereClause.category = category as CategoryEnum
		// if (color) whereClause.colors = { has: color } // 'colors' is an array in Prisma
		// if (minPrice) whereClause.price = { gte: parseFloat(minPrice) }
		// if (maxPrice) whereClause.price = { lte: parseFloat(maxPrice) }
		// if (stockAvailable === 'true') whereClause.stock = { gt: 0 }
		// if (stockAvailable === 'false') whereClause.stock = 0

		const products = await prisma.product.findMany({ where: whereClause })

		if (products.length === 0) {
			return NextResponse.json({ message: 'No matching products found' }, { status: 404 })
		}

		return NextResponse.json({ products })
	} catch (error) {
		console.error('Error fetching products:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
