// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { Heart, Trash2, ShoppingBag, X } from "lucide-react";

// import {
//   useGetMyWishlistQuery,
//   useRemoveFromWishlistMutation,
//   useClearWishlistMutation,
// } from "../../features/wishlist/wishlistApiSlice";
// import Container from "../../components/layout/Container";

// export default function WishlistPage() {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const { data, isLoading } = useGetMyWishlistQuery(undefined, { skip: !user });
//   const [removeFromWishlist] = useRemoveFromWishlistMutation();
//   const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();

//   const [confirmClear, setConfirmClear] = useState(false);
//   const [removingId, setRemovingId] = useState(null);

//   const items = data?.data?.items || [];

//   const handleRemove = async (productId) => {
//     setRemovingId(productId);
//     try {
//       await removeFromWishlist(productId).unwrap();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setRemovingId(null);
//     }
//   };

//   const handleClear = async () => {
//     try {
//       await clearWishlist().unwrap();
//       setConfirmClear(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-bgMain flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
//           <p className="text-textMuted text-sm">Loading wishlist...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-bgMain py-10">
//       <Container>

//         {/* HEADER */}
//         <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
//           <div>
//             <p className="text-textMuted text-xs tracking-[3px] uppercase">Account</p>
//             <h1
//               className="text-3xl sm:text-4xl text-primary mt-1"
//               style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
//             >
//               My Wishlist
//             </h1>
//           </div>
//           {items.length > 0 && (
//             <button
//               onClick={() => setConfirmClear(true)}
//               className="flex items-center gap-1.5 text-xs text-red-400 border border-red-200 px-4 py-2 hover:bg-red-50 transition"
//             >
//               <Trash2 size={13} /> Clear All
//             </button>
//           )}
//         </div>

//         {/* EMPTY STATE */}
//         {items.length === 0 ? (
//           <div className="flex flex-col items-center py-24 gap-4 text-center">
//             <Heart size={48} className="text-borderMedium" />
//             <p className="text-textPrimary font-medium">Your wishlist is empty</p>
//             <p className="text-textMuted text-sm">
//               Save items you love and come back to them anytime.
//             </p>
//             <button
//               onClick={() => navigate("/products")}
//               className="mt-2 px-6 py-2.5 bg-primary text-white text-sm hover:bg-primaryHover transition"
//             >
//               Explore Products
//             </button>
//           </div>
//         ) : (
//           <>
//             <p className="text-xs text-textMuted mb-5">
//               {items.length} item{items.length !== 1 ? "s" : ""}
//             </p>

//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
//               {items.map((entry) => {
//                 const primaryImage = entry.images?.[0]?.url || null;
//                 const hoverImage   = entry.images?.[1]?.url || null;

//                 const price = entry.variant?.price;
//                 const mrp   = entry.variant?.mrp;
//                 const discountPercent =
//                   mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;

//                 // navigation: category/subCategory can be null from API
//                 const productLink =
//                   entry.slug && entry.category && entry.subCategory
//                     ? `/${entry.category}/${entry.subCategory}/${entry.slug}`
//                     : entry.slug
//                     ? `/${entry.slug}`
//                     : null;

//                 const isBeingRemoved = removingId === entry.productId;

//                 return (
//                   <div
//                     key={entry._id}
//                     className={`bg-white border border-borderLight group relative flex flex-col transition-opacity duration-200 ${
//                       isBeingRemoved ? "opacity-40 pointer-events-none" : ""
//                     }`}
//                   >
//                     {/* REMOVE BUTTON */}
// <button
//   onClick={() => handleRemove(entry.productId)}
//   title="Remove from wishlist"
//   className="
//     absolute bottom-2 right-2 z-20
//     w-7 h-7 bg-white border border-borderLight
//     flex items-center justify-center
//     sm:opacity-0 sm:group-hover:opacity-100 opacity-100
//     transition hover:border-red-300 hover:text-red-500
//     pointer-events-auto
//   "
// >
//   <X size={13} />
// </button>

//                     {/* IMAGE with hover swap */}
//                     {productLink ? (
//                       <Link to={productLink} className="block">
//                         <HoverImage
//                           src={primaryImage}
//                           hoverSrc={hoverImage}
//                           alt={entry.name}
//                         />
//                       </Link>
//                     ) : (
//                       <HoverImage
//                         src={primaryImage}
//                         hoverSrc={hoverImage}
//                         alt={entry.name}
//                       />
//                     )}

//                     {/* INFO */}
//                     <div className="p-3 flex flex-col gap-1 flex-1">

