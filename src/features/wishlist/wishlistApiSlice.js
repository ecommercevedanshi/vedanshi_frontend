import { apiSlice } from "../../app/api/apiSlice";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getMyWishlist: builder.query({
      query: ({ page = 1, limit = 20 } = {}) =>
        `/wishlist/get-my-wishlist?page=${page}&limit=${limit}`,
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/add-to-my-wishlist/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/delete-get-wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    checkWishlist: builder.query({
      query: (productId) => `/wishlist/check/${productId}`,
      providesTags: (result, error, productId) => [{ type: "Wishlist", id: productId }],
    }),

    clearWishlist: builder.mutation({
      query: () => ({
        url: `/wishlist/clear-wishlist`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getWishlistIds: builder.query({
  query: () => "/wishlist/my-ids",
  providesTags: ["Wishlist"],
}),

  }),
});

export const {
  useGetMyWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useCheckWishlistQuery,
  useClearWishlistMutation,
  useGetWishlistIdsQuery,
} = wishlistApiSlice;