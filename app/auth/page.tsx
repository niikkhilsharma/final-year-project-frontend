'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true)
	const router = useRouter()

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-md shadow-lg p-6 bg-white rounded-xl">
				<CardHeader>
					<CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						{!isLogin && (
							<div>
								<label className="block text-sm font-medium text-gray-700">Name</label>
								<Input type="text" placeholder="Your Name" required />
							</div>
						)}
						<div>
							<label className="block text-sm font-medium text-gray-700">Email</label>
							<Input type="email" placeholder="you@example.com" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Password</label>
							<Input type="password" placeholder="••••••••" required />
						</div>
						<Button className="w-full" type="submit">
							{isLogin ? 'Login' : 'Sign Up'}
						</Button>
					</form>
					<p className="mt-4 text-sm text-center text-gray-600">
						{isLogin ? "Don't have an account?" : 'Already have an account?'}
						<Button
							variant="link"
							className="text-blue-600 ml-1"
							onClick={() => {
								router.push('/seller/create-product')
								setIsLogin(!isLogin)
							}}>
							{isLogin ? 'Sign Up' : 'Login'}
						</Button>
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
