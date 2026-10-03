function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-product">
        <span className="cart-product-image">{item.image}</span>

        <div>
          <h3>{item.name}</h3>

          <p>₹{item.price.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="quantity-controls">
        <button onClick={() => onDecrease(item.id)}>−</button>

        <span>{item.quantity}</span>

        <button
          disabled={item.quantity >= item.stock}
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
      </div>

      <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>

      <button className="remove-button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
