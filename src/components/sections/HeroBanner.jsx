// import { Link } from "react-router-dom";
// import image from "../../assets/banners/summer-2026.png";
// import banner1 from "../../assets/banners/bannerImage-1.png";
// import banner2 from "../../assets/banners/bannerImage-2.jpeg";
// import banner3 from "../../assets/banners/bannerImage-3.jpeg";
// import { useEffect, useState } from "react";

// export const banners = [
//   {
//     id: 1,
//     image: banner1,
//     title: "Summer Collection 2026",
//     subtitle: "Fresh styles for men, women & kids",
//     tag: "summer",
//     positionX: "center",
//     positionY: "center",
//      color: "text-textPrimary"
//   },
//   {
//     id: 2,
//     image: banner2,
//     title: "Autumn Essentials",
//     subtitle: "Warm styles for the upcoming season",
//     tag: "autumn",
//     positionX: "center",
//     positionY: "center",
//      color: "text-textPrimary"
//   },
//   {
//     id: 3,
//     image: banner3,
//     title: "Denim Collection",
//     subtitle: "Best selling denim jackets & jeans",
//     tag: "best-seller",
//     positionX: "right",
//     positionY: "top",
//     color: "text-borderMedium"
//   },
// ];

// const HeroBanner = () => {
//   const [index, setIndex] = useState(0);

//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % banners.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const banner = banners[index];

//   return (
//     <section className="w-full">
//       <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">

//         {/* IMAGE */}
//         <img
//           src={banner.image}
//           alt={banner.title}
//           className="w-full h-full object-cover transition duration-700"
//         />

//         {/* CONTENT */}
//         <div
//   className={`
//     absolute inset-0 flex
//     ${
//       banner.positionY === "center"
//         ? "items-center"
//         : "items-start pt-16"
//     }
//     ${
//       banner.positionX === "center"
//         ? "justify-center"
//         : banner.positionX === "right"
//         ? "justify-end"
//         : "justify-start"
//     }
//   `}
// >
//   <div className="max-w-[500px] px-6 text-center md:text-left">

//     <h1 className="text-3xl lg:text-6xl md:text-5xl text-primary mb-4 text-center" style={{fontFamily: "var(--font-stylish)"}}>
//       {banner.title}
//     </h1>

//     <p className={`${banner.color} text-center font-semibold mb-6`}>
//   {banner.subtitle}
// </p>

//     <div className="flex justify-center">

//     <Link
//       to={`/products?tag=${banner.tag}`}
//       className="inline-block bg-primary hover:bg-primaryHover text-bgMain px-4 py-2 rounded-md font-medium transition"
//     >
//       Shop Now
//     </Link>
//     </div>

//   </div>
// </div>

//         {/* DOT INDICATORS */}
//         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
//           {banners.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`w-3 h-3 rounded-full ${
//                 index === i ? "bg-white" : "bg-white/40"
//               }`}
//             />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default HeroBanner;

import { Link } from "react-router-dom";
import banner1 from "../../assets/banners/MenImage.png";
import banner2 from "../../assets/banners/WomenImage.png";
import banner3 from "../../assets/banners/kidsImage.png";
import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const banners = [
  {
    id: 1,
    image: banner1,
    label: "NEW SEASON",
    title: "TIMELESS STYLE",
    subtitle:
    "Refined silhouettes and modern essentials designed for everyday confidence. Discover versatile pieces that redefine contemporary fashion.",
    tag: "style",
  },
  {
    id: 2,
    image: banner2,
    label: "JUST ARRIVED",
    title: "EFFORTLESS FASHION",
    subtitle:
      "Beautifully crafted designs that combine comfort and sophistication, perfect for elevating your everyday wardrobe.",
    tag: "fashion",
  },
  {
    id: 3,
    image: banner3,
    label: "NEW COLLECTION",
    title: "STYLE FOR EVERY MOMENT",
    subtitle:
      "Comfortable styles made for joyful adventures, combining durability, freedom of movement, and cheerful designs.",
    tag: "collection",
  },
];

const SLIDE_DURATION = 400;
 
