'use client'
import Image from 'next/image'
import React from 'react'
import StarRating from '@/components/start-rating'
import Link from 'next/link'
import Qr from './qr'

interface ProductProps {
	id: string
	mainImageUrl: string
	heading: string
	price: number
	discount?: number
	stars?: number
}

const ProductCard: React.FC<ProductProps> = ({ id = '', mainImageUrl, heading, stars, price }) => {
	return (
		<div className="">
			<Link href={`/product?id=${id}`}>
				<div className="rounded-3xl bg-primary-foreground overflow-hidden max-w-72 min-w-72 aspect-square">
					<Image src={mainImageUrl} width={400} height={400} className="object-contain" alt="product" />
				</div>
			</Link>
			<div className="mt-2 flex items-center justify-between px-2">
				<div className="space-y-1">
					<p className="text-xl font-semibold">{heading}</p>
					{stars !== undefined && <StarRating readOnly={true} rating={stars} totalStars={5} />}
					<div className="flex items-center justify-start gap-2">
						<p className="text-2xl font-semibold">₹{price}</p>
					</div>
				</div>
				<Qr link={`https://rtu.techsolutions.services/product?id=${id}`} productName={heading} />
			</div>
		</div>
	)
}

export default ProductCard
