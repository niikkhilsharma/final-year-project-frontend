'use client'

import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Product } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

type ProductWithColor = Partial<Product> & { color: string; quantity?: number }

export default function CartPage() {
	const [cartItems, setCartItems] = useState<ProductWithColor[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('cart') || '[]')
		const itemsWithQuantity = items.map((item: ProductWithColor) => ({
			...item,
			quantity: item.quantity || 1,
		}))
		setCartItems(itemsWithQuantity)
		setIsLoading(false)
	}, [])

	const updateCart = (updatedCart: ProductWithColor[]) => {
		setCartItems(updatedCart)
		localStorage.setItem('cart', JSON.stringify(updatedCart))
	}

	const removeItem = (index: number) => {
		const updatedCart = [...cartItems]
		updatedCart.splice(index, 1)
		updateCart(updatedCart)
	}

	const updateQuantity = (index: number, newQuantity: number) => {
		if (newQuantity < 1) return

		const updatedCart = [...cartItems]
		updatedCart[index] = {
			...updatedCart[index],
			quantity: newQuantity,
		}
		updateCart(updatedCart)
	}

	const calculateSubtotal = () => {
		return cartItems.reduce((total, item) => {
			return total + Number(item.price) * (item.quantity || 1)
		}, 0)
	}

	const subtotal = calculateSubtotal()
	const shipping = subtotal > 0 ? 99 : 0
	const tax = subtotal * 0.18
	const total = subtotal + shipping + tax

	if (isLoading) {
		return (
			<MaxWidthWrapper className="py-10">
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>
				</div>
			</MaxWidthWrapper>
		)
	}

	return (
		<MaxWidthWrapper className="py-10">
			<h1 className="text-3xl md:text-4xl font-bold mb-6">Your Cart</h1>

			{cartItems.length === 0 ? (
				<div className="text-center py-16 space-y-6">
					<div className="flex justify-center">
						<ShoppingBag className="h-16 w-16 text-muted-foreground" />
					</div>
					<h2 className="text-2xl font-semibold">Your cart is empty</h2>
					<p className="text-muted-foreground max-w-md mx-auto">Looks like you haven&apos;t added anything to your cart yet.</p>
					<Button asChild className="mt-4">
						<Link href="/products">Continue Shopping</Link>
					</Button>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Cart Items */}
					<div className="flex-1">
						<div className="bg-card rounded-xl border shadow-sm">
							<div className="p-6">
								<h2 className="text-xl font-semibold mb-4">Cart Items ({cartItems.length})</h2>
								<Separator className="mb-6" />

								<div className="space-y-6">
									{cartItems.map((item, index) => (
										<div key={index} className="flex flex-col sm:flex-row gap-4">
											<div className="flex-shrink-0">
												<Image
													src={item.mainImage || '/placeholder.svg?height=100&width=100'}
													alt={item.name || 'Product'}
													className="w-24 h-24 object-cover rounded-lg border"
													width={100}
													height={100}
												/>
											</div>

											<div className="flex-1 flex flex-col sm:flex-row justify-between">
												<div className="space-y-1">
													<h3 className="font-medium">{item.name}</h3>
													<p className="text-sm text-muted-foreground">Color: {item.color}</p>
													<p className="font-medium">₹{item.price}</p>
												</div>

												<div className="flex flex-row sm:flex-col justify-between items-end mt-2 sm:mt-0">
													<div className="flex items-center border rounded-md">
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 rounded-none"
															onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}>
															<Minus className="h-3 w-3" />
														</Button>
														<span className="w-8 text-center">{item.quantity || 1}</span>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 rounded-none"
															onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>
															<Plus className="h-3 w-3" />
														</Button>
													</div>

													<Button
														variant="ghost"
														size="sm"
														className="text-destructive hover:text-destructive mt-2"
														onClick={() => removeItem(index)}>
														<Trash2 className="h-4 w-4 mr-1" />
														<span className="text-xs">Remove</span>
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Order Summary */}
					<div className="w-full lg:w-80">
						<div className="bg-card rounded-xl border shadow-sm sticky top-20">
							<div className="p-6">
								<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
								<Separator className="mb-4" />

								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Subtotal</span>
										<span>₹{subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Shipping</span>
										<span>₹{shipping.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Tax (18%)</span>
										<span>₹{tax.toFixed(2)}</span>
									</div>

									<Separator className="my-2" />

									<div className="flex justify-between font-semibold text-lg">
										<span>Total</span>
										<span>₹{total.toFixed(2)}</span>
									</div>
								</div>

								<Button className="w-full mt-6">Proceed to Checkout</Button>

								<div className="mt-4">
									<Button variant="outline" asChild className="w-full">
										<Link href="/products">Continue Shopping</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</MaxWidthWrapper>
	)
}
