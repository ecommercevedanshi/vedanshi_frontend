import { useParams } from "react-router-dom";
import Container from "../../components/layout/Container"

import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice"
import {
  useGetProductsByCategoryQuery
} from "../../features/products/productApiSlice";

import SubCategorySlider from "../../components/category/SubCategorySlider";
import ProductGrid from "../../components/product/ProductGrid";

const CategoryPage = () => {

  const { slug } = useParams();

  const { data: categoryData } = useGetCategoriesQuery();

  const { data: productData, isLoading } =
    useGetProductsByCategoryQuery(slug);

  const categories = categoryData?.data || [];

  const subCategories = categories.filter(
    (item) =>
      item.parent &&
      item.parent.toLowerCase() === slug.toLowerCase()
  );

  const products = productData?.data || [];

  return (
    <div className="bg-bgMain min-h-screen">

      <Container>

        {/* SUBCATEGORY SELECTOR */}
        <SubCategorySlider subCategories={subCategories} />

        {/* PRODUCTS */}
        <ProductGrid products={products} isLoading={isLoading} />

      </Container>

    </div>
  );
};

export default CategoryPage;