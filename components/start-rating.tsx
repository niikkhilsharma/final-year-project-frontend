import { useState } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
	totalStars?: number
	readOnly?: boolean
	rating?: number
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, readOnly = false, rating: initialRating = 0 }) => {
	const [rating, setRating] = useState(initialRating)
	const [hover, setHover] = useState(0)

	return (
		<div className="flex space-x-2">
			{Array.from({ length: totalStars }, (_, index) => {
				const starValue = index + 1

				return (
					<Star
						key={starValue}
						onClick={!readOnly ? () => setRating(starValue) : undefined}
						onMouseEnter={!readOnly ? () => setHover(starValue) : undefined}
						onMouseLeave={!readOnly ? () => setHover(0) : undefined}
						className={`h-6 w-6 ${readOnly ? '' : 'cursor-pointer'} transition-colors ${
							starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
						}`}
						fill={starValue <= (hover || rating) ? 'currentColor' : 'none'}
					/>
				)
			})}
			<p className="ml-2 text-lg">{`${rating}/${totalStars}`}</p>
		</div>
	)
}

export default StarRating
