'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useRouter } from 'next/navigation'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import axios from 'axios'


const formSchema = z.object({
	email: z.string().email().min(3, {
		message: 'Email must be at least 3 characters long.',
	}),
	password: z.string().min(8, { message: 'Password must be atleast 8 characters long' }),
	mobile: z.number(),
	number: z.string().min(15, { message: "GST must be 15 digit long" }),
})

export default function RegisterPage() {
	const params = useSearchParams()
	const error = params.get('error')
	const [authError, setAuthError] = useState<string | null>(null)
	const router = useRouter()
	const [categories, setCategories] = useState([])

	useEffect(() => {
		async function getAllCategories() {
			const allCategories = await axios.get('http://localhost:3000/api/seller/resources/all-categories')
			setCategories(allCategories.data)
		}
		getAllCategories()
	}, [])


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			number: 0,

		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const res = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirectTo: '/',
		})

		if (res?.error) {
			setAuthError('Invalid email or password. Please try again.')
		} else {
			setAuthError(null)
			router.push('/')
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">Register as Seller</CardTitle>
					<CardDescription className='text-xl font-bold text-center'>Create a New Seller Account</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="">
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="example@gmail.com" {...field} />
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
											<Input type="password" placeholder="enter your password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex justify-start items-center'>
								What are you looking to sell on Flipkart?
							</div>
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Choose a Catergory" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>All Categories</SelectLabel>
										{categories.map((category: string) => <SelectItem key={category} value={category}>{category}</SelectItem>)}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormField
								control={form.control}
								name="number"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Enter GST</FormLabel>
										<FormControl>
											<Input type="number" placeholder="enter GSTIN" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="flex flex-col space-y-4">
							{(authError || error === 'CredentialsSignin') && (
								<p className="text-red-500 text-start text-sm">Invalid email or password. Please try again.</p>
							)}
							<Button className="w-full">Register and Continue</Button>
							<div className="text-sm text-center text-gray-600">
								Already have an account?{' '}
								<Link href="/seller/sign-in" className="text-primary hover:underline">
									Login
								</Link>
							</div>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	)
}
