import { apiSlice } from "../../app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getUserProfile: builder.query({
      query: (id) => `/user/profile/${id}`,
      providesTags: ["Profile"]
    }),

    updateProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/profile/update/${id}`,
        method: "PUT",
        body,
        formData: body instanceof FormData,
      }),
      invalidatesTags: ["Profile"]
    })

  })
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation
} = profileApiSlice;