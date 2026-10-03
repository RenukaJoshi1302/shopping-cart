function ProductCard({
  product,
  onAddToCart,
  onViewProduct,
  isWishlisted,
  onToggleWishlist,
}) {
  return (
    <div className="product-card">
      <button
        className="wishlist-button"
        onClick={() => onToggleWishlist(product.id)}
      >
        {isWishlisted ? "❤️" : "♡"}
      </button>

      <div className="product-image" onClick={() => onViewProduct(product)}>
        {product.image}
      </div>

      <h3>{product.name}</h3>

      <p className="category">{product.category}</p>

      <p className="description">{product.description}</p>

      <h3>₹{product.price.toLocaleString("en-IN")}</h3>

      <p className="stock">
        {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
      </p>

      <button
        className="primary-button"
        disabled={product.stock === 0}
        onClick={() => onAddToCart(product)}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>

      <button
        className="secondary-button"
        onClick={() => onViewProduct(product)}
      >
        View Details
      </button>
    </div>
  );
}

export default ProductCard;
