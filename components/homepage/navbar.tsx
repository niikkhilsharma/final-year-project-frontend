import React from 'react'
import MaxWidthWrapper from '../max-width-wrapper'
import Image from 'next/image'
import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { auth } from '@/auth'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

const Navbar = async () => {
	const session = await auth()

	return (
		<div className="py-6">
			<MaxWidthWrapper className="flex gap-4 items-center justify-between">
				<Image src={'/images/logo.png'} width={159} height={25} alt="shop.co" unoptimized />

				{session?.user?.role === 'Seller' ? (
					<Link href="/seller/create-product" className={cn('w-64', buttonVariants({ variant: 'outline' }))}>
						Create Product
					</Link>
				) : (
					<Input type="text" placeholder="Search" className="px-4 max-w-96 py-2 border w-full mx-4 rounded-md" />
				)}
				<div className="flex gap-2 items-center">
					<ShoppingCart />
					<CircleUserRound />
				</div>
			</MaxWidthWrapper>
		</div>
	)
}

export default Navbar
