import { SlidersHorizontal } from "lucide-react";

export const MobileFilterTrigger = ({ filters, onOpen }) => {
  const activeCount = Object.values(filters).filter(Boolean).length;
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
    >
      <SlidersHorizontal size={15} />
      Filters
      {activeCount > 0 && (
        <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
          {activeCount}
        </span>
      )}
    </button>
  );
};
