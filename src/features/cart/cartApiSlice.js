import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ================= GET CART ================= */

    getCart: builder.query({
      query: () => ({
        url: "/cart/get-cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    /* ================= ADD ITEM ================= */

    addToCart: builder.mutation({
      query: (body) => ({
        url: "/cart/add-cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    /* ================= UPDATE QTY ================= */

    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/update/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    /* ================= REMOVE ITEM ================= */

    removeCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/remove/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    /* ================= CLEAR CART ================= */

    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    mergeCart: builder.mutation({
      query: (body) => ({
        url: "/cart/merge-cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useMergeCartMutation,
} = cartApiSlice;
