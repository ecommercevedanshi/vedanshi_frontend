// pages/SearchPage.jsx
import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import { useSearchProductsQuery } from "../../features/products/productApiSlice"
import Container from "../../components/layout/Container";
import ProductCard from "../../components/product/ProductCard";

const SORT_OPTIONS = [
  { label: "Most Relevant", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

// normalize search result shape → ProductCard shape
const normalizeProduct = (product) => ({
  ...product,
  price: product.minPrice,
  discountPrice: product.mrp,
  images: product.images?.map((img) => img.url) ?? [],
});

const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-borderLight shadow-sm animate-pulse">
    <div className="h-[230px] sm:h-[320px] bg-gray-100" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
      <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
    </div>
  </div>
);

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const q = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "relevance";

  const [inputValue, setInputValue] = useState(q);

  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const { data, isLoading, isFetching, isError } = useSearchProductsQuery(
    { q, page, limit: 20 },
    { skip: q.trim().length < 2 }
  );

  const rawProducts = data?.data?.products ?? [];
  const pagination = data?.data?.pagination ?? {};

  const products = rawProducts.map(normalizeProduct);

  // client-side sort
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    return 0;
  });

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);
    if (key !== "page") next.set("page", "1");
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length >= 2) {
      setParam("q", inputValue.trim());
    }
  };

  return (
    <div className="min-h-screen bg-bgMain">
      <Container>
        <div className="py-8">

          {/* SEARCH BAR */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full max-w-2xl border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-gray-50 mb-6"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-5 py-3 outline-none text-sm text-gray-800 placeholder:text-gray-400"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => { setInputValue(""); navigate("/search"); }}
                className="px-3 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="submit"
              className="bg-primary px-5 text-white flex items-center gap-2 text-sm font-medium"
            >
              <Search size={16} />
              Search
            </button>
          </form>

          {/* RESULTS META + SORT */}
          {q && !isLoading && !isFetching && (
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <p className="text-sm text-gray-500">
                {pagination.total > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-gray-800">
                      {(page - 1) * 20 + 1}–{Math.min(page * 20, pagination.total)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-800">{pagination.total}</span>{" "}
                    results for{" "}
                    <span className="font-semibold text-gray-800">"{q}"</span>
                  </>
                ) : (
                  <>No results for <span className="font-semibold text-gray-800">"{q}"</span></>
                )}
              </p>

              <div className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-gray-400" />
                <select
                  value={sort}
                  onChange={(e) => setParam("sort", e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white text-gray-700 cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* EMPTY QUERY */}
          {!q && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
              <Search size={48} strokeWidth={1.2} />
              <p className="text-lg font-medium">What are you looking for?</p>
              <p className="text-sm">Type something in the search bar above or explore our products.</p>
               <Link
        to={`/products`}
        className="inline-block bg-primary text-bgMain px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
      >
        Shop Now
      </Link>
            </div>
          )}

          {/* ERROR */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <X size={48} strokeWidth={1.2} className="text-red-300" />
              <p className="text-lg font-medium text-gray-600">Something went wrong</p>
              <p className="text-sm text-gray-400">Please try again in a moment.</p>
            </div>
          )}

          {/* SKELETON */}
          {(isLoading || isFetching) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* NO RESULTS */}
          {!isLoading && !isFetching && !isError && q && products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
              <PackageSearch size={52} strokeWidth={1.2} />
              <p className="text-lg font-medium text-gray-600">No products found</p>
              <p className="text-sm text-center max-w-xs">
                Try different keywords or check for spelling mistakes.
              </p>
            </div>
          )}

          {/* RESULTS GRID */}
          {!isLoading && !isFetching && sortedProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 py-10">
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {pagination.pages > 1 && !isLoading && !isFetching && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setParam("page", page - 1)}
                className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={15} /> Prev
              </button>

              {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === pagination.pages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "..." ? (
                    <span key={`e-${idx}`} className="px-2 text-gray-400">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setParam("page", p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${
                        p === page
                          ? "bg-primary text-white border-primary"
                          : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                disabled={page === pagination.pages}
                onClick={() => setParam("page", page + 1)}
                className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          )}

        </div>
      </Container>
    </div>
  );
};

export default SearchPage;