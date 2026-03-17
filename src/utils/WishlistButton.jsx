import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import {
  useCheckWishlistQuery,
  useGetWishlistIdsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../features/wishlist/wishlistApiSlice";

export default function WishlistButton({
  productId,
  className = "",
  renderAs = "icon",
  disabled = false,
  mode = "ids", // "ids" for grids, "check" for detail page
}) {
  const { user } = useSelector((state) => state.auth);

  // detail page — single product check
  const { data: checkData } = useCheckWishlistQuery(productId, {
    skip: !user || mode !== "check",
  });

  // grid pages — one fetch for all
  const { data: idsData } = useGetWishlistIdsQuery(undefined, {
    skip: !user || mode !== "ids",
  });

  const [addToWishlist,      { isLoading: isAdding   }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  const isWishlisted =
    mode === "check"
      ? (checkData?.data?.isWishlisted ?? false)
      : (idsData?.data?.ids?.includes(productId) ?? false);

  const isLoading = isAdding || isRemoving;

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || isLoading || disabled) return;
    try {
      if (isWishlisted) {
        await removeFromWishlist(productId).unwrap();
      } else {
        await addToWishlist(productId).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  // ── ICON MODE (product grids) ──
  if (renderAs === "icon") {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`transition disabled:opacity-50 ${className}`}
      >
        <Heart
          size={18}
          className={isWishlisted ? "fill-red-500 text-red-500" : "text-textMuted hover:text-red-400"}
        />
      </button>
    );
  }

  // ── BUTTON MODE (product detail page) ──
  return (
    <button
      onClick={handleToggle}
      disabled={isLoading || disabled}
      className={`
        py-3 px-4 rounded-full border border-primary
        font-medium transition
        flex items-center justify-center gap-2
        disabled:bg-borderLight disabled:text-textMuted disabled:border-borderLight disabled:cursor-not-allowed
        ${isWishlisted
          ? "bg-primary text-white hover:bg-primaryHover"
          : "bg-bgMain text-primary hover:bg-primaryHover hover:text-white"
        }
        ${className}
      `}
    >
      <Heart size={16} className={isWishlisted ? "fill-white text-white" : ""} />
      {isLoading ? "Saving..." : disabled ? "Sold Out" : isWishlisted ? "Wishlisted" : "Add to Wishlist"}
    </button>
  );
}