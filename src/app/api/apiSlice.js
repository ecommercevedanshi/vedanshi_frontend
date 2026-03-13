// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getAuthFromCookie } from "../../utils/authCookies";

// const baseUrl = import.meta.env.VITE_BASE_URL;
// export const apiSlice = createApi({
//   reducerPath: "api",

//   baseQuery: fetchBaseQuery({
//     baseUrl: baseUrl || "http://localhost:3004/api",
//     credentials: "include",

//     prepareHeaders: (headers) => {

//     const auth = getAuthFromCookie();

//     if (auth?.accessToken) {
//       headers.set("authorization", `Bearer ${auth.accessToken}`);
//     }

//     return headers;
//   }
//   }),

//   tagTypes: ["User", "Auth"],

//   endpoints: () => ({}),
// });

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
});