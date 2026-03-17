import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  isOpen: false,
};

const saveCart = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {

      const item = action.payload;

      const existing = state.items.find(
        (i) =>
          i.productId === item.productId &&
          i.variantId === item.variantId
      );

      if (existing) {
        existing.qty += item.qty;
      } else {
        state.items.push(item);
      }

      saveCart(state.items);

      state.isOpen = true;
    },

    removeCart: (state, action) => {

      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      saveCart(state.items);
    },

    changeQty: (state, action) => {

      const { id, qty } = action.payload;

      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.qty = qty;
      }

      saveCart(state.items);
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },

  },
});

export const {
  addToCart,
  removeCart,
  changeQty,
  openCart,
  closeCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;