import Container from "../../components/layout/Container";
import CategorySection from "../../components/sections/CategorySection";
import HeroBanner from "../../components/sections/HeroBanner";

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

    </div>
  );
};

export default Dashboard;