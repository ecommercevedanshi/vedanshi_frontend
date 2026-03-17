import { useSelector, useDispatch } from "react-redux";
import {
  closeCart,
  changeQty,
  removeCart,
  clearCart,
} from "../../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";
import { useClearCartMutation, useGetCartQuery, useRemoveCartItemMutation, useUpdateCartItemMutation } from "../../features/cart/cartApiSlice";
import EmptyCart from "./EmptyCart";

export default function CartDrawer() {
  const { items:guestItems, isOpen } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { data: backendCart } = useGetCartQuery(undefined, {
    skip: !user,
  });
  const [updateCart] = useUpdateCartItemMutation();
  const [removeCartItem, {isLoading: removeLoading}] = useRemoveCartItemMutation();
const [clearBackendCart] = useClearCartMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLoginPopup, setShowLoginPopup] = useState(false);
const [countdown, setCountdown] = useState(5);

  const backendItems =
    backendCart?.data?.items?.map((item) => ({
      id: item._id,
      productId: item.product?._id,
      variantId: item.variantId,
      slug: item.product?.slug,
      name: item.productName,
      image: item.imageUrl,
      price: item.price,
      size: item.size,
      qty: item.quantity,
      stock: item.product?.stock || 999,
    })) || [];

    const items = user ? backendItems : guestItems;

      const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const prevCountRef = useRef(null);

useEffect(() => {
  // First render — just record the count, don't fire confetti
  if (prevCountRef.current === null) {
    prevCountRef.current = items.length;
    return;
  }

  if (items.length > prevCountRef.current && isOpen) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.6 },
    });
  }

  prevCountRef.current = items.length;
}, [items.length, isOpen]);

  const handleQtyChange = async (item, newQty) => {

  if (newQty < 1) return;
  if (newQty > item.stock) return;

  // Logged in user → backend
  if (user) {
    try {
      await updateCart({
        itemId: item.id,
        quantity: newQty
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  // Guest user → redux
  else {
    dispatch(
      changeQty({
        id: item.id,
        qty: newQty
      })
    );
  }
};

const handleRemoveItem = async (itemId) => {

  // Logged in user
  if (user) {
    try {
      await removeCartItem(itemId).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  // Guest user
  else {
    dispatch(removeCart(itemId));
  }

};

const handleClearCart = async () => {

  if (!items.length) return;

  if (user) {
    try {
      await clearBackendCart().unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  else {
    dispatch(clearCart());
  }
};

const handleCheckout = () => {

  if (!user) {
    setShowLoginPopup(true);
    setCountdown(5);
    return;
  }

  dispatch(closeCart());
  navigate("/checkout");

};

useEffect(() => {

  if (!showLoginPopup) return;

  if (countdown === 0) {
    setShowLoginPopup(false);
    dispatch(closeCart());
    navigate("/login", { state: { from: "checkout" } });
    return;
  }

  const timer = setTimeout(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);

}, [countdown, showLoginPopup]);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}

      <div
        onClick={() => dispatch(closeCart())}
        className={`absolute inset-0 bg-black/40 transition ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}

      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}

        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-primary">Your Cart</h2>

          <button onClick={() => dispatch(closeCart())}>
            <X size={18} />
          </button>
        </div>

        {/* Items */}

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 ? (
            // <p className="text-textMuted text-sm text-center mt-10">
            //   Your cart is empty
            // </p>
            <EmptyCart onClose={() => dispatch(closeCart())}/>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-3">
                <Link to={`/product/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover"
                  />
                </Link>

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>

                  {item.size && (
                    <p className="text-xs text-textMuted">Size: {item.size}</p>
                  )}

                  {/* Qty */}

                 <div className="flex items-center gap-2 mt-2">

  {/* MINUS */}
  <button
    disabled={item.qty <= 1}
    onClick={() => handleQtyChange(item, item.qty - 1)}
    className={`w-6 h-6 border ${
      item.qty <= 1 ? "opacity-40 cursor-not-allowed" : ""
    }`}
  >
    -
  </button>

  <span>{item.qty}</span>

  {/* PLUS */}
  <button
    disabled={item.qty >= item.stock}
    onClick={() => handleQtyChange(item, item.qty + 1)}
    className={`w-6 h-6 border ${
      item.qty >= item.stock ? "opacity-40 cursor-not-allowed" : ""
    }`}
  >
    +
  </button>

</div>

{item.stock <= 5 && (
  <p className="text-xs text-red-500 mt-1">
    Only {item.stock} left
  </p>
)}
                  <p className="text-sm mt-2">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-xs text-red-500"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}

       <div className="absolute bottom-0 w-full p-4 border-t bg-bgMain">

  <div className="flex justify-between mb-3">
    <span>Subtotal</span>
    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
  </div>

  {/* CLEAR CART */}
  {items.length > 0 && (
    <button
      onClick={handleClearCart}
      className="w-full text-sm mb-2 text-red-500 border border-red-300 py-2 hover:bg-red-50 transition"
    >
      Clear Cart
    </button>
  )}

  {/* CHECKOUT */}
<button
  onClick={handleCheckout}
  disabled={!items.length}
  className={`w-full py-3 text-sm transition ${
    items.length
      ? "bg-primary text-white hover:bg-primaryHover"
      : "bg-gray-300 text-gray-500"
  }`}
>
  CHECKOUT
</button>

</div>
      </div>

      {showLoginPopup && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">

    <div className="bg-white w-[320px] rounded-md p-6 text-center shadow-lg">

      <h3 className="text-lg font-semibold text-primary">
        Login Required
      </h3>

      <p className="text-sm text-textMuted mt-2">
        Please login to continue checkout
      </p>

      <div className="mt-4 text-2xl font-semibold text-primary">
        {countdown}
      </div>

      {/* progress bar */}
      <div className="w-full h-1 bg-gray-200 mt-3">
        <div
          className="h-1 bg-primary transition-all duration-1000"
          style={{ width: `${(countdown / 5) * 100}%` }}
        />
      </div>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => setShowLoginPopup(false)}
          className="flex-1 border py-2 text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setShowLoginPopup(false);
            dispatch(closeCart());
            navigate("/login", { state: { from: "checkout" } });
          }}
          className="flex-1 bg-primary text-white py-2 text-sm"
        >
          Login
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}
