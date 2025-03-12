'use client'

import React, { Suspense, useEffect, useState } from 'react'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Separator } from '@/components/ui/separator'
import { ChevronUp, SlidersHorizontal } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Color, Product, Size } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product-card'

type productType = Product & { colors: Color[]; Sizes: Size[] }

export default function SearchPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Search />
		</Suspense>
	)
}

function Search() {
	const searchParams = useSearchParams()
	const name = searchParams.get('name')
	const category = searchParams.get('category')

	const [availableSizes, setAvailableSizes] = useState<string[]>([])
	const [availableColors, setAvailableColors] = useState<string[]>([])

	const [selectedSizes, setSelectedSizes] = useState<string[]>([])
	const [selectedColors, setSelectedColors] = useState<string[]>([])

	const [maxPrice, setMaxPrice] = useState(0)
	const [minPrice, setMinPrice] = useState(0)
	const defaultValue: [number, number] = [0, 0]
	const [price, setPrice] = useState<[number, number]>(defaultValue)

	const [data, setData] = useState<productType[]>([])
	const [filteredData, setFilteredData] = useState<productType[]>([])
	const [isFiltering, setIsFiltering] = useState(false)

	async function getData() {
		let url = '/api/product'

		if (name) url = url + '?name=' + name
		if (name && category) url = url + '&category=' + category

		const response = await fetch(url)
		const data = await response.json()
		setData(data)
		setFilteredData(data)

		// Settings all the available sizes
		const availSizes: string[] = data.flatMap((product: productType) =>
			product.Sizes.map(size => {
				const sizeValue =
					size.sizeCode ||
					(size.waistSize ? String(size.waistSize) : null) ||
					(size.sizeNumber ? String(size.sizeNumber) : null) ||
					(size.width && size.height ? `W: ${size.width} H: ${size.height}` : null)
				return sizeValue || ''
			}).filter(s => s !== '')
		)
		const uniqueSizes: string[] = [...new Set(availSizes)]
		setAvailableSizes(uniqueSizes)

		// Settings all the available colors
		const availColors: string[] = data.flatMap((product: productType) => product.colors.map(color => color.codeHex))
		const uniqueColors: string[] = [...new Set(availColors)]
		setAvailableColors(uniqueColors)

		// Setting the max and min price
		const prices = data.map((product: productType) => product.price)
		const max = prices.length > 0 ? Math.max(...prices) : 0
		const min = prices.length > 0 ? Math.min(...prices) : 0
		setMaxPrice(max)
		setMinPrice(min)
		setPrice([min, max])
	}

	useEffect(() => {
		getData()
	}, [name, category])

	const toggleColorSelection = (color: string) => {
		setSelectedColors(prev => (prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]))
	}

	const toggleSizeSelection = (size: string) => {
		setSelectedSizes(prev => (prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]))
	}

	const applyFilters = () => {
		setIsFiltering(true)

		const filtered = data.filter((product: productType) => {
			// Price filter
			const priceInRange = product.price >= price[0] && product.price <= price[1]

			// Color filter
			const colorMatch = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color.codeHex))

			// Size filter
			const productSizes = product.Sizes.map(size => {
				return (
					size.sizeCode ||
					(size.waistSize ? String(size.waistSize) : null) ||
					(size.sizeNumber ? String(size.sizeNumber) : null) ||
					(size.width && size.height ? `W: ${size.width} H: ${size.height}` : null) ||
					''
				)
			}).filter(s => s !== '')

			const sizeMatch = selectedSizes.length === 0 || productSizes.some(size => selectedSizes.includes(size))

			return priceInRange && colorMatch && sizeMatch
		})

		setFilteredData(filtered)
		setIsFiltering(false)
	}

	const resetFilters = () => {
		setSelectedColors([])
		setSelectedSizes([])
		setPrice([minPrice, maxPrice])
		setFilteredData(data)
	}

	return (
		<MaxWidthWrapper className="flex gap-4 py-10">
			<div className="w-1/4 rounded-2xl px-6 py-8 border space-y-4">
				<h3 className="flex text-xl justify-between items-center font-semibold">
					Filters <SlidersHorizontal className="rotate-90 text-gray-500" />
				</h3>
				<Separator />

				<div>
					<h3 className="flex text-xl justify-between items-center font-semibold">
						Price <ChevronUp />
					</h3>
					<Slider
						className="my-4"
						defaultValue={[minPrice, maxPrice]}
						min={minPrice}
						max={maxPrice}
						step={1}
						value={price}
						onValueChange={vals => setPrice(vals as [number, number])}
					/>
					<p className="text-sm text-gray-500">
						${price[0]} - ${price[1]}{' '}
					</p>
				</div>

				<Separator />
				<div>
					<h3 className="flex text-xl justify-between items-center font-semibold">
						Colors <ChevronUp />
					</h3>
					<div className="flex flex-wrap gap-2 mt-4">
						{availableColors.map((color, index) => (
							<div
								key={index}
								style={{ backgroundColor: color }}
								className={`w-7 h-7 hover:cursor-pointer hover:opacity-80 rounded-full ${
									selectedColors.includes(color) ? 'ring-2 ring-blue-500 ring-offset-2' : 'ring-2 ring-black ring-offset-1'
								}`}
								onClick={() => toggleColorSelection(color)}></div>
						))}
					</div>
				</div>
				<Separator />
				<div>
					<h3 className="flex text-xl justify-between items-center font-semibold">
						Size <ChevronUp />
					</h3>
					<div className="flex gap-2 flex-wrap mt-4">
						{availableSizes.map((size, indx) => (
							<Button
								key={indx}
								variant={selectedSizes.includes(size) ? 'default' : 'outline'}
								className="px-4 py-2 rounded-full border text-sm hover:cursor-pointer"
								onClick={() => toggleSizeSelection(size)}>
								{size}
							</Button>
						))}
					</div>
				</div>
				<Separator />
				<div className="flex gap-2">
					<Button className="flex-1 rounded-full mt-2" onClick={applyFilters} disabled={isFiltering}>
						{isFiltering ? 'Filtering...' : 'Apply Filters'}
					</Button>
					<Button variant="outline" className="rounded-full mt-2" onClick={resetFilters}>
						Reset
					</Button>
				</div>
			</div>
			<div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredData.length > 0 ? (
					filteredData.map((product, index) => (
						<ProductCard
							key={index}
							mainImageUrl={product.mainImage}
							heading={product.name}
							price={product.price}
							id={product.id}
						/>
					))
				) : (
					<div className="col-span-full text-center py-12">
						<h3 className="text-xl font-semibold">No products match your filters</h3>
						<p className="text-gray-500 mt-2">Try adjusting your filter criteria</p>
						<Button variant="outline" className="mt-4" onClick={resetFilters}>
							Reset Filters
						</Button>
					</div>
				)}
			</div>
		</MaxWidthWrapper>
	)
}
