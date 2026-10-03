import CartItem from "./CartItem";

function Cart({ cart, onIncrease, onDecrease, onRemove, onClearCart }) {
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>🛒 Your cart is empty</h2>
        <p>Add some products to your cart.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Your Cart</h2>

        <button className="danger-button" onClick={onClearCart}>
          Clear Cart
        </button>
      </div>

      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default Cart;
