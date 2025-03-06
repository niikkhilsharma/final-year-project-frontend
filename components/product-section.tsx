import React from 'react'
import MaxWidthWrapper from './max-width-wrapper'
import ProductCard from '@/components/product-card'
import { Button } from '@/components/ui/button'
import SectionHeading from './section-heading'

interface Product {
	productUrl: string
	heading: string
	price: number
	stars?: number
}

interface ProductContainer {
	containerHeading: string
	products: Product[]
}

const ProductSection: React.FC<{ productsContainer: ProductContainer }> = async ({ productsContainer }) => {
	return (
		<div>
			<MaxWidthWrapper className="my-20">
				<SectionHeading heading={productsContainer.containerHeading} className="mb-16 mt-20" />
				<div className="flex gap-4 overflow-x-scroll">
					{productsContainer.products.map((product, index) => (
						<ProductCard key={index} {...product} />
					))}
				</div>
				<div className="flex justify-center items-center mt-10">
					<Button variant={'outline'} className="mx-auto rounded-full px-12">
						View All
					</Button>
				</div>
			</MaxWidthWrapper>
		</div>
	)
}

export default ProductSection
