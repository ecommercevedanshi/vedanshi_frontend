import { Link } from "react-router-dom";

const AccountDropdown = ({ user }) => {
  return (
    <div
      className="
      absolute right-0 top-6 
      w-[260px]
      bg-white
      border border-borderLight
      shadow-soft
      rounded-md
      p-4
      text-sm
      z-50
      animate-fadeIn
      "
    >
      {/* NON AUTH USER */}
      {!user ? (
        <>
          <p className="font-semibold text-textPrimary">
            Welcome
          </p>

          <p className="text-textMuted text-xs mb-3">
            To access account and manage orders
          </p>

          <div className="flex gap-2 mb-4">
            <Link
              to="/login"
              className="
              border border-primary
              text-primary
              px-3 py-1 rounded
              text-xs font-medium
              hover:bg-primary hover:text-white
              transition
              "
            >
              LOGIN
            </Link>

            <Link
              to="/register"
              className="
              bg-primary
              text-white
              px-3 py-1 rounded
              text-xs font-medium
              hover:bg-primaryHover
              transition
              "
            >
              SIGN UP
            </Link>
          </div>

          <div className="border-t pt-3 space-y-2 text-textSecondary">

            {/* PUBLIC ROUTES */}
            {/* <Link
              to="/wishlist"
              className="block hover:text-primary transition"
            >
              Wishlist
            </Link> */}

            <Link
              to="/contact"
              className="block hover:text-primary transition"
            >
              Contact Us
            </Link>

          </div>
        </>
      ) : (
        <>
          {/* AUTH USER */}
          <p className="font-semibold text-textPrimary mb-3">
            Hello, {user?.user?.name}
          </p>

          <div className="space-y-2 text-textSecondary">

            {/* PROTECTED ROUTES */}
            <Link
              to="/profile"
              className="block hover:text-primary transition"
            >
              Profile
            </Link>

            <Link
              to="/orders"
              className="block hover:text-primary transition"
            >
              My Orders
            </Link>

            <Link
              to="/wishlist"
              className="block hover:text-primary transition"
            >
              Wishlist
            </Link>

            <Link
              to="/contact"
              className="block hover:text-primary transition"
            >
              Contact Us
            </Link>

            <button
              className="
              text-red-500
              text-left
              w-full
              hover:text-red-600
              transition
              "
            >
              Logout
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default AccountDropdown;