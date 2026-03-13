import Container from "../../components/layout/Container";
import ProductCard from "../../components/product/ProductCard";
import { dummyProducts } from "../../data/dummyProducts";

const ProductListPage = () => {
  return (
    <div className="bg-bgMain min-h-screen py-10">

      <Container>

        {/* PAGE TITLE */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-textPrimary">
            Products
          </h1>
          <p className="text-textMuted text-sm">
            Showing {dummyProducts.length} products
          </p>
        </div>

        {/* PRODUCT GRID */}
        <div
          className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-6
          "
        >
          {dummyProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </Container>

    </div>
  );
};

export default ProductListPage;