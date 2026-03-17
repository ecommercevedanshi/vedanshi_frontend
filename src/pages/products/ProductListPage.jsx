

// import { useState } from "react";
// import { SlidersHorizontal, X } from "lucide-react";
// import Container from "../../components/layout/Container";
// import ProductCard from "../../components/product/ProductCard";
// import ProductFilters from "../../components/filters/ProductFilters";
// import ProductGrid from "../../components/product/ProductGrid";
// import {
//   useGetAllProductsQuery,
//   useGetFilteredProductsQuery,
// } from "../../features/products/productApiSlice";

// const FILTER_LABELS = {
//   color: "Colour",
//   size: "Size",
//   minPrice: "Min Price",
//   maxPrice: "Max Price",
//   inStock: "In Stock",
// };

// const formatFilterValue = (key, value) => {
//   if (key === "minPrice") return `From ₹${Number(value).toLocaleString("en-IN")}`;
//   if (key === "maxPrice") return `Up to ₹${Number(value).toLocaleString("en-IN")}`;
//   if (key === "inStock") return "In Stock Only";
//   return value;
// };

// const ActiveFilterChips = ({ filters, setFilters }) => {
//   const active = Object.entries(filters).filter(
//     ([, v]) => v !== undefined && v !== "" && v !== false
//   );
//   if (active.length === 0) return null;

//   const remove = (key) =>
//     setFilters((prev) => { const next = { ...prev }; delete next[key]; return next; });

//   return (
//     <div className="flex flex-wrap items-center gap-2 mb-5">
//       <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active:</span>
//       {active.map(([key, value]) => (
//         <span
//           key={key}
//           className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/20"
//         >
//           {formatFilterValue(key, value)}
//           <button onClick={() => remove(key)} className="hover:bg-primary/20 rounded-full p-0.5 transition-colors">
//             <X size={11} strokeWidth={2.5} />
//           </button>
//         </span>
//       ))}
//       {active.length > 1 && (
//         <button
//           onClick={() => setFilters({})}
//           className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
//         >
//           Clear all
//         </button>
//       )}
//     </div>
//   );
// };

