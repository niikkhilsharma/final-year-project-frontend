'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader, QrCode } from 'lucide-react'
import axios from 'axios'
import Image from 'next/image'

export default function Qr({ link, productName }: { link: string; productName: string }) {
	const [qrImage, setQrImage] = useState<string | null>(null)

	const getQr = async () => {
		const res = await axios.post('/api/qr', { link })
		setQrImage(res.data.qr)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={'icon'} variant={'secondary'} onClick={getQr}>
					<QrCode />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{productName}</DialogTitle>
					<DialogDescription>
						{qrImage ? (
							<Image src={qrImage} alt={productName} width={300} height={300} className="w-full h-full" />
						) : (
							<span>
								<Loader className="animate-spin h-5 w-5 text-gray-900" />
							</span>
						)}
						<span className="text-sm text-center w-full block text-gray-600">Scan this QR code to get the product details</span>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
