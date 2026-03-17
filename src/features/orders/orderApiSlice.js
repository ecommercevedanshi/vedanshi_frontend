import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ===============================
    // PLACE ORDER
    // ===============================
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/place-order",
        method: "POST",
        body: data,
      }),
       invalidatesTags: ["Cart"],
    }),

    // ===============================
    // GET MY ORDERS
    // ===============================
    getMyOrders: builder.query({
      query: ({ page = 1, limit = 10, status } = {}) => ({
        url: `/orders/my-orders?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`,
      }),
      providesTags: ["Orders"],
    }),

    // ===============================
    // GET ORDER DETAILS
    // ===============================
    getMyOrderById: builder.mutation({
      query: ({ id, orderId }) => ({
        url: `/orders/my/${id}`,
        method: "POST",
        body: { orderId },
      }),
    }),

    // ===============================
    // CANCEL ORDER
    // ===============================
    cancelOrder: builder.mutation({
      query: ({ id, orderId, cancellationReason }) => ({
        url: `/orders/my/${id}/cancel`,
        method: "PATCH",
        body: { orderId, cancellationReason },
      }),
      invalidatesTags: ["Orders"],
    }),

    // ===============================
    // REQUEST RETURN
    // ===============================
    requestReturn: builder.mutation({
      query: ({ id, orderId, returnReason }) => ({
        url: `/orders/my/${id}/return`,
        method: "POST",
        body: { orderId, returnReason },
      }),
      invalidatesTags: ["Orders"],
    }),
    getMyOrderByOrderId: builder.query({
  query: (orderId) => `/orders/my/by-order-id/${orderId}`,
  providesTags: ["Orders"],
}),

  }),
});

export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useGetMyOrderByIdMutation,
  useCancelOrderMutation,
  useRequestReturnMutation,
  useGetMyOrderByOrderIdQuery,
} = orderApiSlice;