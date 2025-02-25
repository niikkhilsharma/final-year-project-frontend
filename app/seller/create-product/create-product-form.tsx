'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import ProductImageUpload from '@/components/product-image-upload'
import { useState, useCallback } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
	title: z.string().min(2).max(50),
	category: z.string({
		required_error: 'Please select an category to display.',
	}),
	brand: z.string().min(2),
	productId: z.string().min(2),
	quantity: z.coerce.number().min(1),
	price: z.string().refine(val => Number(val) > 0, 'Please enter a valid price.'),
	description: z.string().min(10),
})

const CreateProductForm = () => {
	const router = useRouter()
	const [uploadedImages, setUploadedImages] = useState<string[]>([])

	// Memoize the callback to prevent unnecessary re-renders
	const handleUploadComplete = useCallback((urls: string[]) => {
		setUploadedImages(urls)
	}, [])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			brand: '',
			productId: '',
			quantity: 1,
			price: '10',
			description: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Include uploaded images with the form data
		const formData = {
			...values,
			mainImage: uploadedImages[0],
			images: [...uploadedImages.slice(1)],
		}
		console.log(formData)
		const response = await axios.post('/api/seller/product/create', formData)
		console.log(response.data)
		router.push('/')
	}

	const categories = ['Electronics', 'Clothing', 'Accessories', 'Home', 'Sports', 'Toys', 'Beauty', 'Books']

	return (
		<div className="mb-10">
			<h1 className="text-3xl my-4 font-bold">Create Product</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="flex gap-4 w-full">
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Category</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category, indx) => (
												<SelectItem key={indx} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Product title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex gap-4">
						<FormField
							control={form.control}
							name="brand"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Brand</FormLabel>
									<FormControl>
										<Input placeholder="Brand name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="productId"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Product ID</FormLabel>
									<FormControl>
										<Input placeholder="Product ID" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex gap-4">
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Quantity</FormLabel>
									<FormControl>
										<Input type="number" placeholder="Quantity" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input type="number" placeholder="Price" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<ProductImageUpload onUploadComplete={handleUploadComplete} />
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	)
}

export default CreateProductForm
