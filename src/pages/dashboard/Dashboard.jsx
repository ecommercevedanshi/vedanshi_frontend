import Container from "../../components/layout/Container";
import Footer from "../../components/layout/Footer";
import CategorySection from "../../components/sections/CategorySection";
import HeroBanner from "../../components/sections/HeroBanner";
import ProductListPage from "../products/ProductListPage";

const Dashboard = () => {
  return (
    <div className="bg-bgMain">

      {/* HERO */}
      <section className="py-10">
        <Container>
          <HeroBanner />
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="">
        <Container >
          <CategorySection />
        </Container>
      </section>

      {/* All products */}
      <section className="">
        <Container >
          <ProductListPage />
        </Container>
      </section>

      {/* BEST SELLERS */}
      <section className="py-10">
        <Container>
          Best Sellers
        </Container>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-10">
        <Container>
          New Arrivals
        </Container>
      </section>
     <Footer />
    </div>
  );
};

export default Dashboard;