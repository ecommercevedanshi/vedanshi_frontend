import { Link } from "react-router-dom";

const SubCategorySlider = ({ subCategories }) => {

  if (!subCategories.length) return null;

  return (
    <div className="py-6 border-b border-borderLight mb-6">

      <div className="flex gap-4 overflow-x-auto pb-2">

        {subCategories.map((item) => (
          <Link
            key={item._id}
            to={`/products/subcategory/${item.slug}`}
            className="flex flex-col items-center min-w-[90px]"
          >

            <div className="w-[70px] h-[70px] rounded-full overflow-hidden bg-gray-100">

              <img
                src={item.thumbnail || "/placeholder-category.jpg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />

            </div>

            <span className="text-sm mt-2 text-textPrimary">
              {item.name}
            </span>

          </Link>
        ))}
      </div>

    </div>
  );
};

export default SubCategorySlider;