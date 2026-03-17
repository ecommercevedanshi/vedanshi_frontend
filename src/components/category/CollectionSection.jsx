import { useState } from "react";
import boxGridBg from "../../assets/category/boxBg.jpeg";
import { Link } from "react-router-dom";

export const CollectionSection = ({ categories, bgImage, parentSlug }) => {

  const boxes = [...categories];

  // console.log(categories)

  while (boxes.length < 4) {
    boxes.push(null);
  }

  return (
    <div
      className="relative py-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* MOBILE DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 md:bg-transparent" />

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:grid grid-cols-3 gap-10 lg:gap-14 items-center relative">

        {/* LEFT */}
        <div className="flex flex-col gap-6">

          {boxes[0]
            ? <CollectionBox category={boxes[0]} parentSlug={parentSlug}/>
            : <QuoteBox text="Style is a way to say who you are without speaking." />}

          {boxes[1]
            ? <CollectionBox category={boxes[1]} parentSlug={parentSlug}/>
            : <QuoteBox text="Fashion is the armor to survive reality." />}

        </div>

        <div />

        {/* RIGHT */}
        <div className="flex flex-col gap-6">

          {boxes[2]
            ? <CollectionBox category={boxes[2]} parentSlug={parentSlug}/>
            : <QuoteBox text="Elegance never goes out of style." />}

          {boxes[3]
            ? <CollectionBox category={boxes[3]} parentSlug={parentSlug}/>
            : <QuoteBox text="Fashion fades, style is eternal." />}

        </div>

      </div>

      {/* MOBILE GRID */}
      <div className="grid grid-cols-2 gap-4 md:hidden relative px-4">

        {boxes.map((box, i) =>
          box
            ? <CollectionBox key={i} category={box} />
            : <QuoteBox key={i} text="Coming Soon" />
        )}

      </div>

    </div>
  );
};

export const CollectionBox = ({ category, parentSlug }) => {

  if (!category) {
    return (
      <div className="md:h-[350px] h-[200px] bg-white/80 backdrop-blur rounded-xl flex items-center justify-center text-gray-400">
        Coming Soon
      </div>
    );
  }

  return (
    <Link to={`/${parentSlug}/${category.slug}`}>
    <div
      className="
      md:h-[350px] h-[200px]
      rounded-xl
      relative
      overflow-hidden
      cursor-pointer
      group
      border
      flex items-center justify-center
      "
      style={{ backgroundImage: `url(${boxGridBg})` }}
    >

      {category.thumbnail && (
        <img
          src={category.thumbnail}
          className="
          absolute
          w-[75%]
          h-[75%]
          object-cover
          rounded-xl
          transition duration-500
          group-hover:scale-105
          group-hover:-translate-y-1
          "
        />
      )}

      {/* CATEGORY BUTTON */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] flex justify-center">
  <span
    className="
      text-bgMain
      sm:px-4 px-2.5 py-1.5 sm:py-2
      bg-primary
      rounded-full
      sm:text-sm
      text-xs
      tracking-wide
      shadow-md
      transition-all duration-300
      group-hover:scale-105
      group-hover:shadow-lg
      group-hover:bg-primaryHover
      text-center
      break-words
      whitespace-normal
      max-w-[220px]
    "
  >
    {category.name}
  </span>
</div>

    </div>
    </Link>
  );
};

export const QuoteBox = ({ text }) => {
  return (
    <div className="md:h-[350px] h-[200px] bg-white/80 backdrop-blur rounded-xl flex items-center justify-center text-center px-6 text-gray-700 font-medium italic">
      "{text}"
    </div>
  );
};