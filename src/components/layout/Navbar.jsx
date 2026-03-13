// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Search, ShoppingCart, User, Heart, Menu, X, UserCircle2 } from "lucide-react";
// import Container from "./Container";
// import AccountDropdown from "./AccountDropdown";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const [showAccount, setShowAccount] = useState(false);

// const { user, isAuthenticated } = useSelector((state) => state.auth);

//   return (
//     <header className="w-full bg-white border-b border-borderLight sticky top-0 z-50">

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
//             <Link
//               to="/"
//               className="text-xl font-bold text-textPrimary"
//             >
//               Jaimax
//             </Link>

//             {/* DESKTOP NAV */}
//             <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-textSecondary">

//               {/* MEN */}
//               <div className="relative group">

//                 <Link to="/men" className="hover:text-primary">
//                   Men
//                 </Link>

//                 <div
//                   className="
//                   absolute top-full left-0
//                   bg-white
//                   shadow-soft
//                   border border-borderLight
//                   rounded-md
//                   p-5
//                   hidden group-hover:grid
//                   grid-cols-2
//                   gap-6
//                   min-w-[260px]
//                   "
//                 >
//                   <div className="flex flex-col gap-2 text-sm">
//                     <span className="font-semibold text-textPrimary">
//                       Topwear
//                     </span>
//                     <Link to="/men/tshirts">T-Shirts</Link>
//                     <Link to="/men/shirts">Shirts</Link>
//                     <Link to="/men/hoodies">Hoodies</Link>
//                   </div>

//                   <div className="flex flex-col gap-2 text-sm">
//                     <span className="font-semibold text-textPrimary">
//                       Bottomwear
//                     </span>
//                     <Link to="/men/pants">Pants</Link>
//                     <Link to="/men/shorts">Shorts</Link>
//                   </div>
//                 </div>
//               </div>

//               {/* WOMEN */}
//               <div className="relative group">

//                 <Link to="/women" className="hover:text-primary">
//                   Women
//                 </Link>

//                 <div
//                   className="
//                   absolute top-full left-0
//                   bg-white
//                   shadow-soft
//                   border border-borderLight
//                   rounded-md
//                   p-5
//                   hidden group-hover:grid
//                   grid-cols-2
//                   gap-6
//                   min-w-[260px]
//                   "
//                 >
//                   <div className="flex flex-col gap-2 text-sm">
//                     <span className="font-semibold text-textPrimary">
//                       Topwear
//                     </span>
//                     <Link to="/women/tshirts">T-Shirts</Link>
//                     <Link to="/women/tops">Tops</Link>
//                     <Link to="/women/hoodies">Hoodies</Link>
//                   </div>

//                   <div className="flex flex-col gap-2 text-sm">
//                     <span className="font-semibold text-textPrimary">
//                       Bottomwear
//                     </span>
//                     <Link to="/women/dresses">Dresses</Link>
//                     <Link to="/women/bottomwear">Bottomwear</Link>
//                   </div>
//                 </div>
//               </div>

//               {/* KIDS */}
//               <div className="relative group">

//                 <Link to="/kids" className="hover:text-primary">
//                   Kids
//                 </Link>

//                 <div
//                   className="
//                   absolute top-full left-0
//                   bg-white
//                   shadow-soft
//                   border border-borderLight
//                   rounded-md
//                   p-5
//                   hidden group-hover:grid
//                   grid-cols-2
//                   gap-6
//                   min-w-[260px]
//                   "
//                 >

//                   <div className="flex flex-col gap-2 text-sm">
//                     <span className="font-semibold text-textPrimary">
//                       Boys
//                     </span>
//                     <Link to="/kids/boys/tshirts">T-Shirts</Link>
//                     <Link to="/kids/boys/shirts">Shirts</Link>
//                     <Link to="/kids/boys/hoodies">Hoodies</Link>
//                   </div>

//                   <div className="flex flex-col gap-2 text-sm">
//                     <span className="font-semibold text-textPrimary">
//                       Girls
//                     </span>
//                     <Link to="/kids/girls/tshirts">T-Shirts</Link>
//                     <Link to="/kids/girls/tops">Tops</Link>
//                     <Link to="/kids/girls/dresses">Dresses</Link>
//                   </div>

//                 </div>
//               </div>

//             </nav>
//           </div>

//           {/* SEARCH */}
//           <div className="hidden md:flex flex-1 max-w-[450px] mx-6">

//             <div className="flex w-full border border-borderMedium rounded-md overflow-hidden">

//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="flex-1 px-4 py-2 outline-none text-sm"
//               />

//               <button className="bg-primary px-4 text-white flex items-center">
//                 <Search size={18} />
//               </button>

//             </div>

//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-5">

// <div
//   className="relative hidden md:flex md:flex-col items-center text-sm hover:cursor-pointer"
//   onMouseEnter={() => setShowAccount(true)}
//   onMouseLeave={() => setShowAccount(false)}
// >
//   <UserCircle2 size={20} />

//   <span>
//     {isAuthenticated ? user?.name ? user.name.split(" ")[0] : "Profile" : "Account"}
//   </span>

//   {showAccount && <AccountDropdown user={user} />}
// </div>

//             <Link
//               to="/wishlist"
//               className="hidden md:flex md:flex-col items-center text-sm"
//             >
//               <Heart size={22} />
//               <span>Wishlist</span>
//             </Link>

