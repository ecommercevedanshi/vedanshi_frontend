import { apiSlice } from "../../app/api/apiSlice";
// import { saveAuthToCookie } from "../../utils/authCookies";
import { setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/user/isVerify",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
         const user = data.data;

          // only update auth if register OTP
          if (arg.otpType === "register") {
            dispatch(
              setCredentials(
                user),
            );
          }

          // saveAuthToCookie(user);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/user/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
  query: (data) => ({
    url: "/user/login",
    method: "POST",
    body: { ...data, role: 1 },
  }),
  async onQueryStarted(_, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      console.log("Full login response:", data);        // check shape
      console.log("User data being saved:", data.data); // should have token
      dispatch(setCredentials(data.data));              // data.data = the object with token
    } catch (err) {
      console.log(err);
    }
  },
}),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApiSlice;
