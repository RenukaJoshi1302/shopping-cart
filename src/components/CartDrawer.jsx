import Cart from "./Cart";
import CartSummary from "./CartSummary";

function CartDrawer({
  isOpen,
  cart,
  subtotal,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
  onCheckout,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="drawer-overlay">
      <div className="cart-drawer">
        {/* Drawer Header */}
        <div className="drawer-header">
          <h2>🛒 Your Cart</h2>

          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <Cart
          cart={cart}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
          onClearCart={onClearCart}
        />

        {/* Cart Summary */}
        {cart.length > 0 && (
          <CartSummary subtotal={subtotal} onCheckout={onCheckout} />
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
