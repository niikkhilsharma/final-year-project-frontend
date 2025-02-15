'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Dialog } from '@headlessui/react'
import { X, Upload, ImageIcon } from 'lucide-react'
import Image from 'next/image'

type UploadedImage = {
	file: File
	preview: string
	isMain: boolean
}

export default function ProductImageUpload() {
	const [images, setImages] = useState<UploadedImage[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [currentUploadIndex, setCurrentUploadIndex] = useState<number | null>(null)

	const onDrop = (acceptedFiles: File[]) => {
		const newImages = acceptedFiles.map(file => ({
			file,
			preview: URL.createObjectURL(file),
			isMain: false,
		}))
		setImages(prev => {
			const updatedImages = [...prev, ...newImages].slice(0, 10)
			if (updatedImages.length === 1) {
				updatedImages[0].isMain = true
			}
			return updatedImages
		})
		setIsOpen(false)
	}

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/*': [],
		},
		multiple: true,
	})

	const removeImage = (index: number) => {
		setImages(prev => {
			const newImages = prev.filter((_, i) => i !== index)
			if (prev[index].isMain && newImages.length > 0) {
				newImages[0].isMain = true
			}
			return newImages
		})
	}

	const setMainImage = (index: number) => {
		setImages(prev => prev.map((img, i) => ({ ...img, isMain: i === index })))
	}

	return (
		<div className="my-10 max-w-4xl">
			<h2 className="text-2xl font-bold mb-4">Product Images</h2>
			<div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
						onClick={() => {
							setCurrentUploadIndex(index)
							setIsOpen(true)
						}}>
						{images[index] ? (
							<div className="relative w-full h-full">
								<Image
									src={images[index].preview || '/placeholder.svg'}
									alt={`Product image ${index + 1}`}
									fill
									className="object-cover rounded-lg"
								/>
								<button
									className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
									onClick={e => {
										e.stopPropagation()
										removeImage(index)
									}}>
									<X className="w-4 h-4" />
								</button>
								{images[index].isMain && (
									<span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Main</span>
								)}
								{!images[index].isMain && (
									<button
										className="absolute bottom-1 right-1 bg-white text-blue-500 text-xs px-2 py-1 rounded-full shadow-md"
										onClick={e => {
											e.stopPropagation()
											setMainImage(index)
										}}>
										Set as Main
									</button>
								)}
							</div>
						) : (
							<ImageIcon className="w-8 h-8 text-gray-400" />
						)}
					</div>
				))}
			</div>

			<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
						<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
							Upload Image
						</Dialog.Title>
						<div {...getRootProps()} className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer">
							<input {...getInputProps()} />
							<Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
							<p className="text-gray-600">Drag & drop images here, or click to select files</p>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</div>
	)
}
