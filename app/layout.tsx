import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { integralcf } from './fonts/integralcf'
import './globals.css'
import Providers from './providers'
import Navbar from '@/components/homepage/navbar'
import Header from '@/components/homepage/header'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'AI based Marketplace',
	description: 'Buy and sell your products with AI',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} ${integralcf.variable} antialiased `}>
				<Header />
				<Navbar />
				<Providers>{children}</Providers>
				<Toaster />
				<Analytics />
			</body>
		</html>
	)
}
