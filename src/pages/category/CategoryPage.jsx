import { useParams } from "react-router-dom";
import Container from "../../components/layout/Container";

import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";
import { useGetProductsByCategoryQuery } from "../../features/products/productApiSlice";

import SubCategorySlider from "../../components/category/SubCategorySlider";
import ProductGrid from "../../components/product/ProductGrid";
import { CollectionSection } from "../../components/category/CollectionSection";
import CategoryHero from "../../components/category/CategoryHero";
import menHero from "../../assets/category/men-category-bg.jpeg";
import womenHero from "../../assets/category/women-category-bg.jpeg";
import kidsHero from "../../assets/category/kids-category-bg.jpeg";
import centerMen from "../../assets/category/men-center-bg.jpeg"
import centerWomen from "../../assets/category/women-center-bg.jpeg"
import centerKids from "../../assets/category/kids-center-bg.jpeg"
import { useState } from "react";

const chunkCategories = (arr, size = 4) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const CategoryPage = () => {
  const { slug } = useParams();

  const { data: categoryData } = useGetCategoriesQuery();
  const [page, setPage] = useState(1);

  const categories = categoryData?.data?.categories || [];

  const subCategories = categories.filter(
    (item) => item.parent && item.parent.toLowerCase() === slug.toLowerCase(),
  );

  const heroImages = [
    { key: "women", image: womenHero },
    { key: "men", image: menHero },
    { key: "kids", image: kidsHero },
  ];

  const heroImage =
    heroImages.find((item) => slug?.toLowerCase().includes(item.key))?.image ||
    menHero;

  const centerBgImages = [
    { key: "women", image: centerWomen },
    { key: "men", image: centerMen },
    { key: "kids", image: centerKids },
  ];

  const centerBgImage =
    centerBgImages.find((item) => slug?.toLowerCase().includes(item.key))?.image ||
    centerMen;

  const grouped = chunkCategories(subCategories, 4);

  const { data: productData, isLoading } =
  useGetProductsByCategoryQuery({ slug, page });

const products = productData?.data?.products || [];
const totalPages = productData?.data?.totalPages || 1;

  // console.log(products)

  return (
  <div className="bg-bgMain min-h-screen">

    {/* HERO */}
    <CategoryHero image={heroImage} slug={slug} />

    {/* SUBCATEGORY GRID */}
    <section className="py-10">
      <Container>
        {grouped.map((group, i) => (
          <CollectionSection
            key={i}
            categories={group}
            bgImage={centerBgImage}
            parentSlug={slug}
          />
        ))}
      </Container>
    </section>

    {/* PRODUCTS SECTION */}
    <section className="py-12 border-t border-borderLight">

      <Container>

        <h2 className="text-2xl sm:text-4xl mb-8 capitalize font-[var(--font-bodoni)] text-primary" style={{fontWeight:"600"}}>
          {slug} Collection
        </h2>

        <ProductGrid products={products} isLoading={isLoading} />

        {/* LOAD MORE */}
        {page < totalPages && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition"
            >
              Load More
            </button>
          </div>
        )}

      </Container>

    </section>

  </div>
);
};

export default CategoryPage;
