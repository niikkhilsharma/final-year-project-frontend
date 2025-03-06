"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronLeft, ChevronRight, Search, ShoppingCart, User, X } from "lucide-react"
import { Slider } from "./ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "./product_card"
import { products, COLORS, SIZES, type Product } from "../lib/product"

export default function CategoryPage() {
  const [priceRange, setPriceRange] = useState([50, 200])
  const [showNotification, setShowNotification] = useState(true)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [isFiltering, setIsFiltering] = useState(false)

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors((prev) => {
      const newColors = prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
      return newColors
    })
    setIsFiltering(true)
  }

  // Toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => {
      const newSizes = prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
      return newSizes
    })
    setIsFiltering(true)
  }

  // Apply all filters
  const applyFilters = () => {
    setIsFiltering(true)

    const filtered = products.filter((product) => {
      // Filter by price
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Filter by color
      const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color)

      // Filter by size
      const sizeMatch = selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size))

      return priceMatch && colorMatch && sizeMatch
    })

    setFilteredProducts(filtered)
  }

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([50, 200])
    setSelectedColors([])
    setSelectedSizes([])
    setFilteredProducts(products)
    setIsFiltering(false)
  }

  // Apply filters automatically when price range changes
  useEffect(() => {
    // Filter products whenever price range changes
    const filtered = products.filter((product) => {
      // Filter by price
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Filter by color
      const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color)

      // Filter by size
      const sizeMatch = selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size))

      return priceMatch && colorMatch && sizeMatch
    })

    setFilteredProducts(filtered)
  }, [priceRange, selectedColors, selectedSizes])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Notification bar */}
      {showNotification && (
        <div className="relative bg-black text-white text-center py-2 text-sm">
          <div className="container mx-auto">
            Sign up and get 20% off to your first order.{" "}
            <Link href="#" className="underline font-medium">
              Sign Up Now
            </Link>
          </div>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowNotification(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-2xl">
              SHOP.CO
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <div className="relative group">
                <button className="flex items-center gap-1 font-medium">
                  Shop <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <Link href="/sale" className="font-medium">
                On Sale
              </Link>
              <Link href="/new-arrivals" className="font-medium">
                New Arrivals
              </Link>
              <Link href="/brands" className="font-medium">
                Brands
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-[300px] lg:w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input className="pl-10 bg-gray-100 border-none rounded-full" placeholder="Search for products..." />
            </div>
            <Link href="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/account" aria-label="User account">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 text-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-gray-500 hover:text-black">
            Home
          </Link>
          <span className="text-gray-500">&gt;</span>
          <span className="font-medium">Casual</span>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <aside className="w-full md:w-[250px] shrink-0">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Filters</h2>
              <button className="text-gray-400 text-sm underline" onClick={resetFilters}>
                Reset All
              </button>
            </div>

            {/* Price filter */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Price</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="px-2">
                <Slider
                  defaultValue={[50, 200]}
                  max={300}
                  min={0}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value)
                    setIsFiltering(true)
                  }}
                  className="mb-6"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Colors filter */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Colors</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${color.value} ${
                      selectedColors.includes(color.name) ? "ring-2 ring-offset-2 ring-black" : ""
                    }`}
                    onClick={() => toggleColor(color.name)}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Size filter */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Size</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {SIZES.map((size) => (
                  <button
                    key={size.value}
                    className={`px-2 py-1 rounded-md ${
                      selectedSizes.includes(size.value) ? "bg-black text-white" : "bg-gray-100"
                    } text-center`}
                    onClick={() => toggleSize(size.value)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-black text-white hover:bg-black/90" onClick={applyFilters}>
              Apply Filter
            </Button>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <h1 className="text-2xl font-bold">Casual</h1>
              <div className="flex items-center justify-between">
                {/* <p className="text-sm text-gray-500">
                  Showing 1-{filteredProducts.length} of {filteredProducts.length} Products
                </p> */}
                <div className="flex items-center gap-2 ml-4">
                  {/* <span className="text-sm">Sort by:</span> */}
                  {/* <button className="flex items-center gap-1 text-sm font-medium">
                    Most Popular <ChevronDown className="h-4 w-4" />
                  </button> */}
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products match your filters</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or</p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {/* {filteredProducts.length > 0 && (
              <div className="flex items-center justify-center gap-2 py-6">
                <button className="flex items-center gap-1 px-3 py-1 border rounded text-sm">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-black text-white text-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded text-sm">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded text-sm">3</button>
                <span className="px-1">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded text-sm">8</button>
                <button className="w-8 h-8 flex items-center justify-center rounded text-sm">9</button>
                <button className="w-8 h-8 flex items-center justify-center rounded text-sm">10</button>
                <button className="flex items-center gap-1 px-3 py-1 border rounded text-sm">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )} */}
          </div>
        </div>
      </main>

      {/* Newsletter */}
      <section className="bg-black text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              STAY UP TO DATE ABOUT
              <br />
              OUR LATEST OFFERS
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input className="bg-white text-black" placeholder="Enter your email address" />
              <Button className="bg-white text-black hover:bg-white/90">Subscribe to Newsletter</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="font-bold text-2xl block mb-4">
                SHOP.CO
              </Link>
              <p className="text-gray-500 mb-6">
                We have clothes that suits your style and
                <br />
                which you're proud to wear. From women to men.
              </p>
              <div className="flex items-center gap-4">
                <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full border">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full border">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 6.5H17.51"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full border">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 flex items-center justify-center rounded-full border">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12H22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">COMPANY</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Features</Link>
                </li>
                <li>
                  <Link href="#">Works</Link>
                </li>
                <li>
                  <Link href="#">Career</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">HELP</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#">Customer Support</Link>
                </li>
                <li>
                  <Link href="#">Delivery Details</Link>
                </li>
                <li>
                  <Link href="#">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">FAQ</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#">Account</Link>
                </li>
                <li>
                  <Link href="#">Manage Deliveries</Link>
                </li>
                <li>
                  <Link href="#">Orders</Link>
                </li>
                <li>
                  <Link href="#">Payments</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">RESOURCES</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#">Free eBooks</Link>
                </li>
                <li>
                  <Link href="#">Development Tutorial</Link>
                </li>
                <li>
                  <Link href="#">How to - Blog</Link>
                </li>
                <li>
                  <Link href="#">Youtube Playlist</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">Shop.co © 2000-2023, All Rights Reserved</p>
            {/* <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Image src="/placeholder.svg?height=24&width=40" alt="Visa" width={40} height={24} />
              <Image src="/placeholder.svg?height=24&width=40" alt="Mastercard" width={40} height={24} />
              <Image src="/placeholder.svg?height=24&width=40" alt="PayPal" width={40} height={24} />
              <Image src="/placeholder.svg?height=24&width=40" alt="Apple Pay" width={40} height={24} />
              <Image src="/placeholder.svg?height=24&width=40" alt="Google Pay" width={40} height={24} />
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  )
}

