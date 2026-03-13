import { Link } from "react-router-dom";
import img1 from "../../assets/shirt-Products/image-1.avif";
import img2 from "../../assets/shirt-Products/image-2.avif";

const ProductCard = ({ product }) => {

  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.url ||
    product.images?.[0]?.url;

  const secondImage =
    product.images?.[1]?.url || primaryImage;

  const discountPercent = Math.round(
    ((product.discountPrice - product.price) / product.discountPrice) * 100
  );

  return (
    <Link
      to={`/product/${product.slug || product._id}`}
      className="group block"
    >
      <div className="bg-white rounded-xl overflow-hidden border border-borderLight shadow-sm hover:shadow-md transition">

        {/* IMAGE */}
        <div className="relative h-[320px] overflow-hidden">

          <img
            src={img1 || primaryImage}
            alt={product.name}
            className="
            absolute inset-0
            w-full h-full object-cover
            transition-opacity duration-500
            group-hover:opacity-0
            "
          />

          <img
            src={img2 || secondImage}
            alt={product.name}
            className="
            absolute inset-0
            w-full h-full object-cover
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-500
            "
          />

        </div>

        {/* DETAILS */}
        <div className="p-4">

          <h3 className="text-sm font-medium text-textPrimary line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-2">

            {/* Discount Price */}
            <span className="text-primary font-semibold">
              ₹{product.price}
            </span>

            {/* MRP */}
            <span className="text-sm text-textMuted line-through">
              ₹{product.discountPrice}
            </span>

            {/* Discount % */}
            <span className="text-green-600 text-xs font-medium">
              {discountPercent}% OFF
            </span>

          </div>

          {/* STOCK */}
         <div className="text-xs text-textMuted mt-1">
  {product.totalStock > 0
    ? `${product.totalStock} in stock`
    : "Out of stock"}
</div>

        </div>

      </div>
    </Link>
  );
};

export default ProductCard;