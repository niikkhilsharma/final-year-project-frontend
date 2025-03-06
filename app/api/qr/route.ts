import { NextResponse } from 'next/server'
import QRCode from 'qrcode'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const link = body.link
		const qr = await QRCode.toDataURL(link)
		return NextResponse.json({ qr })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
