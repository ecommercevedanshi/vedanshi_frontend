import { apiSlice } from "../../app/api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    initiatePayment: builder.mutation({
      query: (body) => ({
        url: "/payment/initiate",
        method: "POST",
        body, // { orderId }  ← the human-readable ORD-2024-000001, not _id
      }),
    }),

  }),
});

export const { useInitiatePaymentMutation } = paymentApiSlice;