import { cn } from '@/lib/utils'
import React from 'react'

const SectionHeading = ({ heading, className = '' }: { heading: string; className?: string }) => {
	return <div className={cn('font-integralCf text-6xl font-bold text-center', className)}>{heading}</div>
}

export default SectionHeading
