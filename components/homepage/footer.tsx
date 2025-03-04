import React from 'react'
import Link from 'next/link'

const Footer = () => {
	return (
		<div>
			<footer className="w-full border-t px-4 py-6 md:py-0">
				<div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row md:justify-between">
					<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
						<Link href="/" className="flex items-center space-x-2">
							<span className="text-lg font-bold">ShopNow</span>
						</Link>
						<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
							&copy; {new Date().getFullYear()} ShopNow. All rights reserved.
						</p>
					</div>
					<div className="flex gap-4">
						<Link href="#" className="text-sm font-medium">
							Terms
						</Link>
						<Link href="#" className="text-sm font-medium">
							Privacy
						</Link>
						<Link href="#" className="text-sm font-medium">
							Contact
						</Link>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Footer
