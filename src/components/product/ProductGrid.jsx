const ProductGrid = ({ products, isLoading }) => {

  if (isLoading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">

      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white border border-borderLight rounded-lg overflow-hidden"
        >

          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-[260px] object-cover"
          />

          <div className="p-3">

            <h3 className="text-sm font-medium text-textPrimary">
              {product.name}
            </h3>

            <p className="text-primary font-semibold mt-1">
              ₹{product.price}
            </p>

          </div>

        </div>
      ))}

    </div>
  );
};

export default ProductGrid;