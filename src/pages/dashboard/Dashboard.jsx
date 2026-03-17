import Container from "../../components/layout/Container";
import Footer from "../../components/layout/Footer";
import CategorySection from "../../components/sections/CategorySection";
import HeroBanner from "../../components/sections/HeroBanner";
import ProductListPage from "../products/ProductListPage";
import BrandSection from "../../components/sections/BrandSection";
import BrandSection2 from "../../components/Sections/BrandSection2";
import BrandStorySection from "../../components/sections/BrandStorySection";
import FeaturedProducts from "../../components/sections/FeaturedProducts";

const Dashboard = () => {
  return (
    <div className="bg-bgMain">

      {/* HERO */}
      {/* <section className="py-10"> */}
        {/* <Container> */}
          <HeroBanner />
        {/* </Container> */}
      {/* </section> */}

      {/* CATEGORIES */}
      <section className="py-10">
        {/* <Container > */}
          <CategorySection />
        {/* </Container> */}
      </section>

      {/* All products */}
      <section className="">
        {/* <Container > */}
          {/* <ProductListPage /> */}
          <BrandSection />
        {/* </Container> */}
      </section>

      {/* BEST SELLERS */}
      {/* <section className="py-10"> */}
        {/* <Container> */}
          <BrandSection2 />
        {/* </Container> */}
      {/* </section> */}

      {/* NEW ARRIVALS */}
      {/* <section className="py-10">
        <Container>
          New Arrivals
        </Container>
      </section> */}
       <section className="py-10">
      <FeaturedProducts />
      </section>
      <section className="py-10">

      <BrandStorySection />

      </section>
     <Footer />
    </div>
  );
};

export default Dashboard;