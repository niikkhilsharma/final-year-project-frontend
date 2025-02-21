import Header from '@/components/homepage/header'
import Hero from '@/components/homepage/hero'
import Navbar from '@/components/homepage/navbar'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProductSection from '@/components/product-section'
import { Separator } from '@/components/ui/separator'

export default function Home() {
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
		</div>
	)
}
