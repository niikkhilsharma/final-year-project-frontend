'use client'
import Image from 'next/image'
import { Star, Minus, Plus } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import ProductCard from '@/components/product-card'
import type { Product, Color, Size } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
	const router = useRouter()

	const [selectedColor, setSelectedColor] = useState<string>('')
	// const [selectedSize, setSelectedSize] = useState<string | number>('')
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1)

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

	function handleAddToCart() {
		if (!selectedColor) return toast('Please select a color')

		const cartObject = {
			name: productData?.name,
			productId: productData?.id,
			color: selectedColor,
			stock: selectedQuantity,
			mainImage: productData?.mainImage,
			price: productData?.price,
		}

		const cart = JSON.parse(localStorage.getItem('cart') || '[]')

		// Remove existing product with the same ID
		// @ts-expect-error //ignore
		const updatedCart = cart.filter(item => item.productId !== productData?.id)

		// Add the new product
		updatedCart.push(cartObject)

		localStorage.setItem('cart', JSON.stringify(updatedCart))

		toast('Item has been added to cart', {
			description: 'Sunday, December 03, 2023 at 9:00 AM',
			action: {
				label: 'Go to Cart',
				onClick: () => router.push('/cart'),
			},
		})
	}

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
								{productData.colors.length > 0 && (
									<div className="mb-6">
										<h3 className="font-medium mb-2">Select Colors</h3>
										<div className="flex gap-2">
											{productData.colors.map((color, indx) => (
												<Button
													onClick={() => setSelectedColor(color.codeHex)}
													key={indx}
													className={cn('w-8 h-8 rounded-full hover:opacity-80', selectedColor === color.codeHex && 'ring-2 ring-black')}
													style={{ backgroundColor: color.codeHex }}
												/>
											))}
										</div>
									</div>
								)}

								{/* Size Selection */}
								{productData.Sizes.length > 0 && (
									<div className="mb-6">
										<h3 className="font-medium mb-2">Choose Size</h3>
										<div className="flex gap-2">
											{productData.Sizes.map((size, indx) => (
												<button
													key={indx}
													// onClick={() => setSelectedSize(size.sizeCode || size.waistSize || size.sizeNumber)}
													className={cn('w-8 h-8 rounded-full ring-2 ring-black hover:opacity-80')}>
													{size.sizeCode || size.waistSize || size.sizeNumber || `W: ${size.width} H: ${size.height}`}
												</button>
											))}
										</div>
									</div>
								)}

								{/* Add to Cart */}
								<div className="flex gap-4 mb-8">
									<div className="flex items-center border rounded-md">
										<button className="px-3 py-2">
											<Minus
												className="w-5 h-5"
												onClick={() => {
													if (selectedQuantity <= 1) return
													setSelectedQuantity(selectedQuantity - 1)
												}}
											/>
										</button>
										<span className="px-4 py-2">{selectedQuantity}</span>
										<button className="px-3 py-2">
											<Plus
												className="w-5 h-5"
												onClick={() => {
													if (productData.stock <= selectedQuantity) return
													setSelectedQuantity(selectedQuantity + 1)
												}}
											/>
										</button>
									</div>
									<Button className="w-full" onClick={handleAddToCart}>
										Add to Cart
									</Button>
								</div>
							</div>
						</div>

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
