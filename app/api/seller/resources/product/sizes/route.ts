export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const category = searchParams.get('category')
	console.log(category)
	if (!category) return new Response(JSON.stringify({ message: 'No category provided' }), { status: 400 })

	const sizes = [
		{
			name: 'Small',
			sizeCode: 'S',
			checked: true,
		},
		{
			name: 'Medium',
			sizeCode: 'M',
			checked: true,
		},
		{
			name: 'Large',
			sizeCode: 'L',
			checked: true,
		},
		{
			name: 'X-Large',
			sizeCode: 'XL',
			checked: true,
		},
	]

	return new Response(JSON.stringify(sizes), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
