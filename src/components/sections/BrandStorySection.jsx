// import { useEffect, useRef, useState } from "react";

// const BrandStorySection = () => {

//   const sectionRef = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.4 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();

//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full bg-primary border-t border-borderLight py-20"
//       style={{
//         boxShadow:
//           "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//       }}
//     >

//       <div className=" mx-auto px-6 text-center flex flex-col justify-center">

//         {/* HEADING */}
//         <h2
//   className={`
//     text-xl md:text-3xl lg:text-4xl
//     font-semibold
//     text-bgMain
//     tracking-wide
//     mb-6
//     py-2
//     text-center
//   `}
//   style={{
//     fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
//     letterSpacing: "3px",
//     fontWeight: "400",
//     textShadow:
//       "0px 3px 6px rgba(0,0,0,0.35), 0px 1px 0px rgba(255,255,255,0.4)",
//   }}
// >
//   <span className={visible ? "" : "opacity-0"}>
//     Timeless Clothing Designed for Modern Living
//   </span>
// </h2>

//         {/* PARAGRAPH */}
//         <p
//           className={`
//             text-borderMedium
//             leading-relaxed
//             max-w-[750px]
//             mx-auto
//             text-sm md:text-base
//             transition-all duration-700 ease-out
//             ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
//           `}
//         >
//           At our brand, style goes beyond trends — it’s about confidence,
//           individuality, and effortless expression. Each piece is thoughtfully
//           designed using premium fabrics and modern craftsmanship to deliver
//           comfort, durability, and refined aesthetics. We believe great clothing
//           should adapt to your lifestyle, empower your presence, and make every
//           moment feel naturally stylish.
//         </p>

//       </div>

//     </section>
//   );
// };

// export default BrandStorySection;

import { useEffect, useRef, useState } from "react";
import bannerImg from "../../assets/footer/Png.png";
import Container from "../layout/Container";

const BrandStorySection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-6">
      <Container>

        {/* ── MOBILE / TABLET (below lg) — stacked, no absolute ── */}
        <div
          className="lg:hidden w-full rounded-3xl overflow-hidden flex flex-col items-center"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {/* IMAGE on top */}
          <img
            src={bannerImg}
            alt="Jaimax fashion"
            className="w-[220px] sm:w-[280px] object-contain mt-6"
          />

          {/* TEXT below */}
          <div className="px-6 pb-8 pt-4 text-center">
            <p
              className={`text-white/60 text-xs tracking-[4px] mb-3 uppercase
                transition-all duration-500 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "100ms" }}
            >
              Our Story
            </p>
            <h2
              className={`text-white text-xl sm:text-2xl mb-4 leading-snug
                transition-all duration-500 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ fontFamily: "Georgia, serif", transitionDelay: "200ms" }}
            >
              Timeless Clothing Designed for Modern Living
            </h2>
            <p
              className={`text-white/75 text-sm sm:text-base leading-relaxed
                transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "350ms" }}
            >
              At Jaimax, style goes beyond trends — it's about confidence,
              individuality, and effortless expression. Each piece is thoughtfully
              crafted using premium fabrics to deliver comfort, durability, and
              refined aesthetics for every moment.
            </p>
          </div>
        </div>

        {/* ── DESKTOP (lg and above) — absolute image bleeding out ── */}
        <div
          className="hidden lg:flex relative w-full rounded-3xl overflow-visible items-center"
          style={{
            backgroundColor: "var(--color-primary)",
            minHeight: "180px",
          }}
        >
          {/* IMAGE — absolute, bleeds below */}
          <div className="w-[320px] xl:w-[380px] flex-shrink-0 absolute lg:-left-8 xl:-left-10 -bottom-10 lg:scale-110 xl:scale-100">
            <img
              src={bannerImg}
              alt="Jaimax fashion"
              className="w-full object-contain"
            />
          </div>

          {/* TEXT */}
          <div className="w-full pl-[320px] xl:pl-[390px] pr-10 xl:pr-16 py-10 text-left">
            <p
              className={`text-white/60 text-xs tracking-[4px] mb-3 uppercase
                transition-all duration-500 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "100ms" }}
            >
              Our Story
            </p>
            <h2
              className={`text-white text-2xl xl:text-3xl mb-4 leading-snug
                transition-all duration-500 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ fontFamily: "Georgia, serif", transitionDelay: "200ms" }}
            >
              Timeless Clothing Designed for Modern Living
            </h2>
            <p
              className={`text-white/75 text-base leading-relaxed
                transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "350ms" }}
            >
              At Jaimax, style goes beyond trends — it's about confidence,
              individuality, and effortless expression. Each piece is thoughtfully
              crafted using premium fabrics to deliver comfort, durability, and
              refined aesthetics for every moment.
            </p>
          </div>
        </div>

      </Container>
    </section>
  );
};

export default BrandStorySection;