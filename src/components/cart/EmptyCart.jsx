import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const EmptyCart = ({ onClose }) => {

  return (
    <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center select-none">

      {/* Icon */}
      <div className="relative mb-6" style={{ width: 84, height: 84 }}>
        {/* soft halo */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(133,108,138,0.12) 0%, transparent 72%)",
          }}
        />
        {/* circle */}
        <span
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{
            background: "var(--card-soft)",
            border: "1.5px solid var(--border-medium)",
          }}
        >
          <ShoppingBag
            size={30}
            style={{ color: "var(--color-primary)" }}
            strokeWidth={1.5}
          />
        </span>

        {/* dot — top right */}
        <span
          className="absolute rounded-full"
          style={{
            width: 8, height: 8,
            top: 6, right: 0,
            background: "var(--color-secondary)",
            opacity: 0.55,
          }}
        />
        {/* dot — bottom left */}
        <span
          className="absolute rounded-full"
          style={{
            width: 5, height: 5,
            bottom: 8, left: 0,
            background: "var(--color-primary)",
            opacity: 0.35,
          }}
        />
      </div>

      {/* Text */}
      <h3
        className="text-base font-semibold mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        Your cart is empty
      </h3>
      <p
        className="text-sm leading-relaxed max-w-[190px]"
        style={{ color: "var(--text-muted)" }}
      >
        Add something you love and it'll show up here.
      </p>

      {/* Divider */}
      <span
        className="block w-8 h-px my-6"
        style={{ background: "var(--border-medium)" }}
      />

      {/* CTA */}
      <Link
        to="/products"
        onClick={onClose}
        className="text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-200"
        style={{
          background: "var(--color-primary)",
          color: "#ffffff",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--color-primary-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "var(--color-primary)")
        }
      >
        Browse Products
      </Link>
    </div>
  );
};

export default EmptyCart;