//             <Link
//               to="/cart"
//               className="relative hidden md:flex md:flex-col items-center text-sm"
//             >
//               <ShoppingCart size={24} />
//                <span>Cart</span>
//               <span
//                 className="
//                 absolute -top-2 -right-2
//                 bg-primary
//                 text-white
//                 text-xs
//                 w-5 h-5
//                 flex items-center justify-center
//                 rounded-full
//                 "
//               >
//                 0
//               </span>
//             </Link>

//           </div>

//         </div>
//       </Container>

//       {/* MOBILE SEARCH */}
//       <div className="md:hidden px-4 pb-3">
//         <div className="flex border border-borderMedium rounded-md overflow-hidden">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="flex-1 px-4 py-2 text-sm outline-none"
//           />
//           <button className="bg-primary px-4 text-white">
//             <Search size={18} />
//           </button>
//         </div>
//       </div>

//       {/* MOBILE SIDEBAR */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-50">

//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setMobileOpen(false)}
//           />

//           <div className="absolute left-0 top-0 h-full w-[260px] bg-white p-5 shadow-lg">

//             <div className="flex justify-between mb-6">
//               <span className="font-semibold text-lg">Menu</span>
//               <button onClick={() => setMobileOpen(false)}>
//                 <X size={22} />
//               </button>
//             </div>

//             <div className="flex flex-col gap-4 text-sm">
//               <Link to="/men">Men</Link>
//               <Link to="/women">Women</Link>
//               <Link to="/kids">Kids</Link>
//               {isAuthenticated ? (
//   <Link to="/profile">Profile</Link>
// ) : (
//   <Link to="/login">Login</Link>
// )}
//               <Link to="/wishlist">Wishlist</Link>
//               <Link to="/cart">Cart</Link>
//             </div>

//           </div>

//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  UserCircle2,
} from "lucide-react";
import { useSelector } from "react-redux";

import Container from "./Container";
import AccountDropdown from "./AccountDropdown";
import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { data } = useGetCategoriesQuery();
  const categories = data?.data || [];

  // MAIN CATEGORIES
  const mainCategories = categories.filter(
    (cat) => cat.parent === null && cat.isActive
  );

  // SUBCATEGORIES
  const getSubCategories = (parentName) => {
    return categories.filter(
      (cat) =>
        cat.parent &&
        cat.parent.toLowerCase() === parentName.toLowerCase() &&
        cat.isActive
    );
  };

  return (
    <header className="w-full bg-white border-b border-borderLight sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-[70px]">

          {/* LEFT */}
          <div className="flex items-center gap-8">

            {/* MOBILE MENU */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* LOGO */}
            <Link to="/" className="text-xl font-bold">
              Jaimax
            </Link>

            {/* DESKTOP CATEGORY NAV */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">

              {mainCategories.map((category) => {
                const subCategories = getSubCategories(category.name);

                return (
                  <div key={category._id} className="relative group py-2">

                    <Link
                      to={`/${category.slug}`}
                      className="hover:text-primary transition"
                    >
                      {category.name}
                    </Link>

                    {/* DROPDOWN */}
                    {subCategories.length > 0 && (
                      <div className="absolute left-0 top-full bg-white border border-borderLight shadow-xl rounded-lg p-5 hidden group-hover:block min-w-[220px]">

                        <div className="flex flex-col gap-2">

                          {subCategories.map((sub) => (
                            <Link
                              key={sub._id}
                              to={`/${category.slug}/${sub.slug}`}
                              className="hover:text-primary transition"
                            >
                              {sub.name}
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
          <div className="hidden md:flex flex-1 max-w-[450px] mx-6">
            <div className="flex w-full border border-borderMedium rounded-md overflow-hidden">

              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 outline-none text-sm"
              />

              <button className="bg-primary px-4 text-white flex items-center">
                <Search size={18} />
              </button>

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* ACCOUNT */}
            <div
              className="relative hidden md:flex md:flex-col items-center text-sm cursor-pointer"
              onMouseEnter={() => setShowAccount(true)}
              onMouseLeave={() => setShowAccount(false)}
            >
              <UserCircle2 size={20} />

              <span>
                {isAuthenticated
                  ? user?.name?.split(" ")[0]
                  : "Account"}
              </span>

              {showAccount && <AccountDropdown user={user} />}
            </div>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className="hidden md:flex md:flex-col items-center text-sm"
            >
              <Heart size={22} />
              <span>Wishlist</span>
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              className="relative hidden md:flex md:flex-col items-center text-sm"
            >
              <ShoppingCart size={24} />
              <span>Cart</span>

              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>

          </div>

        </div>
      </Container>

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[270px] bg-white p-6 shadow-xl overflow-y-auto">

            <div className="flex justify-between mb-6">
              <span className="font-semibold text-lg">Menu</span>

              <button onClick={() => setMobileOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-sm">

              {mainCategories.map((category) => {
                const subCategories = getSubCategories(category.name);

                return (
                  <div key={category._id}>

                    <Link
                      to={`/${category.slug}`}
                      className="font-semibold"
                      onClick={() => setMobileOpen(false)}
                    >
                      {category.name}
                    </Link>

                    {subCategories.length > 0 && (
                      <div className="ml-4 mt-2 flex flex-col gap-2">

                        {subCategories.map((sub) => (
                          <Link
                            key={sub._id}
                            to={`/${category.slug}/${sub.slug}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </div>

        </div>
      )}
    </header>
  );
};

export default Navbar;