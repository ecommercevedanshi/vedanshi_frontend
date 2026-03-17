import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: ({ slug, page = 1 }) => ({
        url: `/products/category/${slug}?page=${page}&limit=12`,
        method: "GET",
      }),
    }),

   getProductsBySubCategory: builder.query({
  query: ({ category, slug }) => ({
    url: `/products/${category}/${slug}`,
    method: "GET",
  }),
  providesTags: ["Category"],
}),
    getProductDetails: builder.query({
      query: (slug) => `/products/product-details/${slug}`,
    }),
    getAllProducts: builder.query({
      query: () => `/products`,
    }),
    searchProducts: builder.query({
      query: ({ q, page = 1, limit = 20 }) => ({
        url: "/products/search",
        method: "GET",
        params: { q, page, limit },
      }),
      // cache for 60 seconds
      keepUnusedDataFor: 60,
    }),
    getFilteredProducts: builder.query({
  query: (params) => ({
    url: "/products/filter",
    params
  })
}),
// In productApiSlice — already works, just make sure params are optional
getFilterOptions: builder.query({
  query: ({ category, subCategory } = {}) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (subCategory) params.set("subCategory", subCategory);
    return `/products/filter-options?${params}`;
  },
}),
  }),
});

export const {
  useGetProductsByCategoryQuery,
  useGetProductsBySubCategoryQuery,
  useGetProductDetailsQuery,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useGetFilteredProductsQuery,
  useGetFilterOptionsQuery,
} = productApiSlice;
