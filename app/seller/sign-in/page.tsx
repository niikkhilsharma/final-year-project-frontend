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
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
	email: z.string().email().min(3, {
		message: 'Email must be at least 3 characters long.',
	}),
	password: z.string().min(8, { message: 'Password must be atleast 8 characters long' }),
})

export default function SignInPage() {
	const params = useSearchParams()
	const error = params.get('error')
	const [authError, setAuthError] = useState<string | null>(null)
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
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
					<CardTitle className="text-2xl font-bold">Sign in</CardTitle>
					<CardDescription>Enter your email and password to sign in to your seller account</CardDescription>
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
						</CardContent>
						<CardFooter className="flex flex-col space-y-4">
							{(authError || error === 'CredentialsSignin') && (
								<p className="text-red-500 text-start text-sm">Invalid email or password. Please try again.</p>
							)}
							<Button className="w-full">Sign in</Button>
							<div className="text-sm text-center text-gray-600">
								Don&apos;t have an account?{' '}
								<Link href="/seller/register" className="text-primary hover:underline">
									Register
								</Link>
							</div>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	)
}
