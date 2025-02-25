import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
	title: 'Forgot Password',
	description: 'Reset your password',
}

export default function ForgotPasswordPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
					<CardDescription>Enter your email address and we&apos;ll send you a link to reset your password</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Button className="w-full">Send reset link</Button>
					<div className="text-sm text-center text-gray-600">
						Remember your password?{' '}
						<Link href="/auth/sign-in" className="text-primary hover:underline">
							Sign in
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
