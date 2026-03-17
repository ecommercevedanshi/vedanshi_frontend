// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Search,
//   ShoppingCart,
//   Heart,
//   Menu,
//   X,
//   UserCircle2,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";

// import Container from "./Container";
// import AccountDropdown from "./AccountDropdown";
// import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";
// import { openCart } from "../../features/cart/cartSlice";
// import { useGetCartQuery } from "../../features/cart/cartApiSlice";

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [showAccount, setShowAccount] = useState(false);

//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   // console.log(isAuthenticated)

//   // console.log(user?.name)
//   const { items: guestItems } = useSelector((state) => state.cart);

// const { data: backendCart } = useGetCartQuery(undefined, {
//   skip: !user,
// });

// const backendCount =
//   backendCart?.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

// const guestCount =
//   guestItems?.reduce((sum, item) => sum + item.qty, 0) || 0;

// const cartCount = user ? backendCount : guestCount;

//   const { data } = useGetCategoriesQuery();
//   const categories = data?.data?.categories || [];

//   // console.log(data?.data?.categories)

//   // MAIN CATEGORIES
//   const mainCategories = categories?.filter(
//     (cat) => cat.parent === null && cat.isActive
//   );

//   // SUBCATEGORIES
//   const getSubCategories = (parentName) => {
//     return categories.filter(
//       (cat) =>
//         cat.parent &&
//         cat.parent.toLowerCase() === parentName.toLowerCase() &&
//         cat.isActive
//     );
//   };

//   return (
//     <header className="w-full bg-primary sticky top-0 z-50">
//       <Container>
//         <div className="flex items-center justify-between h-[70px]">

//           {/* LEFT */}
//           <div className="flex items-center gap-8">

//             {/* MOBILE MENU */}
//             <button
//               className="lg:hidden"
//               onClick={() => setMobileOpen(true)}
//             >
//               <Menu size={24} />
//             </button>

//             {/* LOGO */}
//             <Link to="/" className="text-xl font-bold">
//               Jaimax
//             </Link>

//             {/* DESKTOP CATEGORY NAV */}
//             <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">

//               {mainCategories.map((category) => {
//                 const subCategories = getSubCategories(category.name);

//                 return (
//                   <div key={category._id} className="relative group py-2">

//                     <Link
//                       // to={`/${category.slug}`}
//                       to={`/${category.slug}`}
//                       className="hover:text-bgCard text-bgMain transition"
//                     >
//                       {category.name}
//                     </Link>

//                     {/* DROPDOWN */}
//                     {subCategories.length > 0 && (
//                       <div className="absolute -left-3 top-full bg-white border border-borderLight shadow-xl rounded-lg p-5 hidden group-hover:block min-w-[220px]">

//                         <div className="flex flex-col gap-2">

//                          {subCategories.map((sub) => (
//   <Link
//     key={sub._id}
//     to={`/${category.slug}/${sub.slug}`}
//     className="
//       group/item
//       relative
//       flex items-center
//       px-2 py-1
//       text-sm
//       transition-colors duration-200
//       hover:text-primary
//     "
//   >
//     {/* LEFT BAR - grows from center */}
//     <span
//       className="
//         absolute left-0 top-1/2 -translate-y-1/2
//         h-0 w-[3px]
//         bg-primary
//         transition-all duration-200
//         group-hover/item:h-[60%]
//       "
//     />

//     {/* TEXT - zooms on hover */}
//     <span className="
//       ml-3
//       inline-block
//       transition-transform duration-200
//       group-hover/item:scale-105
//     ">
//       {sub.name}
//     </span>
//   </Link>
// ))}
//                         </div>

//                       </div>
//                     )}

//                   </div>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* SEARCH */}
//           <div className="hidden md:flex flex-1 max-w-[450px] mx-6">
//             <div className="flex w-full border border-primaryHover rounded-md overflow-hidden">

//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="flex-1 px-4 py-2 outline-none text-sm"
//               />

//               <button className="bg-primary px-4 text-white flex items-center">
//                 <Search size={18} />
//               </button>

//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-5 text-bgCard">

//             {/* ACCOUNT */}
//             <div
//               className="relative hidden md:flex md:flex-col items-center text-sm cursor-pointer"
//               onMouseEnter={() => setShowAccount(true)}
//               onMouseLeave={() => setShowAccount(false)}
//             >
//               <UserCircle2 size={20} />

//               <span>
//                 { user ?
//                    user?.name?.split(" ")[0] : "Account"
//                   }
//               </span>

//               {showAccount && <AccountDropdown user={user} />}
//             </div>

//             {/* WISHLIST */}
//             {user && (

//             <Link
//               to="/wishlist"
//               className="hidden md:flex md:flex-col items-center text-sm"
//             >
//               <Heart size={22} />
//               <span>Wishlist</span>
//             </Link>
//             )}

