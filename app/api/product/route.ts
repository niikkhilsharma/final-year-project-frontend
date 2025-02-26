import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { CategoryEnum } from '@prisma/client'

type WhereClauseType = { category?: CategoryEnum }

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const name = searchParams.get('name')

		if (!name) return NextResponse.json({ message: 'No name provided' }, { status: 400 })

		const category = searchParams.get('category')

		let whereClause: WhereClauseType = {}

		if (category) whereClause.category = category as CategoryEnum
		console.log(whereClause)

		let products

		if (Object.keys(whereClause).length !== 0) {
			products = await prisma.product.findMany({ where: whereClause })
			console.log(products)
		} else {
			products = await prisma.product.findMany()
		}

		const filteredProducts = products.filter(product => product.name.toLowerCase().includes(name?.toLowerCase()))
		console.log(filteredProducts)

		if (filteredProducts.length === 0) {
			return NextResponse.json({ message: 'No matching products found' }, { status: 404 })
		}

		return NextResponse.json({ filteredProducts })
	} catch (error) {
		console.error('Error fetching products:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
