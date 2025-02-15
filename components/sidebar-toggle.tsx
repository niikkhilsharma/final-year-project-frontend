'use client'
import React from 'react'
import { useSidebar } from '@/components/ui/sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'

const SidebarToggle = ({ showToggleOnCollapse = true }: { showToggleOnCollapse?: boolean }) => {
	const { state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar()

	return (
		<>{showToggleOnCollapse ? state === 'collapsed' && <SidebarTrigger /> : state === 'expanded' && <SidebarTrigger />}</>
	)
}

export default SidebarToggle
