import { useState, useEffect } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { useGetFilterOptionsQuery } from "../../features/products/productApiSlice";

const SIZE_ORDER = ["XS","S","M","L","XL","XXL","XXXL","Over Size"];

const sortSizes = (sizes) => {
  const isNumeric = sizes.some((s) => !isNaN(s));
  if (isNumeric) return [...sizes].sort((a, b) => Number(a) - Number(b));
  return [...sizes].sort(
    (a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b)
  );
};

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        className="flex w-full items-center justify-between text-sm font-semibold tracking-wide uppercase text-gray-700 mb-3"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && children}
    </div>
  );
};

const FilterContent = ({ filters, setFilters, onClose, category, subCategory }) => {
  const [localMin, setLocalMin] = useState(filters.minPrice || "");
  const [localMax, setLocalMax] = useState(filters.maxPrice || "");

  // ✅ Fetch dynamic filter options for this category/subcategory
  const { data: optionsData } = useGetFilterOptionsQuery(
    { category, subCategory },
    // { skip: !category }
  );

  const colors = optionsData?.data?.colors ?? [];
  const sizes = sortSizes(optionsData?.data?.sizes ?? []);

  const toggle = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value,
    }));
  };

  const applyPrice = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: localMin || undefined,
      maxPrice: localMax || undefined,
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <span className="font-semibold text-base tracking-wide">Filters</span>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-50">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* PRICE */}
        <Section title="Price">
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border border-gray-200 rounded-md pl-6 pr-2 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border border-gray-200 rounded-md pl-6 pr-2 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={applyPrice}
              className="w-full py-1.5 text-xs font-medium border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              Apply Price
            </button>
          </div>
        </Section>

        {/* COLOUR — dynamic */}
        {colors.length > 0 && (
          <Section title="Colour">
            <div className="flex flex-wrap gap-2">
              {colors.map((label) => {
                const active = filters.color === label;
                return (
                  <button
                    key={label}
                    onClick={() => toggle("color", label)}
                    className={`px-2.5 py-1.5 rounded-full border text-xs transition-all ${
                      active
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </Section>
        )}

        {/* SIZE — dynamic + smart sorted */}
        {sizes.length > 0 && (
          <Section title="Size">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const active = filters.size === size;
                return (
                  <button
                    key={size}
                    onClick={() => toggle("size", size)}
                    className={`min-w-[40px] px-3 h-9 text-xs font-medium rounded-md border transition-all ${
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </Section>
        )}

        {/* STOCK */}
        <Section title="Availability" defaultOpen={false}>
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))}
              className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 relative cursor-pointer ${
                filters.inStock ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                  filters.inStock ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
        </Section>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={() => { setFilters({}); setLocalMin(""); setLocalMax(""); }}
          className="w-full py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

// ✅ Pass category/subCategory down from the page
const ProductFilters = ({ filters, setFilters, category, subCategory, mobileOpen, setMobileOpen }) => {
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop sidebar only — no button here */}
      <aside className="hidden lg:flex flex-col w-56 xl:w-64 flex-shrink-0 sticky top-4 self-start">
        <FilterContent
          filters={filters}
          setFilters={setFilters}
          category={category}
          subCategory={subCategory}
        />
      </aside>

      {/* Mobile drawer — no trigger button here */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-2xl flex flex-col p-5">
            <FilterContent
              filters={filters}
              setFilters={setFilters}
              onClose={() => setMobileOpen(false)}
              category={category}
              subCategory={subCategory}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;