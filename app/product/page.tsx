export async function ProductPage() {
	const productsDetails = [
		{ name: 'Product 1', price: 100, imageUrl: '/dummy-images/red-t-shirt.png' },
		{ name: 'Product 2', price: 200, imageUrl: '/dummy-images/blue-t-shirt.png' },
		{ name: 'Product 3', price: 300, imageUrl: '/dummy-images/green-t-shirt.png' },
		{ name: 'Product 4', price: 400, imageUrl: '/dummy-images/yellow-t-shirt.png' },
		{ name: 'Product 5', price: 500, imageUrl: '/dummy-images/red-t-shirt.png' },
		{ name: 'Product 6', price: 600, imageUrl: '/dummy-images/blue-t-shirt.png' },
		{ name: 'Product 7', price: 700, imageUrl: '/dummy-images/green-t-shirt.png' },
	]

	return (
		<div>
			<h1>Product Page</h1>
			{productsDetails.map((product, index) => (
				<div key={index}>
					<h2>{product.name}</h2>
					<p>Price: {product.price}</p>
					<img src={product.imageUrl} alt={product.name} />
				</div>
			))}
		</div>
	)
}
