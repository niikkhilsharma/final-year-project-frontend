'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Minus, Plus, Facebook, Instagram, Youtube, ChevronDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Header from '@/components/homepage/header'
import ProductBox from '@/components/product'

type product = {
	id: string
	name: string
	description: string
	price: number
	stock: number
	createdById: string
	category: string
	mainImage: string
	images: string[]
	createdAt: string
	updatedAt: string
	userId: null | string
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
	const params = useSearchParams()
	const id = params.get('id')

	const [productData, setProductData] = useState<product | null>(null)

	useEffect(() => {
		const getProducts = async () => {
			const response = await axios.get(`/api/product?id=${id}`)
			const data: product = await response.data
			console.log(data)
			setProductData(data)
		}

		getProducts()
	}, [])

	return (
		<div className="flex flex-col min-h-screen">
			{/* Promo Banner */}
			<Header />

			{/* Header */}
			<header className="border-b border-gray-200 py-4">
				<div className="container mx-auto px-4 flex items-center justify-between">
					<div className="flex items-center gap-8">
						<Link href="/" className="text-2xl font-bold">
							SHOP.CO
						</Link>
						<nav className="hidden md:flex items-center gap-6">
							<Link href="#" className="font-medium">
								Shop ▾
							</Link>
							<Link href="#" className="font-medium">
								On Sale
							</Link>
							<Link href="#" className="font-medium">
								New Arrivals
							</Link>
							<Link href="#" className="font-medium">
								Brands
							</Link>
						</nav>
					</div>
					<div className="flex items-center gap-4">
						<div className="relative hidden md:block">
							<input
								type="text"
								placeholder="Search for products..."
								className="bg-[#f0f0f0] rounded-full py-2 px-4 pl-10 w-[300px]"
							/>
							<div className="absolute left-3 top-2.5">
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
										stroke="#000000"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M15.75 15.75L12.75 12.75"
										stroke="#000000"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<button className="relative">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
							<button>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
										stroke="black"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
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
										<div key={indx} className="border rounded-lg p-2 w-20 h-20 flex items-center justify-center">
											<Image src={img} alt="T-shirt thumbnail" width={60} height={60} className="object-cover" />
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
										<button className="w-8 h-8 rounded-full bg-[#4f4631] ring-2 ring-offset-2 ring-black"></button>
										<button className="w-8 h-8 rounded-full bg-[#314f4a]"></button>
										<button className="w-8 h-8 rounded-full bg-[#31344f]"></button>
									</div>
								</div>

								{/* Size Selection */}
								<div className="mb-6">
									<h3 className="font-medium mb-2">Choose Size</h3>
									<div className="flex gap-2">
										<button className="px-4 py-2 border rounded-md text-sm">Small</button>
										<button className="px-4 py-2 border rounded-md text-sm">Medium</button>
										<button className="px-4 py-2 border rounded-md text-sm bg-black text-white">Large</button>
										<button className="px-4 py-2 border rounded-md text-sm">X-Large</button>
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
						<div className="mt-16 border-b">
							<div className="flex justify-between">
								<div className="flex">
									<button className="px-6 py-3 text-gray-500">Product Details</button>
									<button className="px-6 py-3 border-b-2 border-black font-medium">Rating & Reviews</button>
									<button className="px-6 py-3 text-gray-500">FAQs</button>
								</div>
							</div>
						</div>

						{/* Reviews */}
						<div className="mt-8">
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

							{/* Review Grid */}

							<div className="grid md:grid-cols-2 gap-6">
								{/* Review 1 */}
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
										"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I
										appreciate the attention to detail, it's become my favorite go-to shirt."
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 14, 2023</p>
								</div>

								{/* Review 2 */}
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
										"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX
										designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 15, 2023</p>
								</div>

								{/* Review 3 */}
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
										"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my
										eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 16, 2023</p>
								</div>

								{/* Review 4 */}
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
										"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but
										also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand
										out."
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 17, 2023</p>
								</div>

								{/* Review 5 */}
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
										"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the
										designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 18, 2023</p>
								</div>

								{/* Review 6 */}
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
										"I'm not just wearing a t-shirt, I'm wearing a piece of design philosophy. The intricate details and thoughtful
										layout of the design make this shirt a conversation-starter."
									</p>
									<p className="text-xs text-gray-500 mt-4">Posted on August 19, 2023</p>
								</div>
							</div>

							<div className="mt-8 text-center">
								<button className="border rounded-md px-6 py-3 text-sm font-medium">Load More Reviews</button>
							</div>
						</div>

						{/* You Might Also Like */}
						<div className="mt-16">
							<h2 className="text-2xl font-bold text-center mb-8">YOU MIGHT ALSO LIKE</h2>
							<div className="flex gap-4 overflow-x-scroll">
								{sellingContainer.products.map((product, index) => (
									<ProductBox
										key={index}
										productUrl={product.productUrl}
										heading={product.heading}
										price={product.price}
										stars={product.stars}
									/>
								))}
							</div>
						</div>
						<div className="flex gap-4 overflow-x-scroll mt-10">
							{productsContainer.products.map((product, index) => (
								<ProductBox
									key={index}
									productUrl={product.productUrl}
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
		</div>
	)
}
