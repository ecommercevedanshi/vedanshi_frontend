import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const AccountDropdown = ({ user }) => {

  const dispatch = useDispatch();
const navigate = useNavigate();
const [logoutMutation] = useLogoutMutation();

const handleLogout = async () => {
  try {
    await logoutMutation().unwrap();
  } catch {
    // even if API fails, still clear local state
  } finally {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  }
};
  // console.log(user)
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

            
           {/* <Link
  to="/contact"
  className="
    group/item
    relative
    flex items-center
    px-2 py-1
    text-sm
    transition-colors duration-200
    hover:text-primary
  "
>
  <span
    className="
      absolute left-0 top-1/2 -translate-y-1/2
      h-0 w-[3px]
      bg-primary
      transition-all duration-200
      group-hover/item:h-[60%]
    "
  />
  <span
    className="
      ml-3
      inline-block
      transition-transform duration-200
      group-hover/item:scale-105
    "
  >
    Contact us
  </span>
</Link> */}

          </div>
        </>
      ) : (
        <>
          {/* AUTH USER */}
          <p className="font-semibold text-textPrimary mb-3">
            Hello, {user?.name || user?.user?.name?.split(" ")[0]}
          </p>

          <div className="space-y-2 text-textSecondary">

            {/* PROTECTED ROUTES */}
            <Link
  to="/profile"
  className="
    group/item
    relative
    flex items-center
    px-2 py-1
    text-sm
    transition-colors duration-200
    hover:text-primary
  "
>
  {/* LEFT BAR */}
  <span
    className="
      absolute left-0 top-1/2 -translate-y-1/2
      h-0 w-[3px]
      bg-primary
      transition-all duration-200
      group-hover/item:h-[60%]
    "
  />

  {/* TEXT */}
  <span
    className="
      ml-3
      inline-block
      transition-transform duration-200
      group-hover/item:scale-105
    "
  >
    Profile
  </span>
</Link>

            <Link
  to="/my-orders"
  className="
    group/item
    relative
    flex items-center
    px-2 py-1
    text-sm
    transition-colors duration-200
    hover:text-primary
  "
>
  {/* LEFT BAR */}
  <span
    className="
      absolute left-0 top-1/2 -translate-y-1/2
      h-0 w-[3px]
      bg-primary
      transition-all duration-200
      group-hover/item:h-[60%]
    "
  />

  {/* TEXT */}
  <span
    className="
      ml-3
      inline-block
      transition-transform duration-200
      group-hover/item:scale-105
    "
  >
    My Orders
  </span>
</Link>

            <Link
  to="/wishlist"
  className="
    group/item
    relative
    flex items-center
    px-2 py-1
    text-sm
    transition-colors duration-200
    hover:text-primary
  "
>
  {/* LEFT BAR */}
  <span
    className="
      absolute left-0 top-1/2 -translate-y-1/2
      h-0 w-[3px]
      bg-primary
      transition-all duration-200
      group-hover/item:h-[60%]
    "
  />

  {/* TEXT */}
  <span
    className="
      ml-3
      inline-block
      transition-transform duration-200
      group-hover/item:scale-105
    "
  >
    Wishlist
  </span>
</Link>

           {/* <Link
  to="/contact"
  className="
    group/item
    relative
    flex items-center
    px-2 py-1
    text-sm
    transition-colors duration-200
    hover:text-primary
  "
>
  <span
    className="
      absolute left-0 top-1/2 -translate-y-1/2
      h-0 w-[3px]
      bg-primary
      transition-all duration-200
      group-hover/item:h-[60%]
    "
  />

  <span
    className="
      ml-3
      inline-block
      transition-transform duration-200
      group-hover/item:scale-105
    "
  >
    Contact us
  </span>
</Link> */}

           <button
  onClick={handleLogout}
  className="
    group/item
    relative
    flex items-center
    px-2 py-1
    text-sm
    text-red-500
    transition-colors duration-200
    hover:text-red-600
    w-full
  "
>
  <span
    className="
      absolute left-0 top-1/2 -translate-y-1/2
      h-0 w-[3px]
      bg-red-500
      transition-all duration-200
      group-hover/item:h-[60%]
    "
  />

  <span className="ml-3 inline-block transition-transform duration-200 group-hover/item:scale-105">
    Logout
  </span>
</button>

          </div>
        </>
      )}
    </div>
  );
};

export default AccountDropdown;