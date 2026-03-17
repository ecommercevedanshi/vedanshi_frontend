import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
// import ProductPage from "./pages/products/ProductPage";
import MainLayout from "./components/layout/MainLayout";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { useDispatch } from "react-redux";
import { getAuthFromCookie } from "./utils/authCookies";
import { setCredentials } from "./features/auth/authSlice";
import { useEffect } from "react";
import CategoryPage from "./pages/category/CategoryPage";
import ProductListPage from "./pages/products/ProductListPage";
import ProductCard from "./components/product/ProductCard";
import ScrollToTop from "./components/ui/ScrollToTop";
import SubCategoryPage from "./pages/category/SubCategoryPage";
import ContactPage from "./pages/contact/ContactPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import CartDrawer from "./components/cart/CartDrawer";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrderSuccessPage from "./pages/checkout/OrderSuccessPage";
import MyOrdersPage from "./pages/orders/MyOrdersPage";
import WishlistPage from "./pages/wishlist/WishlistPage";
import SearchPage from "./pages/search/SearchPage";
import ReturnPolicyPage from "./pages/policies/ReturnPolicyPage";
import ShippingPolicyPage from "./pages/policies/ShippingPolicyPage";
import TermsPage from "./pages/policies/TermsPage";
import PaymentFailed from "./pages/checkout/PaymentFailed";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuthFromCookie();

    if (auth) {
      dispatch(setCredentials({ user: auth.user }));
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <MainLayout>
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/:slug" element={<CategoryPage />} />
          <Route path="/:category/:subcategory" element={<SubCategoryPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route
            path="/:category/:subCategory/:productSlug"
            element={<ProductDetailsPage />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/failed"
            element={
              <ProtectedRoute>
                <PaymentFailed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrdersPage />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
      {/* <p className="text-red-500">Welcome to dashboard</p> */}
    </>
  );
}

export default App;
