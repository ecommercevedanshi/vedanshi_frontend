import { Link } from "react-router-dom";
import Container from "./Container";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-borderLight mt-16">

      <Container>

        {/* MAIN FOOTER */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-xl font-semibold text-textPrimary mb-3">
              Jaimax
            </h2>

            <p className="text-textMuted text-sm leading-relaxed">
              Discover premium fashion collections for men, women and kids.
              Crafted with comfort, style and everyday elegance.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-4">
              <a className="p-2 border rounded hover:bg-bgCard transition">
                <Facebook size={16} />
              </a>
              <a className="p-2 border rounded hover:bg-bgCard transition">
                <Instagram size={16} />
              </a>
              <a className="p-2 border rounded hover:bg-bgCard transition">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-textPrimary mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-textSecondary">
              <li>
                <Link to="/men" className="hover:text-primary transition">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-primary transition">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-primary transition">
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-primary transition">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div>
            <h3 className="font-semibold text-textPrimary mb-3">
              Customer Support
            </h3>

            <ul className="space-y-2 text-sm text-textSecondary">
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-primary transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-primary transition">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold text-textPrimary mb-3">
              Get Offers & Updates
            </h3>

            <p className="text-sm text-textMuted mb-3">
              Subscribe to receive exclusive offers and new arrivals.
            </p>

            <div className="flex border border-borderMedium rounded overflow-hidden">

              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 text-sm outline-none"
              />

              <button className="bg-primary text-white px-4 flex items-center">
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