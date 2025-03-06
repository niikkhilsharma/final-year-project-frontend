import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { Product } from "../lib/product"

export default function ProductCard({ product }: { product: Product }) {
  const { id, name, price, originalPrice, discount, rating, maxRating, image, color } = product

  return (
    <div className="group">
      <Link href={`/product/${id}`} className="block">
        <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={400}
            height={400}
            className="w-full h-auto object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-medium mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">
            {rating}/{maxRating}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">${price}</span>
          {originalPrice && <span className="text-gray-500 line-through">${originalPrice}</span>}
          {discount && <span className="text-red-500 text-sm">-{discount}%</span>}
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Color: <span className="capitalize">{color}</span>
        </div>
      </Link>
    </div>
  )
}

