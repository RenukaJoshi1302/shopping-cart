function Header({ cartCount, wishlistCount, onOpenCart }) {
  return (
    <header className="header">
      <div>
        <h1>🛍️ ShopZone</h1>
        <p>Simple React Shopping Cart</p>
      </div>

      <div className="header-actions">
        <span className="wishlist-badge">❤️ {wishlistCount}</span>

        <button className="cart-button" onClick={onOpenCart}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  );
}

export default Header;
