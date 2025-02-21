'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import ProductImageUpload from '@/components/product-image-upload'

const formSchema = z.object({
	title: z.string().min(2).max(50),
	category: z.string({
		required_error: 'Please select an category to display.',
	}),
	brand: z.string().min(2),
	productId: z.string().min(2),
	quantity: z.number().min(1),
	price: z.number().min(10, { message: 'Price cannot be less than 10' }),
})

const CreateProductForm = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			brand: '',
			productId: '',
			quantity: 1,
			price: 10,
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	const categories = ['Appliances', 'Baby', 'Bags, Wallets and Luggage', 'Books', 'Car & Motorbike', 'Clothing & Accessories']

	return (
		<div className="mb-10">
			<h1 className="text-3xl my-4 font-bold">Create Product</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
												<SelectValue placeholder="Select a verified email to display" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="m@example.com">m@example.com</SelectItem>
											<SelectItem value="m@google.com">m@google.com</SelectItem>
											<SelectItem value="m@support.com">m@support.com</SelectItem>
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
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
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
										<Input placeholder="brand" {...field} />
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
										<Input placeholder="quantity" {...field} />
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
										<Input placeholder="Price" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<ProductImageUpload />
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	)
}

export default CreateProductForm
