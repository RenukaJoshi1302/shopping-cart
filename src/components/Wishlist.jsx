function Wishlist({ products, wishlist, onRemove }) {
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <section className="wishlist-section">
      <h2>❤️ Wishlist</h2>

      {wishlistProducts.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <div className="wishlist-list">
          {wishlistProducts.map((product) => (
            <div className="wishlist-item" key={product.id}>
              <span>{product.image}</span>

              <strong>{product.name}</strong>

              <span>₹{product.price.toLocaleString("en-IN")}</span>

              <button onClick={() => onRemove(product.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
