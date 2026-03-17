import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../../features/auth/authSlice";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
 prepareHeaders: (headers, { getState }) => {
  let token = getState()?.auth?.user?.token;  // ← "token" not "accessToken"

  if (!token) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    token = storedUser?.token;                // ← same here
  }

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
},
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  let refreshToken = api.getState()?.userAuth?.user?.refreshToken;

  if (!refreshToken) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    refreshToken = storedUser?.refreshToken;
  }

  if (result?.error?.status === 401) {
    console.log("User access token expired. Attempting refresh...");

    const refreshResult = await baseQuery(
      {
        url: "/user/refreshToken",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

   if (refreshResult?.data) {
  api.dispatch(
    setCredentials({
      ...api.getState().auth.user,
      token: refreshResult?.data?.data.accessToken, // ← new token from refresh
    })
  );
  result = await baseQuery(args, api, extraOptions);
} else {
      api.dispatch(logout());
    }
  }

  return result;
};