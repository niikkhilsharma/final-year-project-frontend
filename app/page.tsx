import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Heart, ChevronRight, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Hero from '@/components/homepage/hero'
import Footer from '@/components/homepage/footer'
import prisma from '@/lib/prisma'
import Qr from '@/components/qr'

export default async function Page() {
	const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://rtu.techsolutions.services'
	const products = await prisma.product.findMany()

	const categories = [
		{
			name: 'Electronics',
			image: '/images/Electronics.jpeg',
		},
		{
			name: 'Clothing',
			image: '/images/Clothing.jpeg',
		},
		{
			name: 'Accessories',
			image: '/images/accessories.jpeg',
		},
		{
			name: 'Home',
			image: '/images/Home.jpeg',
		},
		{
			name: 'Sports',
			image: '/images/Sports.jpeg',
		},
		{
			name: 'Toys',
			image: '/images/Toys.jpeg',
		},
		{
			name: 'Beauty',
			image: '/images/beauty.jpeg',
		},
		{
			name: 'Books',
			image: '/images/books.jpeg',
		},
	]

	return (
		<div className="flex min-h-[100svh] flex-col">
			<main className="flex-1">
				<Hero />

				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl">
									Browse our wide selection of products across different categories.
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
							{categories.map(category => (
								<Link key={category.name} href="#" className="group relative overflow-hidden rounded-lg">
									<Image
										src={category.image}
										alt={category.name}
										width={300}
										height={300}
										className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black/40 flex items-end p-4">
										<div>
											<h3 className="font-medium text-white">{category.name}</h3>
											<span className="text-sm text-white/80 flex items-center">
												Shop now <ChevronRight className="h-4 w-4 ml-1" />
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>

				<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="container mx-auto px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl">Check out our most popular items this season.</p>
							</div>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
							{products.map(product => (
								<div key={product.id} className="group relative overflow-hidden rounded-lg border bg-background">
									<Link href={`/product?id=${product.id}`} className="relative block overflow-hidden">
										<Image
											src={product.mainImage || '/placeholder.svg'}
											alt={product.name}
											width={300}
											height={300}
											className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										{/* {product.discount && <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>} */}
										<Button
											size="icon"
											variant="secondary"
											className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
											<Heart className="h-4 w-4" />
											<span className="sr-only">Add to wishlist</span>
										</Button>
									</Link>
									<div className="p-4">
										<h3 className="font-medium">{product.name}</h3>
										<div className="flex items-center gap-2 mt-1">
											{product.price && <span className="font-medium">₹{product.price.toFixed(2)}</span>}
										</div>
										<div className="mt-4 flex items-center justify-between">
											{/* <div className="flex items-center text-sm text-yellow-500">
												{'★'.repeat(product.rating || 0)}
												{'☆'.repeat(5 - product.rating)}
												<span className="ml-1 text-muted-foreground">({product.reviews})</span>
											</div> */}

											<Qr key={product.id} productName={product.name} link={origin + '/product?id=' + product.id} />

											<Button size="sm" variant="secondary">
												<ShoppingCart className="mr-2 h-4 w-4" />
												Add
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="flex justify-center mt-10">
							<Button size="lg">
								View All Products
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					</div>
				</section>

				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container mx-auto px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<Badge className="inline-block">Limited Time</Badge>
									<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Summer Sale Up To 50% Off</h2>
									<p className="max-w-[600px] text-muted-foreground md:text-xl">
										Don&apos;t miss out on our biggest sale of the season. Get your favorite items at unbeatable prices.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Button size="lg">Shop Sale</Button>
								</div>
							</div>
							<Image
								src="/placeholder.svg?height=400&width=600"
								width={600}
								height={400}
								alt="Sale Banner"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
							/>
						</div>
					</div>
				</section>

				<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="container mx-auto  px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl">
									Don&apos;t just take our word for it. Here&apos;s what our customers have to say.
								</p>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
							{testimonials.map((testimonial, index) => (
								<div key={index} className="rounded-lg border bg-background p-6">
									<div className="flex items-center gap-4 mb-4">
										<Image
											src={testimonial.avatar || '/placeholder.svg'}
											alt={testimonial.name}
											width={50}
											height={50}
											className="rounded-full"
										/>
										<div>
											<h3 className="font-medium">{testimonial.name}</h3>
											<div className="text-sm text-yellow-500">{'★'.repeat(5)}</div>
										</div>
									</div>
									<p className="text-muted-foreground">{testimonial.content}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="w-full py-12 md:py-24 lg:py-32 border-t">
					<div className="container mx-auto  grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Subscribe to Our Newsletter</h2>
							<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
								Stay updated with our latest products, deals, and fashion tips.
							</p>
						</div>
						<div className="mx-auto w-full max-w-sm space-y-2">
							<form className="flex gap-2">
								<Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
								<Button type="submit">Subscribe</Button>
							</form>
							<p className="text-xs text-muted-foreground">
								By subscribing, you agree to our{' '}
								<Link href="#" className="underline underline-offset-2">
									Terms & Conditions
								</Link>
							</p>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	)
}

const testimonials = [
	{
		name: 'Sarah Johnson',
		avatar: '/placeholder.svg?height=50&width=50',
		content:
			'I love the quality of the clothes! Fast shipping and excellent customer service. Will definitely shop here again.',
	},
	{
		name: 'Michael Brown',
		avatar: '/placeholder.svg?height=50&width=50',
		content: 'The return process was so easy and the customer service team was very helpful. Great experience overall!',
	},
	{
		name: 'Emily Davis',
		avatar: '/placeholder.svg?height=50&width=50',
		content: "Found some unique pieces that I couldn't find anywhere else. The quality is amazing and worth every penny.",
	},
]
