// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useLoginUserMutation } from "../../features/auth/authApiSlice";
// import { toFormikValidationSchema } from "zod-formik-adapter";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Lock, LockOpen, ShoppingBag, ShoppingCart } from "lucide-react";
// import { loginSchema } from "../../validations/loginSchema";

// const Login = () => {

//   const [loginUser] = useLoginUserMutation();
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {

//     try {

//       await loginUser(values).unwrap();

//     //   alert("Login successful");

//       navigate("/");

//     } catch (err) {
//       console.log(err);
//     }

//     setSubmitting(false);
//   };

//   return (
//     <div className="min-h-[calc(100vh-80px)] bg-bgMain flex items-center justify-center px-4">

//       <div className="w-full max-w-[420px] bg-white border border-borderLight rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6">

//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Login
//         </h2>

//         <Formik
//   initialValues={initialValues}
//   validationSchema={toFormikValidationSchema(loginSchema)}
//   onSubmit={handleSubmit}
// >
//           {({ isSubmitting }) => (

//             <Form className="space-y-4">

//               {/* EMAIL */}
//               <div>
//                 <Field
//                   name="email"
//                   type="email"
//                   placeholder="Email Address"
//                   className="w-full border border-borderMedium rounded px-3 py-2"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-red-500 text-xs"/>
//               </div>

//               {/* PASSWORD */}
//               <div className="relative">

//                 <Field
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className="w-full border border-borderMedium rounded px-3 py-2 pr-10"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                    {showPassword ? (
//                       <ShoppingBag size={18} className="text-primary" />
//                     ) : (
//                       <ShoppingCart size={18} />
//                     )}
//                 </button>

//               </div>

//               {/* FORGOT PASSWORD */}
//               <div className="text-right text-sm">
//                 <Link
//                   to="/forgot-password"
//                   className="text-primary hover:underline"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

//               {/* LOGIN BUTTON */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-primary hover:bg-primaryHover text-white py-2 rounded font-medium"
//               >
//                 Login
//               </button>

//               {/* REGISTER */}
//               <div className="text-center text-sm text-textMuted">
//                 Don't have an account?{" "}
//                 <Link to="/register" className="text-primary font-medium">
//                   Register
//                 </Link>
//               </div>

//             </Form>

//           )}
//         </Formik>

//       </div>

//     </div>
//   );
// };

// export default Login;

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginUserMutation } from "../../features/auth/authApiSlice";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Loader2, ShoppingBag, ShoppingCart } from "lucide-react";
import { loginSchema } from "../../validations/loginSchema";
import loginBg from "../../assets/authentication/loginImage.jpeg";
import { useDispatch } from "react-redux";
import { useMergeCartMutation } from "../../features/cart/cartApiSlice";
import { mergeCartAfterLogin } from "../../utils/mergeCartAfterLogin";
import { openCart } from "../../features/cart/cartSlice";

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState("");

  const initialValues = { email: "", password: "" };

  const location = useLocation();
  const from = location.state?.from;

  const dispatch = useDispatch();
  const [mergeCart] = useMergeCartMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      await loginUser(values).unwrap();

      await mergeCartAfterLogin({
        dispatch,
        mergeCartApi: mergeCart,
      });

      // navigate("/");
      navigate("/", { replace: true });

    if (from === "checkout") {
      dispatch(openCart());
    }
    } catch (err) {
      console.log(err);

      const message =
        err?.data?.message || err?.error || "Login failed. Please try again.";

      setServerError(message);
    }
    setSubmitting(false);
  };

  const FormCard = ({ isSubmitting }) => (
    <Form className="space-y-5">
      {serverError && (
        <div className="bg-red-500/10 border border-red-400 text-red-500 text-sm px-4 py-2 rounded-lg text-center">
          {serverError}
        </div>
      )}

      {/* EMAIL */}
      <div>
        <Field
          name="email"
          type="email"
          placeholder="Email Address"
          disabled={isSubmitting}
          className="
            w-full px-5 py-3
            rounded-full
            border border-bgMain lg:border-textSecondary
            bg-transparent
            text-bgMain lg:text-textPrimary placeholder:text-bgMain lg:placeholder:text-textMuted
            outline-none
            focus:border-gray-300
            transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-xs mt-1 pl-2"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <div className="relative">
          <Field
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            disabled={isSubmitting}
            className="
              w-full px-5 py-3 pr-12
              rounded-full
             border border-bgMain lg:border-textSecondary
            bg-transparent
            text-bgMain lg:text-textPrimary placeholder:text-bgMain lg:placeholder:text-textMuted
            outline-none
            focus:border-gray-300
            transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-textPrimary hover:text-primary transition"
          >
            {showPassword ? (
              <ShoppingBag size={18} className="text-textPrimary" />
            ) : (
              <ShoppingCart size={18} />
            )}
          </button>
        </div>
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500 text-xs mt-1 pl-2"
        />
      </div>

      {/* FORGOT PASSWORD */}
      <div className="text-right text-sm">
        <Link
          to="/forgot-password"
          className="lg:text-primary text-bgMain hover:text-primary transition"
        >
          Forgot Password?
        </Link>
      </div>

      {/* LOGIN BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-3 rounded-full
          bg-primary hover:bg-primaryHover
          text-white font-semibold text-lg
          transition
          flex items-center justify-center gap-2
          disabled:opacity-70 disabled:cursor-not-allowed
        "
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>

      {/* REGISTER */}
      <div className="text-center text-sm lg:text-primary text-gray-300 pt-1">
        Don't have an account?{" "}
        <Link
          to="/register"
          state={{ from: location.state?.from }}
          className="lg:text-primary text-gray-300 font-medium hover:underline"
        >
          Register
        </Link>
      </div>
    </Form>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <>
          {/* ── DESKTOP lg+ : bg image left, form right ── */}
          <div
            className="hidden lg:flex min-h-[calc(100vh-70px)]"
            style={{
              backgroundImage: `url(${loginBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* LEFT — image area (empty, bg does the work) */}

            {/* RIGHT — form panel */}
            <div className="w-1/2 flex items-center justify-center px-16">
              <div className="w-full max-w-[420px]">
                <h2
                  className="text-4xl font-semibold text-textPrimary mb-8 text-center"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Welcome Back
                </h2>

                <FormCard isSubmitting={isSubmitting} />
              </div>
            </div>
            <div className="w-1/2" />
          </div>

          {/* ── MOBILE / TABLET < lg ── */}
          <div className="lg:hidden min-h-[calc(100vh-70px)] flex items-center justify-center px-4 relative">
            {/* BLURRED BG */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${loginBg})`,
                filter: "blur(3px)",
                transform: "scale(1.0)", // prevents blur edge bleed
              }}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50 " />

            {/* CARD */}
            <div className="relative z-10 w-full max-w-[420px] bg-transparent backdrop-blur-sm rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-8">
              <h2 className="text-2xl font-semibold text-center mb-6 text-bgCard">
                Login
              </h2>

              <FormCard isSubmitting={isSubmitting} />
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default Login;
