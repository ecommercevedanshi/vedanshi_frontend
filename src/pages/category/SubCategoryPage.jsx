// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, X } from "lucide-react";
// import { useState } from "react";
// import Container from "../../components/layout/Container";
// import ProductGrid from "../../components/product/ProductGrid";
// import ProductFilters from "../../components/filters/ProductFilters";
// import {
//   useGetProductsBySubCategoryQuery,
//   useGetFilteredProductsQuery,
// } from "../../features/products/productApiSlice";
// import { MobileFilterTrigger } from "../../components/filters/MobileFilterTrigger";

// // Map filter key → human-readable label
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

//   const remove = (key) => {
//     setFilters((prev) => {
//       const next = { ...prev };
//       delete next[key];
//       return next;
//     });
//   };

//   return (
//     <div className="flex flex-wrap items-center gap-2 mb-5">
//       <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
//         Active:
//       </span>
//       {active.map(([key, value]) => (
//         <span
//           key={key}
//           className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/20"
//         >
//           {formatFilterValue(key, value)}
//           <button
//             onClick={() => remove(key)}
//             className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
//           >
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

// const SubCategoryPage = () => {
//   const { category, subcategory } = useParams();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({});

//   const hasFilters = Object.values(filters).some(
//     (v) => v !== undefined && v !== "" && v !== false
//   );

//   const { data: defaultData, isLoading: defaultLoading } =
//     useGetProductsBySubCategoryQuery({ category, slug: subcategory });

//   const { data: filteredData, isLoading: filterLoading } =
//     useGetFilteredProductsQuery(
//       { category, subCategory: subcategory, ...filters },
//       { skip: !hasFilters }
//     );

//   const products = hasFilters
//     ? filteredData?.data?.products ?? []
//     : defaultData?.data?.products ?? [];

//   const isLoading = hasFilters ? filterLoading : defaultLoading;

//   const totalFiltered = hasFilters
//     ? filteredData?.data?.totalProducts
//     : undefined;

//   return (
//     <div className="bg-bgMain min-h-screen py-8 sm:py-10">
//       <Container>
//         {/* Page header */}
//       {/* Page header */}
// <div className="flex items-center gap-3 mb-8">
//   <button
//     className="p-1.5 rounded cursor-pointer hover:bg-primary hover:text-white text-primary border border-primary/30 transition-colors"
//     onClick={() => navigate(-1)}
//   >
//     <ArrowLeft size={18} />
//   </button>
//   <h2
//     className="text-2xl sm:text-4xl font-semibold capitalize text-primary flex-1"
//     style={{ fontFamily: "var(--font-bodoni)" }}
//   >
//     {subcategory?.replace(/-/g, " ")}
//   </h2>

//   {/* ✅ Mobile filter trigger — in header row, no extra vertical space */}
// </div>
//   <div className="lg:hidden ml-auto">
//     <MobileFilterTrigger filters={filters} onOpen={() => setMobileOpen(true)} />
//   </div>

//   {totalFiltered !== undefined && (
//     <span className="text-sm text-gray-400 self-end pb-1">
//       {totalFiltered} results
//     </span>
//   )}

// {/* Body: sidebar + content — no mobile trigger here anymore */}
// <div className="flex gap-8 lg:gap-10 items-start">
//   <ProductFilters
//     filters={filters}
//     setFilters={setFilters}
//     category={category}
//     subCategory={subcategory}
//     mobileOpen={mobileOpen}          // ✅ lift state up
//     setMobileOpen={setMobileOpen}
//   />
//   <div className="flex-1 min-w-0">
//     <ActiveFilterChips filters={filters} setFilters={setFilters} />
//     <ProductGrid products={products} isLoading={isLoading} />
//   </div>
// </div>
//       </Container>
//     </div>
//   );
// };

// export default SubCategoryPage;

import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import Container from "../../components/layout/Container";
import ProductGrid from "../../components/product/ProductGrid";
import ProductFilters from "../../components/filters/ProductFilters";
import {
  useGetProductsBySubCategoryQuery,
  useGetFilteredProductsQuery,
} from "../../features/products/productApiSlice";
import { MobileFilterTrigger } from "../../components/filters/MobileFilterTrigger";

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

  const remove = (key) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
        Active:
      </span>
      {active.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/20"
        >
          {formatFilterValue(key, value)}
          <button
            onClick={() => remove(key)}
            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
          >
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

const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-borderMedium rounded-lg w-full aspect-[3/4]" />
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

const SubCategoryPage = () => {
  const { category, subcategory } = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});

  const hasFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== "" && v !== false
  );

  const { data: defaultData, isLoading: defaultLoading } =
    useGetProductsBySubCategoryQuery({ category, slug: subcategory });

  const { data: filteredData, isLoading: filterLoading } =
    useGetFilteredProductsQuery(
      { category, subCategory: subcategory, ...filters },
      { skip: !hasFilters }
    );

  const products = hasFilters
    ? filteredData?.data?.products ?? []
    : defaultData?.data?.products ?? [];

  const isLoading = hasFilters ? filterLoading : defaultLoading;

  const totalFiltered = hasFilters
    ? filteredData?.data?.totalProducts
    : undefined;

  return (
    <div className="bg-bgMain min-h-screen py-8 sm:py-10">
      <Container>
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            className="p-1.5 rounded cursor-pointer hover:bg-primary hover:text-white text-primary border border-primary/30 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
          </button>
          <h2
            className="text-2xl sm:text-4xl font-semibold capitalize text-primary flex-1"
            style={{ fontFamily: "var(--font-bodoni)" }}
          >
            {subcategory?.replace(/-/g, " ")}
          </h2>
        </div>

        <div className="lg:hidden ml-auto">
          <MobileFilterTrigger filters={filters} onOpen={() => setMobileOpen(true)} />
        </div>

        {totalFiltered !== undefined && (
          <span className="text-sm text-gray-400 self-end pb-1">
            {totalFiltered} results
          </span>
        )}

        {/* Body: sidebar + content */}
        <div className="flex gap-8 lg:gap-10 items-start">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            category={category}
            subCategory={subcategory}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
          <div className="flex-1 min-w-0">
            <ActiveFilterChips filters={filters} setFilters={setFilters} />
            {isLoading ? <ProductGridSkeleton /> : <ProductGrid products={products} isLoading={isLoading} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SubCategoryPage;