import { Link } from "react-router-dom";
import image from "../../assets/banners/summer-2026.png";
import banner1 from "../../assets/banners/bannerImage-1.png";
import banner2 from "../../assets/banners/bannerImage-2.jpeg";
import banner3 from "../../assets/banners/bannerImage-3.jpeg";
import { useEffect, useState } from "react";

export const banners = [
  {
    id: 1,
    image: banner1,
    title: "Summer Collection 2026",
    subtitle: "Fresh styles for men, women & kids",
    tag: "summer",
    positionX: "center",
    positionY: "center",
     color: "text-textPrimary"
  },
  {
    id: 2,
    image: banner2,
    title: "Autumn Essentials",
    subtitle: "Warm styles for the upcoming season",
    tag: "autumn",
    positionX: "center",
    positionY: "center",
     color: "text-textPrimary"
  },
  {
    id: 3,
    image: banner3,
    title: "Denim Collection",
    subtitle: "Best selling denim jackets & jeans",
    tag: "best-seller",
    positionX: "right",
    positionY: "top",
    color: "text-borderMedium"
  },
];

const HeroBanner = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const banner = banners[index];

  return (
    <section className="w-full">
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">

        {/* IMAGE */}
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-cover transition duration-700"
        />

        {/* CONTENT */}
        <div
  className={`
    absolute inset-0 flex
    ${
      banner.positionY === "center"
        ? "items-center"
        : "items-start pt-16"
    }
    ${
      banner.positionX === "center"
        ? "justify-center"
        : banner.positionX === "right"
        ? "justify-end"
        : "justify-start"
    }
  `}
>
  <div className="max-w-[500px] px-6 text-center md:text-left">

    <h1 className="text-3xl lg:text-6xl md:text-5xl text-primary mb-4 text-center" style={{fontFamily: "var(--font-stylish)"}}>
      {banner.title}
    </h1>

    <p className={`${banner.color} text-center font-semibold mb-6`}>
  {banner.subtitle}
</p>

    <div className="flex justify-center">

    <Link
      to={`/products?tag=${banner.tag}`}
      className="inline-block bg-primary hover:bg-primaryHover text-bgMain px-4 py-2 rounded-md font-medium transition"
    >
      Shop Now
    </Link>
    </div>

  </div>
</div>

        {/* DOT INDICATORS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                index === i ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroBanner;