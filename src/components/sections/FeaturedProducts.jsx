import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllProductsQuery } from "../../features/products/productApiSlice";
import ProductCard from "../../components/product/ProductCard";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const { data, isLoading } = useGetAllProductsQuery();
  const products = data?.data?.products?.slice(0, 8) ?? [];

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="pt-14 bg-bgMain overflow-hidden px-8">
      {/* Header row */}
      <div className="px-6 md:px-10 lg:px-16 flex items-end justify-between mb-8 gap-4">
        <div className="flex flex-col justify-center w-full">
          <h2
            className="text-2xl sm:text-5xl text-primary text-center"
            style={{
              fontFamily:
                "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              letterSpacing: "3px",
              fontWeight: "400",
              textShadow:
                "0px 3px 6px rgba(0,0,0,0.1), 0px 1px 0px rgba(255,255,255,0.4)",
            }}
          >
            Featured Products
          </h2>
          <p
            className="text-textPrimary mt-2 text-center text-xs sm:text-lg italic"
            style={{
              letterSpacing: "3px",
              fontFamily: "var(--font-bodoni)",
            }}
          >
            Handpicked for you
          </p>
        </div>

      </div>
        <div className="flex items-center gap-3 justify-end mb-5">
          {/* Scroll arrows — visible on all sizes */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Show all CTA */}
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200 group"
          >
            View all
            <ArrowRight
              size={15}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </button>
        </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-6 md:px-10 lg:px-16 pb-4
                   scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[260px] md:w-[280px] snap-start"
              >
                <div className="rounded-xl bg-gray-100 animate-pulse aspect-[3/4]" />
                <div className="mt-3 space-y-2">
                  <div className="h-3.5 bg-gray-100 animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                </div>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product._id ?? product.id}
                className="flex-shrink-0 w-[260px] md:w-[280px] snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}

        {/* Show more card — always last */}
        {!isLoading && products.length > 0 && (
          <div className="flex-shrink-0 w-[200px] snap-start self-stretch">
            <button
              onClick={() => navigate("/products")}
              className="h-full min-h-[320px] w-full rounded-xl border-2 border-dashed border-gray-200
                         flex flex-col items-center justify-center gap-3 text-center
                         hover:border-primary hover:bg-primary/3 transition-colors group"
            >
              <span className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <ArrowRight
                  size={18}
                  className="text-gray-400 group-hover:text-primary transition-colors"
                />
              </span>
              <span className="text-sm font-medium text-gray-500 group-hover:text-primary transition-colors px-4">
                Browse all products
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
