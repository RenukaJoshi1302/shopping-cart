import { useState } from "react";

function Checkout({ total, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pin: "",
    payment: "COD",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone must contain 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (formData.pin.length !== 6) {
      newErrors.pin = "PIN must contain 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    alert(
      `Order placed successfully!\nTotal: ₹${total.toLocaleString("en-IN")}`,
    );

    onOrderPlaced();
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        {errors.name && <small>{errors.name}</small>}

        <label>Email</label>

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />

        {errors.email && <small>{errors.email}</small>}

        <label>Phone</label>

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10 digit phone number"
          maxLength="10"
        />

        {errors.phone && <small>{errors.phone}</small>}

        <label>Address</label>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />

        {errors.address && <small>{errors.address}</small>}

        <label>City</label>

        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city"
        />

        {errors.city && <small>{errors.city}</small>}

        <label>PIN Code</label>

        <input
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          placeholder="6 digit PIN"
          maxLength="6"
        />

        {errors.pin && <small>{errors.pin}</small>}

        <label>Payment Method</label>

        <select name="payment" value={formData.payment} onChange={handleChange}>
          <option value="COD">Cash on Delivery</option>

          <option value="UPI">UPI</option>

          <option value="CARD">Card</option>
        </select>

        <button className="checkout-button" type="submit">
          Place Order — ₹{total.toLocaleString("en-IN")}
        </button>
      </form>
    </section>
  );
}

export default Checkout;
