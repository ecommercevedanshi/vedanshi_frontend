// import { Link } from "react-router-dom";
// import { useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";
// import Container from "../layout/Container";

// const CategorySection = () => {
//   const { data } = useGetCategoriesQuery();

//   const scrollRef = useRef(null);

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
  
//   const categories = data?.data?.categories || [];

//   // console.log(categories)
  
//   const mainCategories = categories?.filter(
//     (item) => item.parent === null && item.isActive
//   );
  
//   const [paddingClass, setPaddingClass] = useState("pl-3 pr-12");

//  const handleScroll = () => {
//   const el = scrollRef.current;

//   const isLeft = el.scrollLeft <= 5;
//   const isRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

//   setCanScrollLeft(!isLeft);
//   setCanScrollRight(!isRight);

//   if (isLeft) {
//     setPaddingClass("pl-6 pr-12"); // start
//   } else if (isRight) {
//     setPaddingClass("pl-12 pr-6"); // end
//   } else {
//     setPaddingClass("pl-6 pr-6"); // middle
//   }
// };

//   const scroll = (dir) => {
//     const el = scrollRef.current;
//     const cardWidth = el.offsetWidth / 3;

//     el.scrollBy({
//       left: dir === "left" ? -cardWidth : cardWidth,
//       behavior: "smooth",
//     });
//   };


//   return (
//     <section className="py-6 bg-bgMain">

//       <Container>

//         {/* HEADER */}
//         <div className="mb-10">
// <h2
//   className="text-5xl text-primary text-center"
//   style={{
//     fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
//     letterSpacing: "3px",
//     fontWeight: "400",
//     textShadow: "0px 3px 6px rgba(0,0,0,0.35), 0px 1px 0px rgba(255,255,255,0.4)"
//   }}
// >
//   Shop by Category
// </h2>

//           <p className="text-textMuted mt-2 text-center text-lg " style={{letterSpacing:"6px"}}>
//             Explore curated collections
//           </p>
//         </div>

//         <div className="relative">

//           {/* LEFT FADE */}
//           {canScrollLeft && (
//             <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-bgMain to-transparent z-10 pointer-events-none"/>
//           )}

//           {/* RIGHT FADE */}
//           {canScrollRight && (
//             <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-bgMain to-transparent z-10 pointer-events-none"/>
//           )}

//           {/* LEFT ARROW */}
//           {canScrollLeft && (
//             <button
//               onClick={() => scroll("left")}
//               className="
//               absolute left-4 top-1/2 -translate-y-1/2
//               z-20
//               bg-bgMain shadow-xl
//               rounded-full p-3
//               hover:scale-110 transition
//               "
//             >
//               <ChevronLeft size={20}/>
//             </button>
//           )}

//           {/* RIGHT ARROW */}
//           {canScrollRight && mainCategories.length > 3 && (
//             <button
//               onClick={() => scroll("right")}
//               className="
//               absolute right-4 top-1/2 -translate-y-1/2
//               z-20
//               bg-bgMain shadow-xl
//               rounded-full p-3
//               hover:scale-110 transition
            
//               "
//             >
//               <ChevronRight size={20}/>
//             </button>
//           )}

//           {/* SLIDER */}
//           <div
//             ref={scrollRef}
//             onScroll={handleScroll}
//             className={`
//     flex gap-6
//     overflow-x-auto
//     snap-x snap-mandatory
//     scroll-smooth
//     scrollbar-hide
//     ${paddingClass}
//   `}
//           >

//             {mainCategories.map((category) => (

//               <Link
//                 key={category._id}
//                 to={`/${category.slug}`}
//                 className="min-w-[calc((100%-48px)/3)] group snap-starr"
//               >

// <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg border border-borderLight group">

//   {/* IMAGE */}
//   <img
//     src={category.thumbnail || "/placeholder-category.jpg"}
//     alt={category.name}
//     className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
//   />

//   {/* DARK OVERLAY */}
//   <div
//     className="
//     absolute inset-0
//     bg-gradient-to-t
//     from-black/70
//     via-black/50
//     to-transparent
//     opacity-0
//     group-hover:opacity-100
//     transition duration-500
//     "
//   />

//   {/* CONTENT WRAPPER */}
//   <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">

