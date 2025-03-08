'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MaxWidthWrapper from '../max-width-wrapper'
import { cn } from '@/lib/utils'

const Header = () => {
	const [active, setActive] = React.useState(true)

	return (
		<div className={cn('bg-foreground w-full', !active && 'hidden')}>
			<MaxWidthWrapper className="flex items-center gap-4">
				<p className="text-white text-center py-2 flex-1">
					Sign up and get 20% off to your first order.{' '}
					<Link href={'/sign-up'} className="underline block sm:inline">
						Sign Up Now
					</Link>
				</p>
				<Plus onClick={() => setActive(!active)} className="text-white text-2xl rotate-45 cursor-pointer" />
			</MaxWidthWrapper>
		</div>
	)
}

export default Header
