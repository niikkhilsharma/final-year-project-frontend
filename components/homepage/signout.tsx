'use client'

import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'next-auth'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export function SignOut({ user }: { user: User | null }) {
	return (
		<div className="flex items-center">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={user?.image || 'https://github.com/shadcn.png'} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Link href={'/profile'}>Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							signOut({ redirectTo: '/' })
						}}>
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
