import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/seller/app-sidebar'
import SidebarToggle from '@/components/sidebar-toggle'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Sell your products here',
	description: 'The best local seller platform',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()
	const user = session?.user

	if (user && !(user?.role === 'Seller')) {
		return redirect('/')
	}

	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			{user && <AppSidebar />}
			<div className="w-full">
				<SidebarToggle showToggleOnCollapse={false} />
				{children}
			</div>
		</SidebarProvider>
	)
}