const HeroBanner = () => {
  const [index, setIndex] = useState(0);
  const [slideState, setSlideState] = useState("idle");
  const [displayIndex, setDisplayIndex] = useState(0);
  const isAnimating = useRef(false);
  const autoPlayRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
 
  const goTo = useCallback((next, direction) => {
    if (isAnimating.current || next === index) return;
    isAnimating.current = true;
 
    setSlideState(direction === "left" ? "exit-left" : "exit-right");
 
    setTimeout(() => {
      setDisplayIndex(next);
      setIndex(next);
      setSlideState(direction === "left" ? "enter-right" : "enter-left");
 
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlideState("idle");
          setTimeout(() => { isAnimating.current = false; }, SLIDE_DURATION);
        });
      });
    }, SLIDE_DURATION);
  }, [index]);
 
  const nextSlide = useCallback(() => goTo((index + 1) % banners.length, "left"), [index, goTo]);
  const prevSlide = useCallback(() => goTo((index - 1 + banners.length) % banners.length, "right"), [index, goTo]);
 
  // Auto-play only on mobile
  // useEffect(() => {
  //   if (isMobile) {
  //     autoPlayRef.current = setInterval(nextSlide, 4000);
  //   } else {
  //     clearInterval(autoPlayRef.current);
  //   }
  //   return () => clearInterval(autoPlayRef.current);
  // }, [isMobile, nextSlide]);
  useEffect(() => {
  autoPlayRef.current = setInterval(nextSlide, 3000);
  return () => clearInterval(autoPlayRef.current);
}, [nextSlide]);
 
  const banner = banners[displayIndex];
 
  // const getTransform = () => {
  //   switch (slideState) {
  //     case "exit-left":   return "translateX(-100%)";
  //     case "exit-right":  return "translateX(100%)";
  //     case "enter-right": return "translateX(100%)";
  //     case "enter-left":  return "translateX(-100%)";
  //     default:            return "translateX(0)";
  //   }
  // };
 
  const getAnimation = () => {
  switch (slideState) {
    case "exit-left":
    case "exit-right":
      return {
        transform: "scale(1.08)",
        opacity: 0,
      };

    case "enter-left":
    case "enter-right":
      return {
        transform: "scale(0.95)",
        opacity: 0,
      };

    default:
      return {
        transform: "scale(1)",
        opacity: 1,
      };
  }
};

  // const slideTransition = `transform ${SLIDE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  const slideTransition = `transform 900ms cubic-bezier(.22,.61,.36,1), opacity 900ms ease`;
 
  return (
    <section className="w-full bg-bgMain overflow-hidden lg:py-8">
 
     {/* MOBILE */}
<div className="sm:hidden relative w-full">

  {/* Image */}
  <div className="relative w-full overflow-hidden" style={{ height: "540px" }}>
    <img
      key={displayIndex}
      src={banner.image}
      alt={banner.title}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center top",
        display: "block",
        // transform: getTransform(),
        ...getAnimation(),
        transition: slideTransition,
      }}
    />

    {/* Bottom fade shade */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.0) 65%)",
      }}
    />

    {/* Text on image */}
    <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 text-center text-white">
      <p
        className="text-[10px] font-semibold tracking-widest uppercase mb-2"
        style={{ color: "rgba(255,255,255,0.75)", letterSpacing:"6px" }}
      >
        {banner.label}
      </p>

      <h1
        className="leading-none mb-3 text-bgMain"
        style={{
          fontFamily: "var(--font-bodoni)",
          fontSize: "clamp(1rem, 10vw, 2rem)",
          fontWeight: 900,
          whiteSpace: "pre-line",
        }}
      >
        {banner.title}
      </h1>

      <p
        className="text-sm mb-5 mx-auto max-w-xs leading-relaxed"
        style={{ color: "rgba(255,255,255,0.9)" }}
      >
        {banner.subtitle}
      </p>

      <Link
        to={`/products?tag=${banner.tag}`}
        className="inline-block bg-primary text-bgMain px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
      >
        Shop Now
      </Link>
    </div>
  </div>

  {/* Arrows + Dots */}
  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-4">
    <button
      onClick={prevSlide}
      aria-label="Previous"
      className="text-white/70 hover:text-white transition-colors"
    >
      <ChevronLeft strokeWidth={1.5} size={22} />
    </button>

    <div className="flex items-center gap-2">
      {banners.map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i, i > index ? "left" : "right")}
          aria-label={`Slide ${i + 1}`}
          style={{
            width: i === index ? "22px" : "8px",
            height: "8px",
            borderRadius: "4px",
            backgroundColor:
              i === index ? "#ffffff" : "rgba(255,255,255,0.35)",
            transition: "all 0.3s ease",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
    </div>

    <button
      onClick={nextSlide}
      aria-label="Next"
      className="text-white/70 hover:text-white transition-colors"
    >
      <ChevronRight strokeWidth={1.5} size={22} />
    </button>
  </div>
</div>
 
      {/* ══════════════════════════════════
          TABLET + DESKTOP  ≥ 640px
          Two-column: image left, text right
          Color block peeks top-left of image
      ══════════════════════════════════ */}
      <div className="hidden sm:flex flex-row items-stretch relative min-h-[450px] lg:min-h-[560px]" >
 
        {/* LEFT COLUMN */}
        <div
          className="relative flex-shrink-0"
          style={{
            // At 640px ≈ 50vw, scales toward 44% at larger screens
            width: "clamp(260px, 46vw, 520px)",
          }}
        >
          {/* Primary color block: peeks top + left behind the image */}
          <div className="absolute" style={{
            top: 0, left: 0,
            // Gap on the right = how much image overlaps the block horizontally
            width: "calc(100% - 130px)",
            // Gap on the bottom = color only covers top portion
            height: "100%",
            backgroundColor: "var(--color-primary)",
            zIndex: 0,
            borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
            
          }} />
 
          {/* Image pushed right+down by padding — exposes the color block */}
          <div style={{ padding: "70px 0 0px 0px", height: "100%", boxSizing: "border-box" }} className="ml-[10%] lg:ml-16">
            <div style={{
              position: "relative", zIndex: 1,
               height: "110%", minHeight: "340px",
              overflow: "hidden",
              // marginLeft: "38%",
              borderRadius: "10px"

            }} className="lg:w-[100%] lg:bottom-[10%] -bottom-2">
              <img
                className="w-[100%] h-[90%] lg:h-[100%]"
                key={displayIndex}
                src={banner.image}
                alt={banner.title}
                style={{
                  objectFit: "cover", objectPosition: "center top",
                  display: "block",
                  // willChange: "transform, opacity",
                  // transform: getTransform(),
                  ...getAnimation(),
                  transition: slideTransition,
                }}
              />
            </div>
          </div>
        </div>
 
        {/* RIGHT COLUMN */}
        <div
          className="flex-1 flex flex-col justify-center items-center py-8"
          style={{
            // Scales padding: tight at 640px, generous at 1280px+
            paddingLeft: "clamp(20px, 4vw, 72px)",
            paddingRight: "clamp(16px, 3vw, 40px)",
          }}
        >
          <p className="text-xs font-semibold tracking-widest text-textMuted uppercase mb-3" style={{letterSpacing:"8px"}}>
            {banner.label}
          </p>
          <h1
            className="text-textPrimary leading-none mb-4 w-full text-center"
            style={{
              fontFamily: "var(--font-bodoni)",
              // Scales down at tablet so it doesn't overflow right col
              fontSize: "clamp(1.8rem, 4.8vw, 4rem)",
              fontWeight: 900,
              whiteSpace: "pre-line",
            }}
          >
            {banner.title}
          </h1>
          <p className="text-textSecondary text-sm max-w-full mb-7 leading-relaxed text-center">
            {banner.subtitle}
          </p>
          <div>
            <Link
              to={`/products?tag=${banner.tag}`}
              className="inline-block bg-primary hover:bg-primaryHover text-bgMain px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
 
        {/* ARROWS — centered horizontally under the left column */}
        {/* <div
          className="absolute flex items-center gap-10"
          style={{
            bottom: "0px",
            left: "clamp(280px, 46vw, 780px)",
            transform: "translateX(-0%)",
          }}
        >
          <button
            onClick={prevSlide}
            className="w-8 h-8 flex items-center justify-center text-bgMain bg-primary hover:bg-primaryHover hover:text-bgMain hover:border-primary transition-colors duration-200"
            aria-label="Previous"
          >
            <ChevronLeft strokeWidth={1.5} size={24} className=""/>
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 flex items-center justify-center text-bgMain bg-primary hover:bg-primaryHover hover:text-bgMain hover:border-primary transition-colors duration-200"
            aria-label="Next"
          >
            <ChevronRight strokeWidth={1.5} size={24} />
          </button>
        </div> */}
 
      </div>
    </section>
  );
};
 
export default HeroBanner;