//     {/* CATEGORY TEXT (moves upward) */}
//     <h3
//       className="
//       text-lg font-semibold text-secondary
//       bg-white px-6 py-3 rounded-md shadow-lg
//       transition-all duration-500
//       group-hover:bg-transparent
//       group-hover:text-white
//       group-hover:-translate-y-32
//       "
//     >
//       {category.name.toUpperCase()}
//     </h3>

//     {/* BUTTON */}
//     <button
//       className="
//       mt-4
//       text-sm
//       text-white
//       bg-primary
//       px-5 py-2
//       rounded
//       opacity-0
//       translate-y-4
//       group-hover:opacity-100
//       group-hover:translate-y-0
//       transition duration-500
//       "
//     >
//       Explore
//     </button>

//   </div>

// </div>

//               </Link>

//             ))}

//           </div>

//         </div>

//       </Container>

//     </section>
//   );
// };

// export default CategorySection;

// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";
// import Container from "../layout/Container";

// const CategorySection = () => {
//   const { data } = useGetCategoriesQuery();

//   const categories = data?.data?.categories || [];

//   const mainCategories = categories.filter(
//     (item) => item.parent === null && item.isActive
//   );

//   const [active, setActive] = useState(0);

//   const prev = () => {
//     setActive((p) => (p === 0 ? mainCategories.length - 1 : p - 1));
//   };

//   const next = () => {
//     setActive((p) => (p === mainCategories.length - 1 ? 0 : p + 1));
//   };

//   const getIndex = (i) => {
//     const total = mainCategories.length;

//     if (i === active) return "center";
//     if (i === (active - 1 + total) % total) return "left";
//     if (i === (active + 1) % total) return "right";

//     return "hidden";
//   };

//   return (
//     <section className="py-16">
//       <Container>

       
//         {/* HEADER */}
//          <div className="mb-10">
//  <h2
//   className="text-5xl text-primary text-center"
//   style={{
//     fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
//     letterSpacing: "3px",
//     fontWeight: "400",
//     textShadow: "0px 3px 6px rgba(0,0,0,0.35), 0px 1px 0px rgba(255,255,255,0.4)"
//   }}
// >
//   Shop by Category
// </h2>

//           <p className="text-textPrimary mt-2 text-center text-lg " style={{letterSpacing:"6px"}}>
//             Explore curated collections
//           </p>
//         </div>

//         <div className="relative h-[420px] flex items-center justify-center">

//           {/* LEFT ARROW */}
//           {mainCategories.length > 3 && (
//             <button
//               onClick={prev}
//               className="absolute left-10 z-30 bg-bgMain hover:bg-[var(--card-soft)] text-textPrimary p-3 rounded-full shadow"
//             >
//               <ChevronLeft />
//             </button>
//           )}

//           {mainCategories.map((cat, i) => {
//   const pos = getIndex(i);

//   let classes =
//     "absolute transition-all duration-500 rounded-2xl shadow-lg ";

//   if (pos === "center")
//     classes += "w-[350px] xl:w-[430px] h-[450px] z-10 scale-100 bg-primary overflow-hidden ";

//   if (pos === "left")
//     classes +=
//       "w-[320px] xl:w-[380px] h-[460px] left-[0.2%] xl:left-[7%] top-[5%] z-10 scale-90 opacity-90 bg-gray-200 hover:z-30";

//   if (pos === "right")
//     classes +=
//       " w-[320px] xl:w-[380px] h-[460px] right-[0.2%] xl:right-[7%] top-[5%] z-10 scale-90 opacity-90 bg-gray-200 ";

//   if (pos === "hidden") classes += " hidden";

//   return (
//     <Link
//   key={cat._id}
//   to={`/${cat.slug}`}
//   className={`${classes} group hover:-translate-y-6`}
// >
//   {/* IMAGE — overflows its card bounds for side cards */}
//   <img
//     src={cat.thumbnail}
//     className={`
//       absolute bottom-0 
//       object-cover
//       transition-all duration-500
//      ${pos === "center" ? "w-full h-[90%] z-10 left-1/2 -translate-x-1/2" : ""}
//   ${pos === "left" ? "xl:w-[115%] w-[100%] h-[123%] xl:h-[125%] z-40 left-10 xl:left-20 -bottom-16" : ""}
//   ${pos === "right" ? "w-[100%] xl:w-[115%] h-[95%] xl:h-[115%] z-40 right-16 xl:right-20 left-auto translate-x-8" : ""}
// `}
//   />

