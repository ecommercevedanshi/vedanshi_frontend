import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetCategoriesQuery } from "../../features/category/categoryApiSlice";
import Container from "../layout/Container";

const CategorySection = () => {
  const { data } = useGetCategoriesQuery();

  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const categories = data?.data || [];

  console.log(categories)
  
  const mainCategories = categories.filter(
    (item) => item.parent === null && item.isActive
  );
  
  const [paddingClass, setPaddingClass] = useState("pl-3 pr-12");

 const handleScroll = () => {
  const el = scrollRef.current;

  const isLeft = el.scrollLeft <= 5;
  const isRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

  setCanScrollLeft(!isLeft);
  setCanScrollRight(!isRight);

  if (isLeft) {
    setPaddingClass("pl-6 pr-12"); // start
  } else if (isRight) {
    setPaddingClass("pl-12 pr-6"); // end
  } else {
    setPaddingClass("pl-6 pr-6"); // middle
  }
};

  const scroll = (dir) => {
    const el = scrollRef.current;
    const cardWidth = el.offsetWidth / 3;

    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };


  return (
    <section className="py-6 bg-bgMain">

      <Container>

        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-primary text-center">
            Shop by Category
          </h2>

          <p className="text-textMuted mt-1 text-center">
            Explore curated collections
          </p>
        </div>

        <div className="relative">

          {/* LEFT FADE */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-bgMain to-transparent z-10 pointer-events-none"/>
          )}

          {/* RIGHT FADE */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-bgMain to-transparent z-10 pointer-events-none"/>
          )}

          {/* LEFT ARROW */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="
              absolute left-4 top-1/2 -translate-y-1/2
              z-20
              bg-bgMain shadow-xl
              rounded-full p-3
              hover:scale-110 transition
              "
            >
              <ChevronLeft size={20}/>
            </button>
          )}

          {/* RIGHT ARROW */}
          {canScrollRight && mainCategories.length > 3 && (
            <button
              onClick={() => scroll("right")}
              className="
              absolute right-4 top-1/2 -translate-y-1/2
              z-20
              bg-bgMain shadow-xl
              rounded-full p-3
              hover:scale-110 transition
              "
            >
              <ChevronRight size={20}/>
            </button>
          )}

          {/* SLIDER */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={`
    flex gap-6
    overflow-x-auto
    snap-x snap-mandatory
    scroll-smooth
    scrollbar-hide
    ${paddingClass}
  `}
          >

            {mainCategories.map((category) => (

              <Link
                key={category._id}
                to={`/${category.slug}`}
                className="min-w-[calc((100%-48px)/3)] group snap-starr"
              >

                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg border border-borderLight">

                  {/* IMAGE */}
                  <img
                    src={
                      category.thumbnail ||
                      category.thumbnail ||
                      "/placeholder-category.jpg"
                    }
                    alt={category.name}
                    className="
                    w-full h-full object-cover
                    transition duration-700
                    group-hover:scale-110
                    "
                  />

                  {/* DARK GRADIENT */}
                  <div className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-black/10
                  to-transparent
                  opacity-60
                  group-hover:opacity-90
                  transition
                  "/>

                  {/* TEXT CONTENT */}
                  <div
                    className="
                    absolute bottom-0 left-0
                    w-full p-6
                    text-bgMain
                    translate-y-6
                    group-hover:translate-y-0
                    transition duration-500
                    "
                  >

                    {/* CATEGORY NAME */}
                    <h3
                      className="
                      text-2xl font-semibold
                      opacity-90
                      group-hover:opacity-100
                      transition
                      "
                    >
                      {category.name}
                    </h3>

                    {/* SUBTEXT */}
                    <p
                      className="
                      text-sm text-bgMain/80 mt-1
                      opacity-0
                      group-hover:opacity-100
                      transition delay-100
                      "
                    >
                      Explore Collection
                    </p>

                    {/* BUTTON */}
                    <span
                      className="
                      inline-block mt-4
                      px-4 py-2
                      bg-primary
                      rounded-md
                      text-sm
                      opacity-0
                      group-hover:opacity-100
                      transition delay-200
                      "
                    >
                      Shop Now
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </Container>

    </section>
  );
};

export default CategorySection;