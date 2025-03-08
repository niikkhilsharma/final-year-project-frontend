'use client'
import Image from 'next/image'
import { Star, Minus, Plus } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import ProductCard from '@/components/product-card'
import type { Product, Color, Size } from '@prisma/client'
import { cn } from '@/lib/utils'

type product = Product & {
	colors: Color[]
	Sizes: Size[]
}

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

export default function ProductPage() {
	return (
		<Suspense fallback={<div>Loading Product...</div>}>
			<Product />
		</Suspense>
	)
}

function Product() {
	const params = useSearchParams()
	const id = params.get('id')

	const [productData, setProductData] = useState<product | null>(null)

	useEffect(() => {
		const getProducts = async () => {
			const response = await axios.get(`/api/product?id=${id}`)
			const data = await response.data
			console.log(data)
			setProductData(data)
		}

		getProducts()
	}, [id])

	return (
		<>
			{productData && Object.keys(productData).length > 0 ? (
				<main className="flex-1 py-8">
					<div className="container mx-auto px-4">
						{/* Product Section */}
						<div className="grid md:grid-cols-2 gap-8">
							{/* Product Images */}
							<div className="flex gap-4">
								{/* Thumbnails */}
								<div className="flex flex-col gap-4">
									{productData.images.map((img, indx) => (
										<div key={indx} className="border rounded-lg w-20 h-20 flex items-center justify-center">
											<Image
												src={img}
												alt="T-shirt thumbnail"
												width={60}
												height={60}
												className="object-contain w-20 h-20 aspect-square rounded-lg"
											/>
										</div>
									))}
								</div>

								{/* Main Image */}
								<div className="bg-[#f0f0f0] rounded-lg flex-1 flex items-center justify-center">
									<Image
										src={productData?.mainImage}
										alt="ONE LIFE GRAPHIC T-SHIRT"
										width={300}
										height={400}
										className="object-contain"
									/>
								</div>
							</div>

							{/* Product Info */}
							<div>
								<h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
								<div className="flex items-center gap-2 mb-4">
									<div className="flex">
										{[1, 2, 3, 4].map(i => (
											<Star key={i} className="w-5 h-5 fill-[#ffc633] text-[#ffc633]" />
										))}
										<Star className="w-5 h-5 fill-[#ffc633] text-[#ffc633]" strokeWidth={0} fill="url(#half-star)" />
									</div>
									<span className="text-sm text-gray-500">4.5/5</span>
								</div>

								<div className="mb-6">
									<span className="text-2xl font-bold">₹{productData.price}</span>
								</div>

								<p className="text-gray-600 mb-6">{productData?.description}</p>

								{/* Color Selection */}
								<div className="mb-6">
									<h3 className="font-medium mb-2">Select Colors</h3>
									<div className="flex gap-2">
										{productData.colors.map((color, indx) => (
											<button
												key={indx}
												className={cn('w-8 h-8 rounded-full hover:opacity-80')}
												style={{ backgroundColor: color.codeHex }}></button>
										))}
									</div>
								</div>

								{/* Size Selection */}
								<div className="mb-6">
									<h3 className="font-medium mb-2">Choose Size</h3>
									<div className="flex gap-2">
										{productData.Sizes.map((size, indx) => (
											<button key={indx} className={cn('w-8 h-8 rounded-full ring-2 ring-black hover:opacity-80')}>
												{size.sizeCode || size.waistSize || size.sizeNumber || `W: ${size.width} H: ${size.height}`}
											</button>
										))}
									</div>
								</div>

								{/* Add to Cart */}
								<div className="flex gap-4 mb-8">
									<div className="flex items-center border rounded-md">
										<button className="px-3 py-2">
											<Minus className="w-5 h-5" />
										</button>
										<span className="px-4 py-2">1</span>
										<button className="px-3 py-2">
											<Plus className="w-5 h-5" />
										</button>
									</div>
									<button className="bg-black text-white rounded-md px-6 py-3 flex-1 font-medium">Add to Cart</button>
								</div>
							</div>
						</div>

						{/* Tabs */}
						{/* <div className="mt-16 border-b">
							<div className="flex justify-between">
								<div className="flex">
									<button className="px-6 py-3 text-gray-500">Product Details</button>
									<button className="px-6 py-3 border-b-2 border-black font-medium">Rating & Reviews</button>
									<button className="px-6 py-3 text-gray-500">FAQs</button>
								</div>
							</div>
						</div> */}

						{/* Reviews */}
						{/* <div className="mt-8">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-bold">
									All Reviews <span className="text-gray-500 text-sm font-normal">(453)</span>
								</h2>
								<div className="flex gap-4">
									<button className="p-2 border rounded-md">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M5 10H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
											<path d="M2.5 5H17.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
											<path d="M7.5 15H12.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
										</svg>
									</button>
									<div className="flex items-center gap-2 border rounded-md px-3 py-2">
										<span className="text-sm">Latest</span>
										<ChevronDown className="w-4 h-4" />
									</div>
									<button className="bg-black text-white rounded-md px-4 py-2 text-sm">Write a Review</button>
								</div>
							</div>


							<div className="grid md:grid-cols-2 gap-6">
								<div className="border rounded-lg p-4">
									<div className="flex justify-between mb-2">
										<div>
											<div className="flex mb-1">
												{[1, 2, 3, 4, 5].map(i => (
													<Star key={i} className="w-4 h-4 fill-[#ffc633] text-[#ffc633]" />
												))}
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">Samantha D.</span>
												<span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center">
													<div className="bg-green-500 rounded-full w-2 h-2"></div>
												</span>
											</div>
										</div>
										<button className="text-gray-400">•••</button>
									</div>
									<p className="text-sm text-gray-600 mt-2">
										I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I
										appreciate the attention to detail, it&apos;s become my favorite go-to shirt.
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 14, 2023</p>
								</div>

								<div className="border rounded-lg p-4">
									<div className="flex justify-between mb-2">
										<div>
											<div className="flex mb-1">
												{[1, 2, 3, 4].map(i => (
													<Star key={i} className="w-4 h-4 fill-[#ffc633] text-[#ffc633]" />
												))}
												<Star className="w-4 h-4 text-gray-300" />
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">Alex M.</span>
												<span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center">
													<div className="bg-green-500 rounded-full w-2 h-2"></div>
												</span>
											</div>
										</div>
										<button className="text-gray-400">•••</button>
									</div>
									<p className="text-sm text-gray-600 mt-2">
										The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX
										designer myself, I&apos;m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 15, 2023</p>
								</div>

								<div className="border rounded-lg p-4">
									<div className="flex justify-between mb-2">
										<div>
											<div className="flex mb-1">
												{[1, 2, 3, 4].map(i => (
													<Star key={i} className="w-4 h-4 fill-[#ffc633] text-[#ffc633]" />
												))}
												<Star className="w-4 h-4 text-gray-300" />
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">Ethan R.</span>
												<span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center">
													<div className="bg-green-500 rounded-full w-2 h-2"></div>
												</span>
											</div>
										</div>
										<button className="text-gray-400">•••</button>
									</div>
									<p className="text-sm text-gray-600 mt-2">
										This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my
										eye, and the fit is perfect. I can see the designer&apos;s touch in every aspect of this shirt.
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 16, 2023</p>
								</div>

								<div className="border rounded-lg p-4">
									<div className="flex justify-between mb-2">
										<div>
											<div className="flex mb-1">
												{[1, 2, 3, 4, 5].map(i => (
													<Star key={i} className="w-4 h-4 fill-[#ffc633] text-[#ffc633]" />
												))}
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">Olivia P.</span>
												<span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center">
													<div className="bg-green-500 rounded-full w-2 h-2"></div>
												</span>
											</div>
										</div>
										<button className="text-gray-400">•••</button>
									</div>
									<p className="text-sm text-gray-600 mt-2">
										As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but
										also feels great to wear. It&apos;s evident that the designer poured their creativity into making this t-shirt
										stand out.
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 17, 2023</p>
								</div>

								<div className="border rounded-lg p-4">
									<div className="flex justify-between mb-2">
										<div>
											<div className="flex mb-1">
												{[1, 2, 3, 4].map(i => (
													<Star key={i} className="w-4 h-4 fill-[#ffc633] text-[#ffc633]" />
												))}
												<Star className="w-4 h-4 text-gray-300" />
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">Liam K.</span>
												<span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center">
													<div className="bg-green-500 rounded-full w-2 h-2"></div>
												</span>
											</div>
										</div>
										<button className="text-gray-400">•••</button>
									</div>
									<p className="text-sm text-gray-600 mt-2">
										This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the
										designer&apos;s skill. It&apos;s like wearing a piece of art that reflects my passion for both design and fashion.
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 18, 2023</p>
								</div>

								<div className="border rounded-lg p-4">
									<div className="flex justify-between mb-2">
										<div>
											<div className="flex mb-1">
												{[1, 2, 3, 4].map(i => (
													<Star key={i} className="w-4 h-4 fill-[#ffc633] text-[#ffc633]" />
												))}
												<Star className="w-4 h-4 fill-[#ffc633] text-[#ffc633]" strokeWidth={0} fill="url(#half-star)" />
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">Ava H.</span>
												<span className="bg-green-100 rounded-full w-4 h-4 flex items-center justify-center">
													<div className="bg-green-500 rounded-full w-2 h-2"></div>
												</span>
											</div>
										</div>
										<button className="text-gray-400">•••</button>
									</div>
									<p className="text-sm text-gray-600 mt-2">
										I&apos;m not just wearing a t-shirt, I&apos;m wearing a piece of design philosophy. The intricate details and
										thoughtful layout of the design make this shirt a conversation-starter.
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 19, 2023</p>
								</div>
							</div>

							<div className="mt-8 text-center">
								<button className="border rounded-md px-6 py-3 text-sm font-medium">Load More Reviews</button>
							</div>
						</div> */}

						{/* You Might Also Like */}
						<div className="mt-16">
							<h2 className="text-2xl font-bold text-center mb-8">YOU MIGHT ALSO LIKE</h2>
							<div className="flex gap-4 overflow-x-scroll">
								{sellingContainer.products.map((product, index) => (
									<ProductCard
										id={index.toString()}
										key={index}
										mainImageUrl={product.productUrl}
										heading={product.heading}
										price={product.price}
										stars={product.stars}
									/>
								))}
							</div>
						</div>
						<div className="flex gap-4 overflow-x-scroll mt-10">
							{productsContainer.products.map((product, index) => (
								<ProductCard
									id={index.toString()}
									key={index}
									mainImageUrl={product.productUrl}
									heading={product.heading}
									price={product.price}
									stars={product.stars}
								/>
							))}
						</div>

						{/* Newsletter */}
						<div className="mt-16 bg-black text-white rounded-lg p-8 md:p-12">
							<div className="max-w-4xl mx-auto text-center">
								<h2 className="text-2xl md:text-3xl font-bold mb-6">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
								<div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
									<input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-md text-black" />
									<button className="bg-white text-black font-medium px-6 py-3 rounded-md">Subscribe to Newsletter</button>
								</div>
							</div>
						</div>
					</div>
				</main>
			) : (
				<div className="p-8 text-3xl font-semibold text-center">Loading...</div>
			)}
		</>
	)
}
