import React from 'react'
import MaxWidthWrapper from '../max-width-wrapper'
import Image from 'next/image'
import { CircleUserRound, ShoppingCart } from 'lucide-react'

const Navbar = () => {
	return (
		<div className="py-6">
			<MaxWidthWrapper className="flex gap-4 items-center justify-between">
				<Image src={'/images/logo.png'} width={159} height={25} alt="shop.co" unoptimized />
				<div>Search bar</div>
				<div className="flex gap-2 items-center">
					<ShoppingCart />
					<CircleUserRound />
				</div>
			</MaxWidthWrapper>
		</div>
	)
}

export default Navbar
