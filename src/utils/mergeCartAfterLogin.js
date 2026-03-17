import { clearCart } from "../features/cart/cartSlice";

export const mergeCartAfterLogin = async ({
  dispatch,
  mergeCartApi,
}) => {

  const guestCart = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (!guestCart.length) return;

  const items = guestCart.map((item) => ({
    productId: item.productId,
    variantId: item.variantId,
    qty: item.qty,
  }));

  try {

    await mergeCartApi({ items }).unwrap();

    // clear local cart
    dispatch(clearCart());

    localStorage.removeItem("cartItems");

  } catch (err) {
    console.log("Cart merge failed", err);
  }

};