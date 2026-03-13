import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  const discount = Math.round(
    ((product.mrp - product.minPrice) / product.mrp) * 100
  );

  const image =
    product.images?.find((img) => img.isPrimary)?.url ||
    product.images?.[0]?.url;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="
      bg-white
      border border-borderLight
      rounded-lg
      overflow-hidden
      group
      hover:shadow-lg
      transition
      "
    >
      {/* IMAGE */}
      <div className="h-[260px] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={product.name}
          className="
          w-full h-full object-cover
          group-hover:scale-105
          transition duration-300
          "
        />
      </div>

      {/* DETAILS */}
      <div className="p-3">

        <h3 className="text-sm font-medium text-textPrimary line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">

          <span className="text-primary font-semibold">
            ₹{product.minPrice}
          </span>

          <span className="text-xs line-through text-textMuted">
            ₹{product.mrp}
          </span>

          <span className="text-xs text-green-600 font-medium">
            {discount}% OFF
          </span>

        </div>

      </div>

    </Link>
  );
};

export default ProductCard;