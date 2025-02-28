'use client'
import Image from 'next/image'
import React from 'react'
import StarRating from '@/components/start-rating'
import Link from 'next/link'

interface ProductProps {
	id?: string
	productUrl: string
	heading: string
	price: number
	discount?: number
	stars?: number
}

const ProductBox: React.FC<ProductProps> = ({ id = '', productUrl, heading, stars, price }) => {
	return (
		<Link href={`/product?id=${id}`}>
			<div className="rounded-3xl bg-primary-foreground overflow-hidden max-w-72 min-w-72 aspect-square">
				<Image src={productUrl} width={400} height={400} className="object-contain" alt="product" />
			</div>
			<div className="mt-4 space-y-1">
				<p className="text-xl font-semibold">{heading}</p>
				{stars !== undefined && <StarRating readOnly={true} rating={stars} totalStars={5} />}
				<div className="flex items-center justify-start gap-2">
					<p className="text-2xl font-semibold">₹{price}</p>
				</div>
			</div>
		</Link>
	)
}

export default ProductBox