//   {/* DARK OVERLAY on hover */}
//   <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/20 transition-all rounded-2xl duration-500" />

//   {/* LABEL */}
//   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
//     <span
//       className="
//         inline-block
//         bg-white
//         px-6 py-2
//         rounded-full
//         text-sm font-medium
//         transition-all duration-500 ease-out
//         transform
//         group-hover:bg-primary
//         group-hover:text-white
//         group-hover:scale-110
//         group-hover:-translate-y-16
//         shadow-md
//         whitespace-nowrap
//       "
//     >
//       {cat.name.toUpperCase()}
//     </span>
//   </div>
// </Link>
//   );
// })}

//           {/* RIGHT ARROW */}
//           {mainCategories.length > 3 && (
//             <button
//               onClick={next}
//               className="absolute right-10 z-30 bg-bgMain hover:bg-[var(--card-soft)] text-textPrimary p-3 rounded-full shadow"
//             >
//               <ChevronRight />
//             </button>
//           )}

//         </div>

//       </Container>
//     </section>
//   );
// };

// export default CategorySection;

import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";
import Container from "../layout/Container";

const CategorySection = () => {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data?.categories || [];
  const mainCategories = categories.filter(
    (item) => item.parent === null && item.isActive
  );

  // ── DESKTOP state ──
  const [active, setActive] = useState(0);
  const prev = () => setActive((p) => (p === 0 ? mainCategories.length - 1 : p - 1));
  const next = () => setActive((p) => (p === mainCategories.length - 1 ? 0 : p + 1));

  const getIndex = (i) => {
    const total = mainCategories.length;
    if (i === active) return "center";
    if (i === (active - 1 + total) % total) return "left";
    if (i === (active + 1) % total) return "right";
    return "hidden";
  };

  // ── MOBILE state — always loops ──
  const [mobileActive, setMobileActive] = useState(0);
  const mobilePrev = () =>
    setMobileActive((p) => (p === 0 ? mainCategories.length - 1 : p - 1));
  const mobileNext = () =>
    setMobileActive((p) => (p === mainCategories.length - 1 ? 0 : p + 1));

  // Shared mobile card renderer — accepts size config
  const MobileCarousel = ({ config }) => {
    const { height, centerW, sideW, sideTop, leftPos, centerPos, rightPos } = config;

    return (
      <div
        className="relative flex items-center justify-center overflow-hidden w-full"
        style={{ height }}
      >
        {mainCategories.map((cat, i) => {
          const offset = i - mobileActive;
          const total = mainCategories.length;
          const norm =
            offset > total / 2
              ? offset - total
              : offset < -total / 2
              ? offset + total
              : offset;

          const isCenter = norm === 0;
          const isLeft = norm === -1;
          const isRight = norm === 1;
          const isVisible = isCenter || isLeft || isRight;

          return (
            <div
              key={cat._id}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                width: isCenter ? centerW : sideW,
                height: isCenter ? "90%" : "70%",
                left: isLeft ? leftPos : isCenter ? centerPos : isRight ? rightPos : centerPos,
                top: isLeft || isRight ? sideTop : "0%",
                opacity: isVisible ? 1 : 0,
                zIndex: isCenter ? 20 : 10,
                borderRadius: "1rem",
                overflow: "hidden",
                pointerEvents: isVisible ? "auto" : "none",
                background: isCenter ? "var(--color-primary)" : "var(--border-medium)",
              }}
            >
              <Link to={`/${cat.slug}`} className="block w-full h-full group relative">
                <img
                  src={cat.thumbnail}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[90%] object-cover z-10"
                />
                <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                {isCenter && (
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30">
                    <span className="inline-block bg-white px-5 py-2 rounded-full text-sm font-medium shadow-md whitespace-nowrap">
                      {cat.name.toUpperCase()}
                    </span>
                  </div>
                )}
              </Link>
            </div>
          );
        })}

        {/* ALWAYS VISIBLE ARROWS — loop */}
        <button
          onClick={mobilePrev}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-30 bg-white/80 text-textPrimary p-1 rounded-full shadow-md"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={mobileNext}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-30 bg-white/80 text-textPrimary p-1 rounded-full shadow-md"
        >
          <ChevronRight size={14} />
        </button>

        {/* DOT INDICATORS */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {mainCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => setMobileActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === mobileActive ? "bg-primary w-5" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16">
      <Container>

        {/* HEADER */}
        <div className="mb-10">
          <h2
            className="text-2xl sm:text-5xl text-primary text-center"
            style={{
              fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              letterSpacing: "3px",
              fontWeight: "400",
              textShadow: "0px 3px 6px rgba(0,0,0,0.1), 0px 1px 0px rgba(255,255,255,0.4)"
            }}
          >
            Shop by Category
          </h2>
<p
  className="text-textPrimary mt-2 text-center text-xs sm:text-lg italic"
  style={{
    letterSpacing: "3px",
    fontFamily: "var(--font-bodoni)"
  }}
>
  “Style is a way to say who you are without having to speak”
</p>
        </div>

        {/* ── MOBILE < 640px (sm) ── */}
        <div className="sm:hidden">
          <MobileCarousel
            config={{
              height: "280px",
              centerW: "40%",
              sideW: "30%",
              sideTop: "12%",
              leftPos: "1%",
              centerPos: "31%",
              rightPos: "69%",
              // padding:"30px"
            }}
          />
        </div>

        {/* ── TABLET 640px–1023px (sm to lg) ── */}
        <div className="hidden sm:block lg:hidden">
          <MobileCarousel
            config={{
              height: "420px",
              centerW: "40%",
              sideW: "30%",
              sideTop: "10%",
              leftPos: "2%",
              centerPos: "30%",
              rightPos: "68%",
            }}
          />
        </div>

        {/* ── DESKTOP lg+ ── */}
        <div className="hidden lg:block">
          <div className="relative h-[420px] flex items-center justify-center">

            {mainCategories.length > 3 && (
              <button
                onClick={prev}
                className="absolute left-10 z-30 bg-bgMain hover:bg-[var(--card-soft)] text-textPrimary p-3 rounded-full shadow"
              >
                <ChevronLeft />
              </button>
            )}

            {mainCategories.map((cat, i) => {
              const pos = getIndex(i);
              let classes = "absolute transition-all duration-500 rounded-2xl shadow-lg ";
              if (pos === "center")
                classes += "w-[350px] xl:w-[430px] h-[450px] z-10 scale-100 bg-primary overflow-hidden ";
              if (pos === "left")
                classes += "w-[320px] xl:w-[380px] h-[460px] left-[0.2%] xl:left-[7%] top-[5%] z-10 scale-90 opacity-90 bg-gray-200 hover:z-30";
              if (pos === "right")
                classes += " w-[320px] xl:w-[380px] h-[460px] right-[0.2%] xl:right-[7%] top-[5%] z-10 scale-90 opacity-90 bg-gray-200 ";
              if (pos === "hidden") classes += " hidden";

              return (
                <Link
                  key={cat._id}
                  to={`/${cat.slug}`}
                  className={`${classes} group hover:-translate-y-6`}
                >
                  <img
                    src={cat.thumbnail}
                    className={`
                      absolute bottom-0 object-cover transition-all duration-500
                      ${pos === "center" ? "w-full h-[90%] z-10 left-1/2 -translate-x-1/2" : ""}
                      ${pos === "left" ? "xl:w-[115%] w-[100%] h-[123%] xl:h-[115%] z-40 left-10 xl:left-20 -bottom-[12%]" : ""}
                      ${pos === "right" ? "w-[100%] xl:w-[115%] h-[95%] xl:h-[115%] z-40 right-16 xl:right-20 left-auto translate-x-8" : ""}
                    `}
                  />
                  <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/20 transition-all rounded-2xl duration-500" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
                    <span className="
                      inline-block bg-white px-6 py-2 rounded-full
                      text-sm font-medium transition-all duration-500 ease-out transform
                      group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:-translate-y-16
                      shadow-md whitespace-nowrap
                    ">
                      {cat.name.toUpperCase()}
                    </span>
                  </div>
                </Link>
              );
            })}

            {mainCategories.length > 3 && (
              <button
                onClick={next}
                className="absolute right-10 z-30 bg-bgMain hover:bg-[var(--card-soft)] text-textPrimary p-3 rounded-full shadow"
              >
                <ChevronRight />
              </button>
            )}

          </div>
        </div>

      </Container>
    </section>
  );
};

export default CategorySection;