import ProductCard from "./ProductCard";

function ProductList({
  products,
  onAddToCart,
  onViewProduct,
  wishlist,
  onToggleWishlist,
}) {
  if (products.length === 0) {
    return <p className="empty-message">No products found.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          isWishlisted={wishlist.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}

export default ProductList;
