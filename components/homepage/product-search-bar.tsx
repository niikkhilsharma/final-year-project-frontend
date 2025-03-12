'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import type { Product } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import Qr from '../qr'
import { useRouter } from 'next/navigation'

const Productsearchbar = () => {
	const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://rtu.techsolutions.services'
	const router = useRouter()

	const [query, setQuery] = useState('')
	const [products, setProducts] = useState<Product[] | []>([])

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(`/api/product?name=${query}`)
				const data = response.data
				console.log(data)
				setProducts(data)
			} catch (error) {
				setProducts([])
				console.log(error)
			}
		}
		getProducts()
	}, [query])

	return (
		<div className="relative">
			<div className="relative">
				<Search className="absolute left-2.5 top-3 h-4 w-4 text-foreground" />
				<Input
					onChange={e => setQuery(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							router.push('/search?name=' + query)
							setQuery('')
						}
					}}
					type="search"
					value={query}
					placeholder="Search products..."
					className="w-[200px] bg-[#f0f0f0] rounded-md focus-within:bg-white active:bg-white lg:w-[300px] pl-8"
				/>
			</div>
			<div className={cn('hidden w-full bg-background rounded-sm absolute top-[46px] border', query.length > 0 && 'block')}>
				<ul>
					{products.map((p, indx) => (
						<div
							onClick={() => {
								router.push('/product?id=' + p.id)
								setQuery('')
							}}
							key={indx}
							className="text-black text-center h-14 border-b flex gap-4 items-center px-4 py-1 hover:cursor-pointer bg-background hover:bg-foreground/5">
							<Image src={p.mainImage} alt="book" width={50} height={50} className="w-11 h-11 aspect-square" />
							<div className="flex flex-col text-start">
								<p className="font-semibold">{p.name}</p>
								<p>{p.category}</p>
							</div>
							<div className="ml-auto">
								<Qr link={origin + '/product?id=' + p.id} productName={p.name} />
							</div>
						</div>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Productsearchbar
