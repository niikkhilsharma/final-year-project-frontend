import React from 'react'
import { Suspense } from 'react'
import SignIn from './sign-in'

const SignInPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SignIn />
		</Suspense>
	)
}

export default SignInPage
