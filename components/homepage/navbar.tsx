import Link from 'next/link'
import { ShoppingCart, Search, Heart, Menu, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Navbar = async () => {
	return (
		<div className="border-b">
			<div className="container px-4 mx-auto sticky top-0 z-50 w-full bg-background">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-6 md:gap-10">
						<Link href="/" className="flex items-center space-x-2">
							<span className="text-xl font-bold">ShopNow</span>
						</Link>
						<nav className="hidden md:flex gap-6">
							<Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
								Home
							</Link>
							<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
								Categories
							</Link>
						</nav>
					</div>
					<div className="hidden md:flex items-center gap-4">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input type="search" placeholder="Search products..." className="w-[200px] lg:w-[300px] pl-8" />
						</div>
						<Button variant="ghost" size="icon" className="relative">
							<Heart className="h-5 w-5" />
							<span className="sr-only">Wishlist</span>
							<Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">0</Badge>
						</Button>
						<Button variant="ghost" size="icon" className="relative">
							<ShoppingCart className="h-5 w-5" />
							<span className="sr-only">Cart</span>
							<Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">0</Badge>
						</Button>
						<Button>Sign In</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant={'outline'}>
									Continue as Seller <ArrowRight />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>Create an account</DropdownMenuItem>
								<DropdownMenuItem>Already a seller</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
