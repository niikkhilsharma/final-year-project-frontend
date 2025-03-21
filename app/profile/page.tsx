import MaxWidthWrapper from '@/components/max-width-wrapper'
import { UserProfile } from './profile'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export default async function ProfilePage() {
	const session = (await auth())!
	const user = session.user!

	const userProfile = await prisma.user.findFirst({
		where: {
			email: user.email!,
		},
	})
	console.log(userProfile)
	return (
		<MaxWidthWrapper className="my-10">
			<UserProfile userData={userProfile!} />
		</MaxWidthWrapper>
	)
}
