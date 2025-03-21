import { auth } from '@/auth'
import Link from 'next/link'
import { ShoppingCart, Menu, ArrowRight } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Productsearchbar from './product-search-bar'
import { SignOut } from './signout'

const Navbar = async () => {
	const session = await auth()
	const user = session?.user

	return (
		<div className="border-b">
			<div className="container px-4 mx-auto sticky top-0 z-50 w-full bg-background">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-6 md:gap-10">
						<Link href="/" className="flex items-center space-x-2">
							<span className="text-xl font-bold">Shop.co</span>
						</Link>
						<nav className="hidden md:flex gap-6">
							<Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
								Home
							</Link>
							<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
								Categories
							</Link>
							<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
								New Arrivals
							</Link>
							<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
								Brands
							</Link>
						</nav>
					</div>
					<div className="hidden md:flex items-center gap-4">
						<Productsearchbar />
						{session?.user?.role === 'Seller' && (
							<Link href={'/seller/create-product'} className={buttonVariants({ variant: 'default' })}>
								Create Product
							</Link>
						)}
						<Link href={'/cart'} className={buttonVariants({ variant: 'ghost' })}>
							<ShoppingCart className="h-5 w-5" />
							<span className="sr-only">Cart</span>
						</Link>
						{!user && (
							<Link href={'/customer/sign-in'} className={buttonVariants({ variant: 'default' })}>
								Sign In
							</Link>
						)}
						{!user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant={'outline'}>
										Continue as Seller <ArrowRight />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>
										<Link href={'/seller/register'}>Create an account</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href={'/seller/sign-in'}>Already a seller</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<SignOut user={user} />
						)}
					</div>
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
