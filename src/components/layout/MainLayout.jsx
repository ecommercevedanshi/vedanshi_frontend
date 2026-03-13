import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-bgMain min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER (later) */}
      {/* <Footer /> */}

    </div>
  );
};

export default MainLayout;