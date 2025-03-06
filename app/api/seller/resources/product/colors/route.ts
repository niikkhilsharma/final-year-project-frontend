import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const allColors = await prisma.color.findMany()
	const responseColors = allColors.map(color => ({
		name: color.name,
		codeHex: color.codeHex,
	}))
	return NextResponse.json(responseColors)
}
