// import { Link } from "react-router-dom";
// import Container from "./Container";
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Mail
// } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-white border-t border-borderLight mt-16">

//       <Container>

//         {/* MAIN FOOTER */}
//         <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

//           {/* BRAND */}
//           <div>
//             <h2 className="text-xl font-semibold text-textPrimary mb-3">
//               Jaimax
//             </h2>

//             <p className="text-textMuted text-sm leading-relaxed">
//               Discover premium fashion collections for men, women and kids.
//               Crafted with comfort, style and everyday elegance.
//             </p>

//             {/* SOCIAL */}
//             <div className="flex gap-3 mt-4">
//               <a className="p-2 border rounded hover:bg-bgCard transition">
//                 <Facebook size={16} />
//               </a>
//               <a className="p-2 border rounded hover:bg-bgCard transition">
//                 <Instagram size={16} />
//               </a>
//               <a className="p-2 border rounded hover:bg-bgCard transition">
//                 <Twitter size={16} />
//               </a>
//             </div>
//           </div>

//           {/* QUICK LINKS */}
//           <div>
//             <h3 className="font-semibold text-textPrimary mb-3">
//               Quick Links
//             </h3>

//             <ul className="space-y-2 text-sm text-textSecondary">
//               <li>
//                 <Link to="/men" className="hover:text-primary transition">
//                   Men
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/women" className="hover:text-primary transition">
//                   Women
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/kids" className="hover:text-primary transition">
//                   Kids
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/wishlist" className="hover:text-primary transition">
//                   Wishlist
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* CUSTOMER SUPPORT */}
//           <div>
//             <h3 className="font-semibold text-textPrimary mb-3">
//               Customer Support
//             </h3>

//             <ul className="space-y-2 text-sm text-textSecondary">
//               <li>
//                 <Link to="/contact" className="hover:text-primary transition">
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/shipping-policy" className="hover:text-primary transition">
//                   Shipping Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/return-policy" className="hover:text-primary transition">
//                   Return Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/terms" className="hover:text-primary transition">
//                   Terms & Conditions
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* NEWSLETTER */}
//           <div>
//             <h3 className="font-semibold text-textPrimary mb-3">
//               Get Offers & Updates
//             </h3>

//             <p className="text-sm text-textMuted mb-3">
//               Subscribe to receive exclusive offers and new arrivals.
//             </p>

//             <div className="flex border border-borderMedium rounded overflow-hidden">

//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 className="flex-1 px-3 py-2 text-sm outline-none"
//               />

//               <button className="bg-primary text-white px-4 flex items-center">
//                 <Mail size={16} />
//               </button>

//             </div>
//           </div>

//         </div>

//       </Container>

//       {/* BOTTOM BAR */}
//       <div className="border-t border-borderLight py-4 text-center text-sm text-textMuted">
//         © {new Date().getFullYear()} Jaimax. All rights reserved.
//       </div>

//     </footer>
//   );
// };

// export default Footer;

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "./Container";
import { Facebook, Instagram, Twitter, Mail, Youtube } from "lucide-react";

const NavLink = ({ to, children, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="relative inline-block text-textSecondary hover:text-primary transition-colors duration-200 group"
    >
      {children}
      <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  </li>
);

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleContact = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login", { state: { from: "/contact" } });
    }
  };

  return (
    <footer className="bg-bgMain border-t border-borderLight mt-16" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <Container>

        {/* MAIN FOOTER */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-xl font-semibold text-textPrimary mb-3">Jaimax</h2>
            <p className="text-textMuted text-sm leading-relaxed">
              Discover premium fashion collections for men, women and kids.
              Crafted with comfort, style and everyday elegance.
            </p>
            <div className="flex gap-3 mt-4">

  {/* Facebook */}
  <a
    href="https://www.facebook.com/Vedastras/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 border border-borderLight rounded-full transition-all duration-200 text-textMuted hover:text-bgMain hover:border-[#1877F2] hover:bg-[#1877F2]"
  >
    <Facebook size={18} />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/vedastras/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 border border-borderLight rounded-full transition-all duration-200 text-textMuted hover:text-bgMain hover:border-[#E4405F] hover:bg-[#E4405F]"
  >
    <Instagram size={18} />
  </a>

  {/* Twitter / X */}
  <a
    href="https://x.com/vedastras"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 border border-borderLight rounded-full transition-all duration-200 text-textMuted hover:text-bgMain hover:border-black hover:bg-black"
  >
    <Twitter size={18} />
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@VEDASTRASS"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 border border-borderLight rounded-full transition-all duration-200 text-textMuted hover:text-bgMain hover:border-[#FF0000] hover:bg-[#FF0000]"
  >
    <Youtube size={18} />
  </a>

</div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-textPrimary mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <NavLink to="/men">Men</NavLink>
              <NavLink to="/women">Women</NavLink>
              <NavLink to="/kids">Kids</NavLink>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </ul>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div>
            <h3 className="font-semibold text-textPrimary mb-4">Customer Support</h3>
            <ul className="space-y-3 text-sm">
              <NavLink to="/contact" onClick={handleContact}>Contact Us</NavLink>
              <NavLink to="/shipping-policy">Shipping Policy</NavLink>
              <NavLink to="/return-policy">Return Policy</NavLink>
              <NavLink to="/terms">Terms & Conditions</NavLink>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold text-textPrimary mb-4">Get Offers & Updates</h3>
            <p className="text-sm text-textMuted mb-3">
              Subscribe to receive exclusive offers and new arrivals.
            </p>
            <div className="flex border border-borderMedium rounded overflow-hidden focus-within:border-primary transition-colors duration-200">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 text-sm outline-none bg-bgMain text-textPrimary"
              />
              <button className="bg-primary text-white px-4 flex items-center hover:opacity-90 transition">
                <Mail size={16} />
              </button>
            </div>
          </div>

        </div>
      </Container>

      {/* BOTTOM BAR */}
      <div className="border-t border-borderLight py-4 text-center text-sm text-textMuted">
        © {new Date().getFullYear()} Jaimax. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;