//             {/* CART */}
//             <button
//   onClick={() => dispatch(openCart())}
//   className="relative hidden md:flex md:flex-col items-center text-sm"
// >
//   <ShoppingCart size={24} />
//   <span>Cart</span>
//  {cartCount > 0 && (
//   <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//      {cartCount} 
//   </span>
//  )}
// </button>

//           </div>

//         </div>
//       </Container>

//       {/* MOBILE SIDEBAR */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-50">

//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setMobileOpen(false)}
//           />

//           <div className="absolute left-0 top-0 h-full w-[270px] bg-white p-6 shadow-xl overflow-y-auto">

//             <div className="flex justify-between mb-6">
//               <span className="font-semibold text-lg">Menu</span>

//               <button onClick={() => setMobileOpen(false)}>
//                 <X size={22} />
//               </button>
//             </div>

//             <div className="flex flex-col gap-5 text-sm">

//               {mainCategories.map((category) => {
//                 const subCategories = getSubCategories(category.name);

//                 return (
//                   <div key={category._id}>

//                     <Link
//                       to={`/${category.slug}`}
//                       className="font-semibold"
//                       onClick={() => setMobileOpen(false)}
//                     >
//                       {category.name}
//                     </Link>

//                     {subCategories.length > 0 && (
//                       <div className="ml-4 mt-2 flex flex-col gap-2">

//                         {subCategories.map((sub) => (
//                           <Link
//                             key={sub._id}
//                             to={`/${category.slug}/${sub.slug}`}
//                             onClick={() => setMobileOpen(false)}
//                           >
//                             {sub.name}
//                           </Link>
//                         ))}

//                       </div>
//                     )}

//                   </div>
//                 );
//               })}

//             </div>

//           </div>

