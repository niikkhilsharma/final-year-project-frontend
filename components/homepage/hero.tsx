import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Hero = () => {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<Badge className="inline-block">New Season</Badge>
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Discover Our Latest Collection</h1>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Shop the latest trends and find your perfect style. Free shipping on orders over $50.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<Button size="lg">Shop Now</Button>
							<Button size="lg" variant="outline">
								View Deals
							</Button>
						</div>
					</div>
					<Image
						src="/images/hero-img.png?height=550&width=550"
						width={550}
						height={550}
						alt="Hero Image"
						className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last object-right-top"
					/>
				</div>
			</div>
		</section>
	)
}

export default Hero