//                       {/* NAME */}
//                       {productLink ? (
//                         <Link to={productLink}>
//                           <p className="text-sm font-medium text-textPrimary line-clamp-2 hover:text-primary transition leading-snug">
//                             {entry.name}
//                           </p>
//                         </Link>
//                       ) : (
//                         <p className="text-sm font-medium text-textPrimary line-clamp-2 leading-snug">
//                           {entry.name}
//                         </p>
//                       )}

//                       {/* PRICE ROW */}
//                       <div className="flex items-center gap-2 flex-wrap mt-auto pt-1">
//                         {price && (
//                           <span className="text-sm font-semibold text-secondary">
//                             ₹{price.toLocaleString()}
//                           </span>
//                         )}
//                         {mrp && mrp !== price && (
//                           <span className="text-xs text-textMuted line-through">
//                             ₹{mrp.toLocaleString()}
//                           </span>
//                         )}
//                         {discountPercent > 0 && (
//                           <span className="text-xs text-green-600 font-medium">
//                             {discountPercent}% OFF
//                           </span>
//                         )}
//                       </div>

//                       {/* SIZE */}
//                       {entry.variant?.size && (
//                         <p className="text-xs text-textMuted">
//                           Size: {entry.variant.size}
//                         </p>
//                       )}

//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}

//       </Container>

//       {/* CLEAR CONFIRM MODAL */}
//       {confirmClear && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
//           <div className="bg-white w-full max-w-sm shadow-xl">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-borderLight">
//               <h3 className="font-semibold text-textPrimary">Clear Wishlist</h3>
//               <button onClick={() => setConfirmClear(false)}>
//                 <X size={16} className="text-textMuted hover:text-textPrimary" />
//               </button>
//             </div>
//             <div className="px-6 py-5 space-y-5">
//               <p className="text-sm text-textMuted">
//                 Are you sure you want to remove all{" "}
//                 {items.length} item{items.length !== 1 ? "s" : ""} from your
//                 wishlist? This cannot be undone.
//               </p>
//               <div className="flex gap-3 justify-end">
//                 <button
//                   onClick={() => setConfirmClear(false)}
//                   className="px-5 py-2 border border-borderMedium text-textMuted text-sm hover:text-textPrimary transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleClear}
//                   disabled={isClearing}
//                   className="px-5 py-2 bg-red-500 text-white text-sm hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isClearing ? "Clearing..." : "Clear All"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── smooth crossfade hover image ──
// function HoverImage({ src, hoverSrc, alt }) {
//   return (
//     <div className="aspect-[3/4] overflow-hidden bg-bgMain relative">
//       {src ? (
//         <>
//           {/* primary — fades out on hover */}
//           <img
//             src={src}
//             alt={alt || "Product"}
//             className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
//           />
//           {/* hover image — fades in */}
//           {hoverSrc && (
//             <img
//               src={hoverSrc}
//               alt={alt || "Product"}
//               className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//             />
//           )}
//         </>
//       ) : (
//         <div className="w-full h-full flex items-center justify-center">
//           <ShoppingBag size={32} className="text-borderMedium" />
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingBag, X } from "lucide-react";

import {
  useGetMyWishlistQuery,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} from "../../features/wishlist/wishlistApiSlice";
