import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MaxWidthWrapper from '../max-width-wrapper'

const Header = () => {
	return (
		<div className="bg-foreground w-full">
			<MaxWidthWrapper className="flex items-center gap-4">
				<p className="text-white text-center py-2 flex-1">
					Sign up and get 20% off to your first order.{' '}
					<Link href={'/sign-up'} className="underline block sm:inline">
						Sign Up Now
					</Link>
				</p>
				<Plus className="text-background rotate-45" />
			</MaxWidthWrapper>
		</div>
	)
}

export default Header
