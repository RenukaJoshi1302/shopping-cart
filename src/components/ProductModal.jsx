function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <div className="modal-image">{product.image}</div>

        <h2>{product.name}</h2>

        <p className="category">{product.category}</p>

        <p>{product.description}</p>

        <h2>₹{product.price.toLocaleString("en-IN")}</h2>

        <p>Stock: {product.stock}</p>

        <button
          className="primary-button"
          disabled={product.stock === 0}
          onClick={() => {
            onAddToCart(product);
            onClose();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductModal;
