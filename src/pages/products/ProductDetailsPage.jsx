import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../features/products/productApiSlice";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, openCart } from "../../features/cart/cartSlice";
import { useAddToCartMutation } from "../../features/cart/cartApiSlice";
import { getColorHex } from "../../utils/colorToHex";
import WishlistButton from "../../utils/WishlistButton";
import { useGetAllProductsQuery } from "../../features/products/productApiSlice";
import ProductGrid from "../../components/product/ProductGrid";
import Container from "../../components/layout/Container";
import FeaturedProducts from "../../components/sections/FeaturedProducts";

const ProductDetailsPage = () => {
  const { category, subCategory, productSlug } = useParams();

  const { data, isLoading } = useGetProductDetailsQuery(productSlug);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [addCart, { isLoading: cartLoading }] = useAddToCartMutation();
  const { data: defaultData, isLoading: defaultLoading } =
    useGetAllProductsQuery();
  const products = defaultData?.data?.products ?? [];
  // console.log(products);

  const product = data?.data;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (selectedVariant) {
      setQty(1);
    }
  }, [selectedVariant]);

  useEffect(() => {
    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <>
        {/* BREADCRUMB SKELETON */}
        <div className="w-full xl:px-40 px-4 mx-auto flex flex-row gap-2 items-center py-6 border-b">
          <div className="w-6 h-6 bg-borderLight rounded animate-pulse" />
          <div className="w-48 h-4 bg-borderLight rounded animate-pulse" />
        </div>

        <div className="pt-16 pb-16 max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT — image skeleton */}
            <div className="flex flex-col gap-4">
              <div className="w-full h-[600px] bg-borderLight rounded-lg animate-pulse" />
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-borderLight rounded-md flex-shrink-0 animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — details skeleton */}
            <div className="space-y-4 pt-2">
              {/* brand */}
              <div className="w-20 h-3 bg-borderLight rounded animate-pulse" />
              {/* name */}
              <div className="w-3/4 h-8 bg-borderLight rounded animate-pulse" />
              {/* tags */}
              <div className="flex gap-2">
                <div className="w-24 h-6 bg-borderLight rounded-full animate-pulse" />
                <div className="w-20 h-6 bg-borderLight rounded-full animate-pulse" />
              </div>
              {/* price */}
              <div className="flex items-center gap-3 mt-2">
                <div className="w-24 h-7 bg-borderLight rounded animate-pulse" />
                <div className="w-16 h-5 bg-borderLight rounded animate-pulse" />
                <div className="w-16 h-5 bg-borderLight rounded animate-pulse" />
              </div>
              {/* category */}
              <div className="w-40 h-4 bg-borderLight rounded animate-pulse" />
              {/* description */}
              <div className="space-y-2 pt-2">
                <div className="w-full h-3 bg-borderLight rounded animate-pulse" />
                <div className="w-5/6 h-3 bg-borderLight rounded animate-pulse" />
                <div className="w-4/6 h-3 bg-borderLight rounded animate-pulse" />
              </div>
              {/* sizes */}
              <div>
                <div className="w-12 h-4 bg-borderLight rounded animate-pulse mb-2" />
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-14 h-9 bg-borderLight rounded-md animate-pulse"
                    />
                  ))}
                </div>
              </div>
              {/* colours */}
              <div>
                <div className="w-14 h-4 bg-borderLight rounded animate-pulse mb-2" />
                <div className="flex gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-borderLight rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
              {/* quantity */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 bg-borderLight rounded animate-pulse" />
                <div className="w-6 h-6 bg-borderLight rounded animate-pulse" />
                <div className="w-10 h-10 bg-borderLight rounded animate-pulse" />
              </div>
              {/* buttons */}
              <div className="flex gap-4 pt-2">
                <div className="w-36 h-12 bg-borderLight rounded-full animate-pulse" />
                <div className="w-40 h-12 bg-borderLight rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 text-center text-textMuted">Product not found</div>
    );
  }

  const images = [...(product.images || [])].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  const price = selectedVariant?.price ?? product.minPrice;
  const mrp = selectedVariant?.mrp ?? product.mrp;

  const discountPercent =
    mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    const payload = {
      id: product._id,
      variantId: selectedVariant._id,
      quantity: qty,
    };

    try {
      // USER LOGGED IN → backend cart
      if (user) {
        await addCart(payload).unwrap();
        setQty(1);
        dispatch(openCart()); // open drawer
        return;
      }

      // GUEST → redux + localStorage
      dispatch(
        addToCart({
          id: crypto.randomUUID(),
          productId: product._id,
          variantId: selectedVariant._id,
          slug: product.slug,
          name: product.name,
          image: images[activeImage]?.url,
          price: selectedVariant.price,
          size: selectedVariant.size,
          qty: qty,
          stock: selectedVariant.stockQty,
        }),
      );
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  return (
    <>
      <div className="w-full xl:px-40 px-4 mx-auto flex flex-row gap-2 items-center py-6 border-b">
        <div className="p-1 cursor-pointer hover:text-bgMain hover:bg-primary text-primary ">
          <ArrowLeft className="" size={20} onClick={() => navigate(-1)} />
        </div>
        <p className="text-primary sm:text-xl text-sm">
          {category} / {subCategory} / {productSlug}
        </p>
      </div>
      <div className="pt-16 max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT IMAGES */}

          <div className="flex flex-col gap-4">
            <div className="w-full h-[600px] bg-bgMain border border-borderLight rounded-lg overflow-hidden">
              <img
                src={images[activeImage]?.url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* THUMBNAILS */}

            <div className="flex gap-3 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 border border-2 rounded-md overflow-hidden flex-shrink-0
                ${
                  activeImage === index
                    ? "border-primary"
                    : "border-borderLight"
                }`}
                >
                  <img
                    src={img.url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}

          <div>
            {/* BRAND */}

            <p className="text-xs tracking-widest text-textMuted uppercase">
              {product.brand}
            </p>

            {/* NAME */}

            <h1 className="text-3xl font-semibold text-primary mt-2">
              {product.name}
            </h1>

            {/* TAGS */}

            {product.tags?.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 border border-primary bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* PRICE */}

            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-semibold text-secondary">
                ₹{price}
              </span>

              {mrp && (
                <>
                  <span className="line-through text-textMuted">₹{mrp}</span>

                  <span className="text-green-600 text-sm font-medium">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* CATEGORY */}

            <p className="mt-4 text-sm text-textMuted">
              Category :
              <span className="text-textPrimary font-medium ml-1">
                {product.category} / {product.subCategory}
              </span>
            </p>

            {/* STOCK */}

            {/* <p className="mt-3 text-sm">
              {product.totalStock > 0 ? (
                <span className="text-secondary font-medium">
                  {product.totalStock} available
                </span>
              ) : (
                <span className="text-red-500 font-medium">Out of stock</span>
              )}
            </p> */}
            {selectedVariant ? (
              selectedVariant.stockQty > 0 ? (
                <span className="text-secondary font-medium">
                  {selectedVariant.stockQty} available
                </span>
              ) : (
                <span className="text-red-500 font-medium">Out of stock</span>
              )
            ) : null}

            {/* SHORT DESCRIPTION */}

            {product.shortDescription && (
              <p className="mt-6 text-sm text-textMuted leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* SIZES */}

            {product.availableSizes?.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-textPrimary mb-2">
                  Sizes
                </p>

                <div className="flex gap-2 flex-wrap">
                  {product.availableSizes.map((size) => {
                    const variant = product.variants.find(
                      (v) => v.size === size,
                    );

                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 border rounded-md text-sm transition
        ${
          selectedVariant?.size === size
            ? "border-primary bg-primary text-white"
            : "border-borderLight hover:border-primary"
        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* COLOURS */}

            {product.availableColours?.length > 0 ? (
              <div className="mt-7">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-widest uppercase font-semibold text-textPrimary">
                    Colour
                  </p>
                  {/* {selectedVariant?.colour && (
                    <span className="text-xs text-primary font-medium capitalize">
                      {selectedVariant.colour}
                    </span>
                  )} */}
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?._id === variant._id;
                    return (
                      <button
                        key={variant._id}
                        onClick={() => setSelectedVariant(variant)}
                        title={variant.colour}
                        className={`
                          relative w-9 h-9 rounded-full border-2 transition-all duration-150
                          ${
                            isSelected
                              ? "border-primary scale-110 shadow-md"
                              : "border-transparent hover:border-primary/50 hover:scale-105"
                          }
                        `}
                        style={{
                          backgroundColor: getColorHex(
                            variant.colour,
                            variant.hex,
                          ),
                        }}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-bgMain pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ): (
              <p></p>
            )}

            {/* QUANTITY */}
            {selectedVariant && (
              <div className="mt-4">
                <p className="text-sm font-medium text-textPrimary mb-3">
                  Quantity
                </p>

                <div className="flex items-center gap-3 ">
                  {/* MINUS */}
                  <button
                    disabled={qty <= 1}
                    onClick={() => setQty(qty - 1)}
                    className={`w-10 h-10 border border-textPrimary ${
                      qty <= 1 ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                  >
                    -
                  </button>

                  <span className="min-w-[20px] text-center">{qty}</span>

                  {/* PLUS */}
                  <button
                    disabled={qty >= selectedVariant.stockQty}
                    onClick={() => setQty(qty + 1)}
                    className={`w-10 h-10 border border-textPrimary ${
                      qty >= selectedVariant.stockQty
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    +
                  </button>
                </div>

                {selectedVariant.stockQty <= 5 && (
                  <p className="text-xs text-red-500 mt-1">
                    Only {selectedVariant.stockQty} left
                  </p>
                )}
              </div>
            )}

            {/* ADD TO CART */}
            <div className="flex flex-col sm:flex-row sm:gap-5">
              <button
                disabled={product.totalStock === 0}
                className="
              mt-4
              w-full
              px-4
              py-3
              rounded-full
              bg-primary
              text-white
              font-medium
              hover:bg-primaryHover
              transition
              disabled:bg-borderLight
              disabled:text-textMuted
              md:w-auto
            "
                onClick={handleAddToCart}
              >
                {product.totalStock === 0 ? "Sold Out" : "Add to Cart"}
              </button>
              {user && (
                <WishlistButton
                  productId={product._id}
                  renderAs="button"
                  mode="check"
                  disabled={product.totalStock === 0}
                  className="mt-4 w-full md:w-auto"
                />
              )}
            </div>
          </div>
        </div>

        {/* FULL DESCRIPTION */}

        {product.description && (
          <div className="mt-16 border-t border-borderLight pt-10">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Product Description
            </h2>

            <p className="text-textMuted leading-relaxed text-sm">
              {product.description}
            </p>
          </div>
        )}

        {/* CLOTH DETAILS */}

        {product.clothDetails && (
          <div className="mt-12 border-t border-borderLight py-10">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Product Details
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-textMuted">Material</p>
                <p className="font-medium text-textPrimary">
                  {product.clothDetails.material}
                </p>
              </div>

              <div>
                <p className="text-textMuted">Fit</p>
                <p className="font-medium text-textPrimary">
                  {product.clothDetails.fit}
                </p>
              </div>

              <div>
                <p className="text-textMuted">Sleeve</p>
                <p className="font-medium text-textPrimary">
                  {product.clothDetails.sleeve}
                </p>
              </div>

              <div>
                <p className="text-textMuted">Wash Care</p>
                <p className="font-medium text-textPrimary">
                  {product.clothDetails.washCare}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr />
<FeaturedProducts />
<div className="pb-12"></div>
    
    </>
  );
};

export default ProductDetailsPage;
