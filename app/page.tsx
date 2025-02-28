import Header from '@/components/homepage/header'
import Hero from '@/components/homepage/hero'
import Navbar from '@/components/homepage/navbar'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import prisma from '@/lib/prisma'
import ProductBox from '@/components/product'
import SectionHeading from '@/components/section-heading'
import { Button } from '@/components/ui/button'

export default async function Home() {
	const products = await prisma.product.findMany()
	console.log(products)
	return (
		<div>
			<Header />
			<Navbar />
			<Hero />
			<MaxWidthWrapper className="my-20">
				<SectionHeading heading={'Latest Products'} className="mb-16 mt-20" />
				<div className="flex gap-4 overflow-x-scroll">
					{products.map((product, index) => (
						<ProductBox
							id={product.id}
							key={index}
							productUrl={product.mainImage}
							heading={product.name}
							stars={5}
							price={product.price}
						/>
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