import Container from "../../components/layout/Container";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetMyWishlistQuery(undefined, { skip: !user });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();

  const [confirmClear, setConfirmClear] = useState(false);
  const [removingIds, setRemovingIds] = useState(new Set()); // track multiple at once

  const items = data?.data?.items || [];

  const handleRemove = async (productId) => {
    setRemovingIds((prev) => new Set(prev).add(productId));
    try {
      await removeFromWishlist(productId).unwrap();
    } catch (err) {
      console.error(err);
      // revert on failure
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
    // no need to remove from set — item will disappear from list after cache update
  };

  const handleClear = async () => {
    try {
      await clearWishlist().unwrap();
      setConfirmClear(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bgMain py-10">
        <Container>
          <div className="mb-8">
            <div className="h-3 w-16 bg-gray-100 rounded animate-pulse mb-2" />
            <div className="h-8 w-40 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-borderLight animate-pulse">
                <div className="aspect-[3/4] bg-gray-100" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgMain py-10">
      <Container>

        {/* HEADER */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-textMuted text-xs tracking-[3px] uppercase">Account</p>
            <h1
              className="text-3xl sm:text-4xl text-primary mt-1"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              My Wishlist
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => setConfirmClear(true)}
              className="flex items-center gap-1.5 text-xs text-red-400 border border-red-200 px-4 py-2 hover:bg-red-50 transition"
            >
              <Trash2 size={13} /> Clear All
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-4 text-center">
            <Heart size={48} className="text-borderMedium" />
            <p className="text-textPrimary font-medium">Your wishlist is empty</p>
            <p className="text-textMuted text-sm">
              Save items you love and come back to them anytime.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-2 px-6 py-2.5 bg-primary text-white text-sm hover:bg-primaryHover transition"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-textMuted mb-5">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {items.map((entry) => {
                const primaryImage = entry.images?.[0]?.url || null;
                const hoverImage   = entry.images?.[1]?.url || null;

                const price = entry.variant?.price;
                const mrp   = entry.variant?.mrp;
                const discountPercent =
                  mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;

                const productLink =
                  entry.slug && entry.category && entry.subCategory
                    ? `/${entry.category}/${entry.subCategory}/${entry.slug}`
                    : entry.slug
                    ? `/${entry.slug}`
                    : null;

                const isBeingRemoved = removingIds.has(entry.productId);

                return (
                  <div
                    key={entry._id}
                    className={`bg-white border border-borderLight group relative flex flex-col transition-all duration-300 ${
                      isBeingRemoved
                        ? "opacity-0 scale-95 pointer-events-none"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    {/* REMOVE BUTTON — top right of image, same pattern as ProductCard */}
                    <button
                      onClick={() => handleRemove(entry.productId)}
                      title="Remove from wishlist"
                      className="
                        absolute top-2 right-2 z-20
                        w-7 h-7 bg-white border border-borderLight
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        transition-all duration-200
                        hover:border-red-300 hover:text-red-500
                        shadow-sm
                      "
                    >
                      {isBeingRemoved ? (
                        <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <X size={13} />
                      )}
                    </button>

                    {/* IMAGE */}
                    {productLink ? (
                      <Link to={productLink} className="block">
                        <HoverImage
                          src={primaryImage}
                          hoverSrc={hoverImage}
                          alt={entry.name}
                        />
                      </Link>
                    ) : (
                      <HoverImage
                        src={primaryImage}
                        hoverSrc={hoverImage}
                        alt={entry.name}
                      />
                    )}

                    {/* INFO */}
                    <div className="p-3 flex flex-col gap-1 flex-1">
                      {productLink ? (
                        <Link to={productLink}>
                          <p className="text-sm font-medium text-textPrimary line-clamp-2 hover:text-primary transition leading-snug">
                            {entry.name}
                          </p>
                        </Link>
                      ) : (
                        <p className="text-sm font-medium text-textPrimary line-clamp-2 leading-snug">
                          {entry.name}
                        </p>
                      )}

                      <div className="flex items-center gap-2 flex-wrap mt-auto pt-1">
                        {price && (
                          <span className="text-sm font-semibold text-secondary">
                            ₹{price.toLocaleString()}
                          </span>
                        )}
                        {mrp && mrp !== price && (
                          <span className="text-xs text-textMuted line-through">
                            ₹{mrp.toLocaleString()}
                          </span>
                        )}
                        {discountPercent > 0 && (
                          <span className="text-xs text-green-600 font-medium">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      {entry.variant?.size && (
                        <p className="text-xs text-textMuted">
                          Size: {entry.variant.size}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

      </Container>

      {/* CLEAR CONFIRM MODAL */}
      {confirmClear && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-borderLight">
              <h3 className="font-semibold text-textPrimary">Clear Wishlist</h3>
              <button onClick={() => setConfirmClear(false)}>
                <X size={16} className="text-textMuted hover:text-textPrimary" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              <p className="text-sm text-textMuted">
                Are you sure you want to remove all{" "}
                {items.length} item{items.length !== 1 ? "s" : ""} from your
                wishlist? This cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-5 py-2 border border-borderMedium text-textMuted text-sm hover:text-textPrimary transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClear}
                  disabled={isClearing}
                  className="px-5 py-2 bg-red-500 text-white text-sm hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isClearing ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Clearing...
                    </>
                  ) : (
                    "Clear All"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HoverImage({ src, hoverSrc, alt }) {
  return (
    <div className="aspect-[3/4] overflow-hidden bg-bgMain relative">
      {src ? (
        <>
          <img
            src={src}
            alt={alt || "Product"}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          {hoverSrc && (
            <img
              src={hoverSrc}
              alt={alt || "Product"}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ShoppingBag size={32} className="text-borderMedium" />
        </div>
      )}
    </div>
  );
}