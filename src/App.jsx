import { useEffect, useState } from "react";

import products from "./data/products";

import Header from "./components/Header";
import ProductList from "./components/ProductList";

import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";

function App() {
  // ==========================================
  // CART
  // ==========================================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ==========================================
  // WISHLIST
  // ==========================================

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // ==========================================
  // RECENTLY VIEWED
  // ==========================================

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem("recentlyViewed");

    return saved ? JSON.parse(saved) : [];
  });

  // ==========================================
  // SEARCH
  // ==========================================

  const [searchText, setSearchText] = useState("");

  // ==========================================
  // CATEGORY
  // ==========================================

  const [category, setCategory] = useState("All");

  // ==========================================
  // SORT
  // ==========================================

  const [sortBy, setSortBy] = useState("default");

  // ==========================================
  // CART DRAWER
  // ==========================================

  const [cartOpen, setCartOpen] = useState(false);

  // ==========================================
  // PRODUCT MODAL
  // ==========================================

  const [selectedProduct, setSelectedProduct] = useState(null);

  // ==========================================
  // CHECKOUT
  // ==========================================

  const [showCheckout, setShowCheckout] = useState(false);

  // ==========================================
  // SAVE CART
  // ==========================================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ==========================================
  // SAVE WISHLIST
  // ==========================================

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ==========================================
  // SAVE RECENTLY VIEWED
  // ==========================================

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  function addToCart(product) {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id,
      );

      // Already in cart
      if (existingProduct) {
        if (existingProduct.quantity >= product.stock) {
          alert("Maximum stock reached");
          return previousCart;
        }

        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      // New product
      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  }

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  function increaseQuantity(id) {
    setCart((previousCart) =>
      previousCart.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.quantity >= item.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  }

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  function decreaseQuantity(id) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  function removeFromCart(id) {
    setCart((previousCart) => previousCart.filter((item) => item.id !== id));
  }

  // ==========================================
  // CLEAR CART
  // ==========================================

  function clearCart() {
    setCart([]);
  }

  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // ==========================================
  // TOGGLE WISHLIST
  // ==========================================

  function toggleWishlist(id) {
    setWishlist((previousWishlist) => {
      if (previousWishlist.includes(id)) {
        return previousWishlist.filter((itemId) => itemId !== id);
      }

      return [...previousWishlist, id];
    });
  }

  // ==========================================
  // REMOVE FROM WISHLIST
  // ==========================================

  function removeFromWishlist(id) {
    setWishlist((previousWishlist) =>
      previousWishlist.filter((itemId) => itemId !== id),
    );
  }

  // ==========================================
  // VIEW PRODUCT
  // ==========================================

  function viewProduct(product) {
    setSelectedProduct(product);

    setRecentlyViewed((previousProducts) => {
      const filtered = previousProducts.filter(
        (item) => item.id !== product.id,
      );

      return [product, ...filtered].slice(0, 4);
    });
  }

  // ==========================================
  // SEARCH + CATEGORY + SORT
  // ==========================================

  let displayedProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // SORT PRODUCTS
  // ==========================================

  if (sortBy === "price-low") {
    displayedProducts = [...displayedProducts].sort(
      (a, b) => a.price - b.price,
    );
  }

  if (sortBy === "price-high") {
    displayedProducts = [...displayedProducts].sort(
      (a, b) => b.price - a.price,
    );
  }

  if (sortBy === "name") {
    displayedProducts = [...displayedProducts].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  // ==========================================
  // FINAL TOTAL
  // ==========================================

  const tax = subtotal * 0.18;

  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 100;

  const total = subtotal + tax + shipping;

  // ==========================================
  // ORDER PLACED
  // ==========================================

  function handleOrderPlaced() {
    setCart([]);

    setShowCheckout(false);

    setCartOpen(false);

    alert("Thank you! Your order has been placed.");
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="app">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        {/* ============================= */}
        {/* SEARCH / FILTER / SORT */}
        {/* ============================= */}

        <section className="controls">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search products..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All Categories</option>

            <option value="Mobile">Mobile</option>

            <option value="Laptop">Laptop</option>

            <option value="Audio">Audio</option>

            <option value="Wearable">Wearable</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="default">Sort: Default</option>

            <option value="price-low">Price: Low → High</option>

            <option value="price-high">Price: High → Low</option>

            <option value="name">Name A → Z</option>
          </select>
        </section>

        {/* ============================= */}
        {/* PRODUCTS */}
        {/* ============================= */}

        <section>
          <h2>Products</h2>

          <ProductList
            products={displayedProducts}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />
        </section>

        {/* ============================= */}
        {/* RECENTLY VIEWED */}
        {/* ============================= */}

        {recentlyViewed.length > 0 && (
          <section className="recent-section">
            <h2>Recently Viewed</h2>

            <div className="recent-list">
              {recentlyViewed.map((product) => (
                <div
                  className="recent-card"
                  key={product.id}
                  onClick={() => viewProduct(product)}
                >
                  <span>{product.image}</span>

                  <strong>{product.name}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================= */}
        {/* WISHLIST */}
        {/* ============================= */}

        <Wishlist
          products={products}
          wishlist={wishlist}
          onRemove={removeFromWishlist}
        />

        {/* ============================= */}
        {/* CHECKOUT */}
        {/* ============================= */}

        {showCheckout && cart.length > 0 && (
          <Checkout total={total} onOrderPlaced={handleOrderPlaced} />
        )}
      </main>

      {/* ============================= */}
      {/* PRODUCT MODAL */}
      {/* ============================= */}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* ============================= */}
      {/* CART DRAWER */}
      {/* ============================= */}

      <CartDrawer
        isOpen={cartOpen}
        cart={cart}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onClearCart={clearCart}
        onCheckout={() => {
          setCartOpen(false);
          setShowCheckout(true);
        }}
      />
    </div>
  );
}

export default App;
