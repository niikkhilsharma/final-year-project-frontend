import React from 'react'
import Image from 'next/image'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Button } from '@/components/ui/button'
import Counter from '@/components/counter'
import { Plus } from 'lucide-react'

const Hero = () => {
	const records = [
		{ count: 200, text: 'International Brands' },
		{ count: 2000, text: 'High-Quality Products' },
		{ count: 30000, text: 'Happy Customers' },
	]

	return (
		<div className="bg-[#F2F0F1]">
			<MaxWidthWrapper className="relative">
				<div className="flex flex-col gap-8 absolute top-0 h-full my-auto justify-center">
					<p className="font-integralCf text-6xl font-bold max-w-[12ch]">FIND CLOTHES THAT MATCHES YOUR STYLE</p>
					<p className="max-w-[60ch] text-muted-foreground">
						Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to
						your sense of style.
					</p>
					<Button className="rounded-full w-fit px-12">Shop Now</Button>
					<div className="flex gap-8 mt-6">
						{records.map((count, indx) => (
							<div key={indx}>
								<span className="flex gap-1 text-5xl flex-col font-bold items-start justify-center">
									<div>
										<Counter value={count.count} /> <span className="font-extrabold -ml-2">+</span>
									</div>
									<p className="text-base font-normal text-start text-muted-foreground">{count.text}</p>
								</span>
							</div>
						))}
					</div>
				</div>
				<Image src={'/images/hero-img.png'} width={1440} height={663} alt="trendy fashionable couple" />
			</MaxWidthWrapper>
		</div>
	)
}

export default Hero
