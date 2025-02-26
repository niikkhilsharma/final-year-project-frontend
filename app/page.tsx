import Header from '@/components/homepage/header'
import Hero from '@/components/homepage/hero'
import Navbar from '@/components/homepage/navbar'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductSection from '@/components/product-section'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import ProductBox from '@/components/product'
import SectionHeading from '@/components/section-heading'
import { Button } from '@/components/ui/button'

export default async function Home() {
	const productsContainer = {
		containerHeading: 'NEW ARRIVALS',
		products: [
			{
				productUrl: '/dummy-images/t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4.5,
			},
			{
				productUrl: '/dummy-images/t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4,
			},
			{
				productUrl: '/dummy-images/t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4,
			},
			{
				productUrl: '/dummy-images/t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4,
			},
			{
				productUrl: '/dummy-images/t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4,
			},
			{
				productUrl: '/dummy-images/t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4,
			},
		],
	}

	const sellingContainer = {
		containerHeading: 'TOP SELLING',
		products: [
			{
				productUrl: '/dummy-images/red-t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4.5,
			},
			{
				productUrl: '/dummy-images/red-t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4.5,
			},
			{
				productUrl: '/dummy-images/red-t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4.5,
			},
			{
				productUrl: '/dummy-images/red-t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4.5,
			},
			{
				productUrl: '/dummy-images/red-t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4.5,
			},
			{
				productUrl: '/dummy-images/red-t-shirt.png',
				heading: 'T-SHIRT WITH TAPE DETAILS',
				price: 20,
				stars: 4.5,
			},
		],
	}

	const products = await prisma.product.findMany()

	return (
		<div>
			<Header />
			<Navbar />
			<Hero />
			<ProductSection productsContainer={productsContainer} />
			<MaxWidthWrapper>
				<Separator />
			</MaxWidthWrapper>
			<ProductSection productsContainer={sellingContainer} />
			<MaxWidthWrapper className="my-20">
				<SectionHeading heading={'Latest Products'} className="mb-16 mt-20" />
				<div className="flex gap-4 overflow-x-scroll">
					{products.map((product, index) => (
						<ProductBox key={index} productUrl={product.mainImage} heading={product.name} stars={5} price={product.price} />
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
