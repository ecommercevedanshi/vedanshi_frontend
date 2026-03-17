// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const CategoryHero = ({ image, slug }) => {

//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" });

//     const timer = setTimeout(() => {
//       setShowText(true);
//     }, 900);

//     return () => clearTimeout(timer);
//   }, []);

//   // CATEGORY TEXT + STYLE CONFIG
//   const categoryConfig = {
//     men: {
//       text: "Mens Collection",
//       gradient: "linear-gradient(to right, var(--color-primary) 50%, white 50%)"
//     },
//     women: {
//       text: "Womens Collection",
//       gradient: "linear-gradient(to right, white 50%, var(--color-primary) 50%)"
//     },
//     kids: {
//       text: "Kids Collection",
//       gradient: "linear-gradient(to right, var(--color-primary) 50%, white 50%)"
//     }
//   };

//   const current = categoryConfig[slug] || categoryConfig.men;

//   return (
//     <div className="relative w-full h-[85vh] overflow-hidden sm:px-12">

//       {/* IMAGE */}
//       <motion.img
//         src={image}
//         alt="category"
//         initial={{ y: 200, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="w-full h-full object-cover"
//       />

//       {/* TEXT */}
//       {showText && (
//         <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex justify-center">

//           <motion.h1
//             initial={{ y: 40, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="
//               text-3xl
//               sm:text-6xl
//               lg:text-7xl
//               text-center
//               px-4
//               tracking-[4px]
//               sm:tracking-[8px]
//               lg:tracking-[12px]
//               typing-text
//             "
//             style={{
//               fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
//               fontWeight: "400",
//               background: current.gradient,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent"
//             }}
//           >
//             {current.text}
//           </motion.h1>

//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryHero;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CategoryHero = ({ image, slug }) => {

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const timer = setTimeout(() => {
      setShowText(true);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  // CATEGORY TEXT CONFIG
  const categoryConfig = {
    men: { text: "Mens Collection" },
    women: { text: "Womens Collection" },
    kids: { text: "Kids Collection" }
  };

  const current = categoryConfig[slug] || categoryConfig.men;

  return (
    <div className="relative w-full h-[85vh] overflow-hidden sm:px-12">

      {/* IMAGE */}
      <motion.img
        src={image}
        alt="category"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full object-cover"
      />

      {/* TEXT */}
      {showText && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex justify-center">

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              text-3xl
              sm:text-6xl
              lg:text-7xl
              text-center
              px-4
              tracking-[4px]
              sm:tracking-[8px]
              lg:tracking-[12px]
              typing-text
              text-textSecondary
            "
            style={{
              fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              fontWeight: "400",

              // background: current.gradient,
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent"
            }}
          >
            {current.text}
          </motion.h1>

        </div>
      )}

    </div>
  );
};

export default CategoryHero;