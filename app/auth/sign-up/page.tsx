'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
	firstName: z.string().min(3, {
		message: 'First name must be at least 3 characters.',
	}),
	lastName: z.string().min(3, {
		message: 'First name must be at least 3 characters.',
	}),
	email: z.string().email().min(3, {
		message: 'Email must be at least 3 characters long.',
	}),
	password: z.string().min(8, { message: 'Password must be atleast 8 characters long' }),
	isCustomer: z.boolean(),
})

export default function SignUpPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			isCustomer: false,
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { firstName, lastName, email, password, isCustomer } = values
		const data = {
			firstName,
			lastName,
			email,
			password,
			isCustomer,
		}

		const responseData = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		console.log(responseData)
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Create an account</CardTitle>
					<CardDescription>Enter your information to create a new account</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="">
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="Nikhil" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Sharma" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="nikhil@gmail.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="isCustomer"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
										<FormControl>
											<Checkbox checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Are you a here to buy products?</FormLabel>
											<FormDescription>Please check this if you are a customer</FormDescription>
										</div>
									</FormItem>
								)}
							/>
						</CardContent>

						<CardFooter className="flex flex-col space-y-4">
							<Button type="submit" className="w-full">
								Sign up
							</Button>
							<div className="text-sm text-center text-gray-600">
								Already have an account?{' '}
								<Link href="/auth/sign-in" className="text-primary hover:underline">
									Sign in
								</Link>
							</div>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	)
}
