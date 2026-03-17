import { Link } from "react-router-dom";
import img1 from "../../assets/shirt-Products/image-1.avif";
import img2 from "../../assets/shirt-Products/image-2.avif";
import WishlistButton from "../../utils/WishlistButton";

const ProductCard = ({ product }) => {
  // console.log(product)

  const primaryImage = product.images?.[0];

  const secondImage = product.images?.[1] || primaryImage;

  const discountPercent = Math.round(
    ((product.discountPrice - product.price) / product.discountPrice) * 100,
  );

  // console.log(product)

  return (
    <Link
      to={`/${product.category}/${product.subCategory}/${product.slug}`}
      className="group block"
    >
      <div className="bg-white rounded-xl overflow-hidden border border-borderLight shadow-sm hover:shadow-md transition">
        {/* IMAGE */}
        {/* IMAGE */}
       <div className="relative h-[230px] sm:h-[320px] overflow-hidden">
  
  {/* IMAGE 1 */}
  <img
    src={primaryImage}
    alt={product.name}
    className="
    absolute inset-0
    w-full h-full object-cover
    transition-opacity duration-500
    group-hover:opacity-0
    "
  />

  {/* IMAGE 2 */}
  <img
    src={secondImage}
    alt={product.name}
    className="
    absolute inset-0
    w-full h-full object-cover
    opacity-0
    group-hover:opacity-100
    transition-opacity duration-500
    "
  />

  {/* 🔥 STOCK LABEL (ADD THIS) */}
  {(() => {
    const stock = product.totalStock ?? product.stock;

    if (stock === undefined) return null;

    let label = null;
    let style = "";

    if (stock === 0) {
      label = "OUT OF STOCK";
      style = "bg-red-600 text-white";
    } else if (stock <= 5) {
      label = `ONLY ${stock} LEFT`;
      style = "bg-yellow-400 text-black";
    }

    if (!label) return null;

    return (
      <div
        className={`absolute top-2 left-2 z-10 px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-md shadow ${style}`}
      >
        {label}
      </div>
    );
  })()}

  {/* WISHLIST OVERLAY */}
  <div
    className="absolute top-2 right-2 z-10"
    onClick={(e) => e.preventDefault()}
  >
    <WishlistButton productId={product._id || product.id} />
  </div>

</div>

        {/* DETAILS */}
        <div className="p-4 text-center">
          {/* remove WishlistButton from here, keep only the h3 */}
          <div className="flex flex-row items-center justify-center gap-2">
            <h3 className="text-sm sm:text-base font-medium text-primary line-clamp-2">
              {product.name}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 justify-center">
            <div className="flex flex-row items-center gap-3">
              {/* Discount Price */}
              <span className="text-secondary font-semibold sm:text-base text-xs">
                ₹{product.price}
              </span>

              {/* MRP */}
              <span className="text-xs sm:text-sm text-textMuted line-through">
                ₹{product.discountPrice}
              </span>
            </div>

            {/* Discount % */}
            <span className="text-green-600 text-xs font-medium">
              {discountPercent}% OFF
            </span>
          </div>

          {/* STOCK */}
          {/* {product.totalStock && (
            <div
              className={`text-xs mt-1 ${
                product.totalStock > 0 && product.totalStock <= 5
                  ? "text-secondary font-medium"
                  : "text-textMuted font-bold"
              }`}
            >
              {product.totalStock === 0
                ? "Out of stock"
                : product.totalStock <= 5
                  ? `Only ${product.totalStock} left`
                  : `${product.totalStock} in stock`}
            </div>
          )}
          {product.stock && (
            <div
              className={`text-xs mt-1 ${
                product.stock > 0 && product.stock <= 5
                  ? "text-secondary font-medium"
                  : "text-textMuted font-bold"
              }`}
            >
              {product.stock === 0
                ? "Out of stock"
                : product.stock <= 5
                  ? `Only ${product.stock} left`
                  : `${product.stock} in stock`}
            </div>
          )} */}
          {(product.totalStock !== undefined || product.stock !== undefined) && (() => {
  const stock = product.totalStock ?? product.stock;

  return (
    <div
      className={`text-xs mt-1 ${
        stock > 0 && stock <= 5
          ? "text-secondary font-medium"
          : stock === 0
          ? "text-red-500 font-semibold"
          : "text-textMuted font-bold"
      }`}
    >
      {stock === 0
        ? "Out of stock"
        : stock <= 5
        ? `Only ${stock} left`
        : `${stock} in stock`}
    </div>
  );
})()}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
