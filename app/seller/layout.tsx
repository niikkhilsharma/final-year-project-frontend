import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/seller/app-sidebar'
import SidebarToggle from '@/components/sidebar-toggle'

export const metadata: Metadata = {
	title: 'Sell your products here',
	description: 'The best local seller platform',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<div className="w-full">
				<SidebarToggle showToggleOnCollapse={false} />
				{children}
			</div>
		</SidebarProvider>
	)
}
