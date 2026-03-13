import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductPage from "./pages/products/ProductPage";
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
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/:slug" element={<CategoryPage />} />
          <Route
            path="/products/subcategory/:slug"
            element={<CategoryPage />}
          />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/products" element={<ProductListPage />} />
        </Routes>
      </MainLayout>
      {/* <p className="text-red-500">Welcome to dashboard</p> */}
    </>
  );
}

export default App;
