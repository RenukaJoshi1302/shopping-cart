import { useState } from "react";

function CartSummary({ subtotal, onCheckout }) {
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const tax = subtotal * 0.18;

  const discount = couponApplied ? subtotal * 0.1 : 0;

  const shipping = subtotal >= 5000 ? 0 : 100;

  const total = subtotal + tax + shipping - discount;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      alert("Invalid coupon");
    }
  }

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal</span>

        <span>₹{subtotal.toLocaleString("en-IN")}</span>
      </div>

      <div className="summary-row">
        <span>Tax (18%)</span>

        <span>₹{tax.toLocaleString("en-IN")}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>

        <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
      </div>

      <div className="coupon-box">
        <input
          type="text"
          placeholder="Coupon: SAVE10"
          value={coupon}
          onChange={(event) => setCoupon(event.target.value)}
        />

        <button onClick={applyCoupon}>Apply</button>
      </div>

      {couponApplied && (
        <p className="success-message">🎉 10% discount applied!</p>
      )}

      <div className="summary-row">
        <span>Discount</span>

        <span className="discount">-₹{discount.toLocaleString("en-IN")}</span>
      </div>

      <hr />

      <div className="summary-total">
        <strong>Total</strong>

        <strong>₹{total.toLocaleString("en-IN")}</strong>
      </div>

      <button className="checkout-button" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartSummary;