// const ProductListPage = () => {
//   const [filters, setFilters] = useState({});
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const hasFilters = Object.values(filters).some(
//     (v) => v !== undefined && v !== "" && v !== false
//   );

//   const { data: defaultData, isLoading: defaultLoading } = useGetAllProductsQuery();

//   const { data: filteredData, isLoading: filterLoading } = useGetFilteredProductsQuery(
//     { ...filters },
//     { skip: !hasFilters }
//   );

//   const products = hasFilters
//     ? filteredData?.data?.products ?? []
//     : defaultData?.data?.products ?? [];

//   const isLoading = hasFilters ? filterLoading : defaultLoading;

//   const totalFiltered = hasFilters ? filteredData?.data?.totalProducts : undefined;

//   return (
//     <div className="bg-bgMain py-10">
//       <Container>

//         {/* Header */}
//         <div className="flex items-center justify-between mb-10">
//           <div className="flex-1 text-center">
//             <h2 className="text-3xl font-semibold text-primary">Products</h2>
//             <p className="text-textMuted mt-1">
//               {totalFiltered !== undefined
//                 ? `${totalFiltered} results found`
//                 : "Showing our huge products collection"}
//             </p>
//           </div>

//         </div>
//           {/* Mobile filter trigger — top right */}
//           <div className="lg:hidden absolute right-4">
//             <button
//               onClick={() => setMobileOpen(true)}
//               className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
//             >
//               <SlidersHorizontal size={15} />
//               Filters
//               {Object.values(filters).filter(Boolean).length > 0 && (
//                 <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
//                   {Object.values(filters).filter(Boolean).length}
//                 </span>
//               )}
//             </button>
//           </div>

//         {/* Body */}
//         <div className="flex gap-8 lg:gap-10 items-start">

//           {/* Sidebar + drawer — no category/subCategory since this is all products */}
//           <ProductFilters
//             filters={filters}
//             setFilters={setFilters}
//             mobileOpen={mobileOpen}
//             setMobileOpen={setMobileOpen}
//           />

//           {/* Grid area */}
//           <div className="flex-1 min-w-0">
//             <ActiveFilterChips filters={filters} setFilters={setFilters} />
//             <ProductGrid products={products} isLoading={isLoading} />
//           </div>

//         </div>
//       </Container>
//     </div>
//   );
// };

// export default ProductListPage;

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Container from "../../components/layout/Container";
import ProductCard from "../../components/product/ProductCard";
import ProductFilters from "../../components/filters/ProductFilters";
import ProductGrid from "../../components/product/ProductGrid";
import {
  useGetAllProductsQuery,
  useGetFilteredProductsQuery,
} from "../../features/products/productApiSlice";
 
const FILTER_LABELS = {
  color: "Colour",
  size: "Size",
  minPrice: "Min Price",
  maxPrice: "Max Price",
  inStock: "In Stock",
};
 
const formatFilterValue = (key, value) => {
  if (key === "minPrice") return `From ₹${Number(value).toLocaleString("en-IN")}`;
  if (key === "maxPrice") return `Up to ₹${Number(value).toLocaleString("en-IN")}`;
  if (key === "inStock") return "In Stock Only";
  return value;
};
 
const ActiveFilterChips = ({ filters, setFilters }) => {
  const active = Object.entries(filters).filter(
    ([, v]) => v !== undefined && v !== "" && v !== false
  );
  if (active.length === 0) return null;
 
  const remove = (key) =>
    setFilters((prev) => { const next = { ...prev }; delete next[key]; return next; });
 
  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active:</span>
      {active.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/20"
        >
          {formatFilterValue(key, value)}
          <button onClick={() => remove(key)} className="hover:bg-primary/20 rounded-full p-0.5 transition-colors">
            <X size={11} strokeWidth={2.5} />
          </button>
        </span>
      ))}
      {active.length > 1 && (
        <button
          onClick={() => setFilters({})}
          className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
};
 
// Skeleton card that mirrors the real ProductCard proportions
const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    {/* Image area */}
    <div className="bg-borderMedium rounded-lg w-full aspect-[3/4]" />
    {/* Text lines */}
    <div className="mt-3 space-y-2 px-1">
      <div className="h-3 bg-borderMedium rounded w-3/4" />
      <div className="h-3 bg-borderMedium rounded w-1/2" />
      <div className="h-3 bg-borderLight rounded w-1/3 mt-1" />
    </div>
  </div>
);
 
const ProductGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
 
const ProductListPage = () => {
  const [filters, setFilters] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
 
  const hasFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "" && v !== false
  );
 
  const { data: defaultData, isLoading: defaultLoading } = useGetAllProductsQuery();
 
  const { data: filteredData, isLoading: filterLoading } = useGetFilteredProductsQuery(
    { ...filters },
    { skip: !hasFilters }
  );
 
  const products = hasFilters
    ? filteredData?.data?.products ?? []
    : defaultData?.data?.products ?? [];
 
  const isLoading = hasFilters ? filterLoading : defaultLoading;
 
  const totalFiltered = hasFilters ? filteredData?.data?.totalProducts : undefined;
 
  return (
    <div className="bg-bgMain py-10">
      <Container>
 
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex-1 text-center">
            <h2 className="text-3xl font-semibold text-primary">Products</h2>
            <p className="text-textMuted mt-1">
              {totalFiltered !== undefined
                ? `${totalFiltered} results found`
                : "Showing our huge products collection"}
            </p>
          </div>
 
        </div>
          {/* Mobile filter trigger — top right */}
          <div className="lg:hidden absolute right-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters
              {Object.values(filters).filter(Boolean).length > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
 
        {/* Body */}
        <div className="flex gap-8 lg:gap-10 items-start">
 
          {/* Sidebar + drawer — no category/subCategory since this is all products */}
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
 
          {/* Grid area */}
          <div className="flex-1 min-w-0">
            <ActiveFilterChips filters={filters} setFilters={setFilters} />
            {isLoading ? <ProductGridSkeleton /> : <ProductGrid products={products} isLoading={isLoading} />}
          </div>
 
        </div>
      </Container>
    </div>
  );
};
 
export default ProductListPage;
