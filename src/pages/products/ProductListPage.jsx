import Container from "../../components/layout/Container";
import ProductCard from "../../components/product/ProductCard";
import { dummyProducts } from "../../data/dummyProducts";

const ProductListPage = () => {
  return (
    <div className="bg-bgMain py-10">

      <Container>

        {/* PAGE TITLE */}
        
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-primary text-center">
            Products
          </h2>

          <p className="text-textMuted mt-1 text-center">
             Showing our huge products collection
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