//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  UserCircle2,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import Container from "./Container";
import AccountDropdown from "./AccountDropdown";
import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";
import { openCart } from "../../features/cart/cartSlice";
import { useGetCartQuery } from "../../features/cart/cartApiSlice";
import { useLazySearchProductsQuery } from "../../features/products/productApiSlice"
import { useDebounce } from "../../utils/hooks/useDebounce";
import logo from "../../assets/logos/Logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 400);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { items: guestItems } = useSelector((state) => state.cart);

  const { data: backendCart } = useGetCartQuery(undefined, { skip: !user });

  const backendCount =
    backendCart?.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const guestCount = guestItems?.reduce((sum, item) => sum + item.qty, 0) || 0;
  const cartCount = user ? backendCount : guestCount;

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data?.categories || [];

  const mainCategories = categories.filter(
    (cat) => cat.parent === null && cat.isActive
  );
  const getSubCategories = (parentName) =>
    categories.filter(
      (cat) =>
        cat.parent &&
        cat.parent.toLowerCase() === parentName.toLowerCase() &&
        cat.isActive
    );

  // ── Search ──────────────────────────────────────────────
  const [triggerSearch, { data: searchData, isLoading: isSearching, isFetching }] =
    useLazySearchProductsQuery();

  const searchResults = searchData?.data?.products ?? [];

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      triggerSearch({ q: debouncedQuery, page: 1, limit: 6 });
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [debouncedQuery]);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      setShowResults(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setQuery("");
  };

  return (
    <header className="w-full bg-primary sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-[70px]">

          {/* LEFT */}
          <div className="flex items-center gap-8">
            <button className="lg:hidden text-bgCard" onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>

            <Link to="/" className="text-xl font-bold">
             <img src={logo} className="w-24"/>
            </Link>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {mainCategories.map((category) => {
                const subCategories = getSubCategories(category.name);
                return (
                  <div key={category._id} className="relative group py-2">
                    <Link
                      to={`/${category.slug}`}
                      className="hover:text-bgCard text-bgMain transition"
                    >
                      {category.name}
                    </Link>

                    {subCategories.length > 0 && (
                      <div className="absolute -left-3 top-full bg-white border border-borderLight shadow-xl rounded-lg p-5 hidden group-hover:block min-w-[220px]">
                        <div className="flex flex-col gap-2">
                          {subCategories.map((sub) => (
                            <Link
                              key={sub._id}
                              to={`/${category.slug}/${sub.slug}`}
                              className="group/item relative flex items-center px-2 py-1 text-sm transition-colors duration-200 hover:text-primary"
                            >
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[3px] bg-primary transition-all duration-200 group-hover/item:h-[60%]" />
                              <span className="ml-3 inline-block transition-transform duration-200 group-hover/item:scale-105">
                                {sub.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-[450px] mx-6" ref={searchRef}>
            <div className="relative w-full">
              <form
                onSubmit={handleSearchSubmit}
                className="flex w-full border border-primaryHover rounded-md overflow-hidden"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0 && debouncedQuery.length >= 2)
                      setShowResults(true);
                  }}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 outline-none text-sm text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-primary px-4 text-white flex items-center"
                >
                  {isSearching || isFetching ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Search size={18} />
                  )}
                </button>
              </form>

              {/* RESULTS DROPDOWN */}
              {showResults && (
                <div className="absolute top-full left-0 w-full bg-white border border-borderLight rounded-b-lg shadow-2xl z-50 overflow-hidden mt-[1px]">

                  {isSearching || isFetching ? (
                    <div className="flex items-center justify-center py-8 text-sm text-gray-400 gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Searching...
                    </div>

                  ) : searchResults.length > 0 ? (
                    <>
                      <ul>
                        {searchResults.map((product) => (
                          <li key={product._id}>
                            <Link
                              to={`/${product.category}/${product.subCategory}/${product.slug}`}
                              onClick={handleResultClick}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                            >
                              {/* PRODUCT IMAGE */}
                              <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                {product.images?.[0] ? (
                                  <img
                                    src={product.images[0]?.url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200" />
                                )}
                              </div>

                              {/* PRODUCT INFO */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                  {product.category?.name}
                                  {product.subCategory?.name &&
                                    ` › ${product.subCategory.name}`}
                                </p>
                              </div>

                              {/* PRICE */}
                              <span className="text-sm font-semibold text-primary flex-shrink-0">
                                ₹{product.price?.toLocaleString("en-IN")}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* VIEW ALL LINK */}
                      <Link
                        to={`/search?q=${encodeURIComponent(query.trim())}`}
                        onClick={handleResultClick}
                        className="flex items-center justify-center gap-1 py-3 text-sm text-primary font-medium hover:bg-gray-50 transition-colors border-t border-gray-100"
                      >
                        View all results for "{query}"
                        <Search size={13} />
                      </Link>
                    </>

                  ) : (
                    <div className="py-8 text-center text-sm text-gray-400">
                      No products found for "{debouncedQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5 text-bgCard">
            <div
              className="relative hidden md:flex md:flex-col items-center text-sm cursor-pointer"
              onMouseEnter={() => setShowAccount(true)}
              onMouseLeave={() => setShowAccount(false)}
            >
              <UserCircle2 size={20} />
              <span>{user ? user?.name?.split(" ")[0] : "Account"}</span>
              {showAccount && <AccountDropdown user={user} />}
            </div>

            {user && (
              <Link
                to="/wishlist"
                className="hidden md:flex md:flex-col items-center text-sm"
              >
                <Heart size={22} />
                <span>Wishlist</span>
              </Link>
            )}

            <button
              onClick={() => dispatch(openCart())}
              className="relative hidden md:flex md:flex-col items-center text-sm"
            >
              <ShoppingCart size={24} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </Container>

      {/* MOBILE SIDEBAR — unchanged */}
      {/* MOBILE SIDEBAR */}
{mobileOpen && (
  <div className="fixed inset-0 z-50">

    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setMobileOpen(false)}
    />

    {/* DRAWER */}
    <div className="absolute left-0 top-0 h-full w-[300px] bg-white flex flex-col shadow-2xl overflow-hidden">

      {/* DRAWER HEADER */}
      <div className="flex items-center justify-between px-6 py-5 bg-primary">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="text-xl font-bold text-bgCard tracking-wide"
        >
         <img src={logo} className="w-30 h-12 "/>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="text-bgCard/70 hover:text-bgCard transition"
        >
          <X size={22} />
        </button>
      </div>

      {/* NAV LINKS */}
      <div className="flex-1 overflow-y-auto py-4">
        {mainCategories.map((category, idx) => {
          const subCategories = getSubCategories(category.name);
          return (
            <div key={category._id}>

              {/* CATEGORY LABEL */}
              <Link
                to={`/${category.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span className="uppercase tracking-widest text-xs text-primary">
                  {category.name}
                </span>
              </Link>

              {/* SUBCATEGORIES */}
              {subCategories.length > 0 && (
                <div className="mb-3">
                  {subCategories.map((sub) => (
                    <Link
                      key={sub._id}
                      to={`/${category.slug}/${sub.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-6 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* DIVIDER between categories */}
              {idx < mainCategories.length - 1 && (
                <div className="mx-6 border-t border-gray-100 my-1" />
              )}

            </div>
          );
        })}
      </div>

      {/* DRAWER FOOTER */}
      <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-3">
        {user ? (
          <>
            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-primary transition-colors"
            >
              <Heart size={17} />
              <span>My Wishlist</span>
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-primary transition-colors"
            >
              <UserCircle2 size={17} />
              <span>{user?.name?.split(" ")[0]}'s Account</span>
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 text-sm text-gray-700 hover:text-primary transition-colors"
          >
            <UserCircle2 size={17} />
            <span>Login / Register</span>
          </Link>
        )}

        <button
          onClick={() => { dispatch(openCart()); setMobileOpen(false); }}
          className="flex items-center gap-3 text-sm text-gray-700 hover:text-primary transition-colors"
        >
          <ShoppingCart size={17} />
          <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
        </button>
      </div>

    </div>
  </div>
)}
    </header>
  );
};

export default Navbar;