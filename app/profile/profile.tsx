'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CameraIcon, MapPinIcon, PencilIcon, PhoneIcon, SaveIcon, UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { User } from '@prisma/client'

export function UserProfile({ userData }: { userData: User }) {
	const [user, setUser] = useState(userData)
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState(user)

	const isAdmin = user.role === 'Admin'

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSelectChange = (name: string, value: string) => {
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	// const handleDateChange = (name: string, date: Date | undefined) => {
	// 	if (date) {
	// 		setFormData(prev => ({ ...prev, [name]: date }))
	// 	}
	// }

	const handleSave = async () => {
		try {
			// Prepare data based on user role - exclude irrelevant fields
			const updateData = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				phoneNo: formData.phoneNo,
				gender: formData.gender,
				dob: formData.dob,
				address: formData.address,
			}

			// Only include GST number for Admin role
			if (isAdmin) {
				// @ts-expect-error //ignore
				updateData['gstNumber'] = formData.gstNumber
			}

			// Make API call to update the user
			const response = await fetch(`/api/users/${user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateData),
			})

			if (!response.ok) {
				throw new Error('Failed to update user')
			}

			const updatedUser = await response.json()
			setUser(updatedUser)
			setIsEditing(false)
		} catch (error) {
			console.error('Error updating user:', error)
		}
	}

	const handleCancel = () => {
		setFormData(user)
		setIsEditing(false)
	}

	// Dummy image for users without profile pictures
	const profileImage = user?.image || '/placeholder-avatar.svg'

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Profile</h1>
					<p className="text-muted-foreground">Manage your account settings and preferences.</p>
				</div>
				{!isEditing ? (
					<Button onClick={() => setIsEditing(true)}>
						<PencilIcon className="mr-2 h-4 w-4" />
						Edit Profile
					</Button>
				) : (
					<div className="flex gap-2">
						<Button variant="outline" onClick={handleCancel}>
							Cancel
						</Button>
						<Button onClick={handleSave}>
							<SaveIcon className="mr-2 h-4 w-4" />
							Save Changes
						</Button>
					</div>
				)}
			</div>

			<Tabs defaultValue="personal" className="w-full">
				<TabsList className="grid w-full grid-cols-1">
					<TabsTrigger value="personal">Personal Info</TabsTrigger>
				</TabsList>

				<TabsContent value="personal" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Profile Information</CardTitle>
							<CardDescription>Update your personal details and profile picture.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
								<div className="relative h-32 w-32">
									<Image src={profileImage} alt="Profile" className="rounded-full object-cover" fill />
									{isEditing && (
										<div className="absolute bottom-0 right-0">
											<Button size="icon" variant="outline" className="rounded-full bg-background">
												<CameraIcon className="h-4 w-4" />
												<span className="sr-only">Upload image</span>
											</Button>
										</div>
									)}
								</div>
								<div className="space-y-1">
									<h3 className="text-2xl font-semibold">
										{user.firstName} {user.lastName}
									</h3>
									<div className="flex items-center text-sm text-muted-foreground">
										<UserIcon className="mr-1 h-4 w-4" />
										{user.role}
									</div>
									<div className="flex items-center text-sm text-muted-foreground">
										<MapPinIcon className="mr-1 h-4 w-4" />
										{user.address || 'No address provided'}
									</div>
									<div className="flex items-center text-sm text-muted-foreground">
										<PhoneIcon className="mr-1 h-4 w-4" />
										{user.phoneNo || 'Not provided'}
									</div>
								</div>
							</div>

							<Separator />

							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="firstName">First Name</Label>
									<Input
										id="firstName"
										name="firstName"
										value={formData.firstName}
										onChange={handleInputChange}
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">Last Name</Label>
									<Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={!isEditing} />
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleInputChange}
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phoneNo">Phone Number</Label>
									<Input
										id="phoneNo"
										name="phoneNo"
										value={formData.phoneNo || ''}
										onChange={handleInputChange}
										disabled={!isEditing}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="gender">Gender</Label>
									{isEditing ? (
										<Select value={formData.gender || ''} onValueChange={value => handleSelectChange('gender', value)}>
											<SelectTrigger>
												<SelectValue placeholder="Select gender" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Male">Male</SelectItem>
												<SelectItem value="Female">Female</SelectItem>
												<SelectItem value="Other">Other</SelectItem>
												<SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
											</SelectContent>
										</Select>
									) : (
										<Input id="gender" value={formData.gender || ''} disabled />
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="dob">Date of Birth</Label>
									<div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm">
										{formData.dob ? formData.dob.toLocaleDateString() : 'Not provided'}
									</div>
								</div>

								{/* Only show GST Number for Admin role */}
								{isAdmin && (
									<div className="space-y-2">
										<Label htmlFor="gstNumber">GST Number</Label>
										<Input
											id="gstNumber"
											name="gstNumber"
											value={formData.gstNumber || ''}
											onChange={handleInputChange}
											disabled={!isEditing}
										/>
									</div>
								)}

								<div className="space-y-2">
									<Label htmlFor="role">Role</Label>
									<Input id="role" name="role" value={formData.role} disabled />
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="address">Address</Label>
								<Textarea
									id="address"
									name="address"
									value={formData.address || ''}
									onChange={handleInputChange}
									disabled={!isEditing}
									rows={3}
								/>
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4">
							<div className="flex w-full flex-col space-y-1 text-sm text-muted-foreground">
								<div className="flex justify-between">
									<span>Member since:</span>
									<span>{user.createdAt.toLocaleDateString()}</span>
								</div>
								<div className="flex justify-between">
									<span>Last updated:</span>
									<span>{user.updatedAt.toLocaleDateString()}</span>
								</div>
								{user.emailVerified && (
									<div className="flex justify-between">
										<span>Email verified:</span>
										<span>{user.emailVerified.toLocaleDateString()}</span>
									</div>
								)}
							</div>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Security</CardTitle>
							<CardDescription>Manage your password and account security.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="current-password">Current Password</Label>
								<Input id="current-password" type="password" disabled={!isEditing} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="new-password">New Password</Label>
								<Input id="new-password" type="password" disabled={!isEditing} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirm-password">Confirm New Password</Label>
								<Input id="confirm-password" type="password" disabled={!isEditing} />
							</div>
						</CardContent>
						<CardFooter>
							<Button variant="outline" className="w-full" disabled={!isEditing}>
								Change Password
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
