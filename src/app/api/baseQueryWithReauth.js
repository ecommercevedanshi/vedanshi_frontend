import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthFromCookie, updateAccessToken } from "../../utils/authCookies";

const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl || "http://localhost:3004/api",
  prepareHeaders: (headers) => {

    const auth = getAuthFromCookie();

    if (auth?.accessToken) {
      headers.set("authorization", `Bearer ${auth.accessToken}`);
    }

    return headers;
  }
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 408) {

    const auth = getAuthFromCookie();

    if (!auth?.refreshToken) return result;

    const refreshResult = await baseQuery(
      {
        url: "/user/refresh-token",
        method: "POST",
        body: { refreshToken: auth.refreshToken }
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {

      const newToken = refreshResult.data.token;

      updateAccessToken(newToken);

      result = await baseQuery(args, api, extraOptions);

    }
  }

  return result;
};