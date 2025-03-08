"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import type { Product } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
const Productsearchbar = () => {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[] |[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`/api/product?name=${query}`)
      const data = response.data;
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
    <div className='relative'>
      <div className="relative">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-foreground" />
        <Input onChange={(e) => setQuery(e.target.value)}
          type="search"
          value={query}
          placeholder="Search products..."
          className="w-[200px] bg-[#f0f0f0] rounded-md focus-within:bg-white active:bg-white lg:w-[300px] pl-8"
        />

      </div>
      <div className={cn('  hidden w-[300px] bg-background rounded-sm absolute top-[46px',query.length>0 && "block")}>
        <ul>
          {products.map((p, indx) => <li key={indx} className='text-black text-center h-12 border-b flex gap-4 items-center px-4 py-1'>
            <Image src={p.mainImage} alt="book" width={50} height={50} className='w-10 h-10 aspect-square' />
            <div className='flex flex-col '>
              <p> {p.name}
              </p>
              <p>{ p.category}</p>
            </div></li>)}


        </ul>
      </div>
    </div>
  )
}

export default Productsearchbar