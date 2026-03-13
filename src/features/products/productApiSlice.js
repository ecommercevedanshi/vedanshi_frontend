import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getProductsByCategory: builder.query({
      query: (slug) => ({
        url: `/products/category/${slug}`,
        method: "GET",
      }),
    }),

    getProductsBySubCategory: builder.query({
      query: (slug) => ({
        url: `/products/subcategory/${slug}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetProductsByCategoryQuery,
  useGetProductsBySubCategoryQuery
} = productApiSlice;