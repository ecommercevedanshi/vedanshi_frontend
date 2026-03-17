// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { toFormikValidationSchema } from "zod-formik-adapter";
// import { registerSchema } from "../../validations/registerSchema";
// import { useRegisterUserMutation } from "../../features/auth/authApiSlice";
// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { useNavigate, Link } from "react-router-dom";
// import { Info, ShoppingCart, ShoppingBag } from "lucide-react";

// const Register = () => {
//   const [registerUser] = useRegisterUserMutation();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [serverError, setServerError] = useState("");

//   const initialValues = {
//     name: "",
//     email: "",
//     phone: "",
//     countryCode: 91,
//     password: "",
//     confirmPassword: "",
//   };

//  const handleSubmit = async (values, { setSubmitting }) => {
//   setServerError(""); // clear old error

//   try {
//     const response = await registerUser(values).unwrap();

//     navigate("/verify-otp", {
//       state: {
//         email: values.email,
//         phone: values.phone,
//       },
//     });

//   } catch (err) {
//     setServerError(err?.data?.message || "Something went wrong");
//   }

//   setSubmitting(false);
// };

//   return (
//     <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
//       <div
//         className="
//         w-full
//         max-w-[420px]
//         bg-white
//         border border-borderLight
//         rounded-xl
//         shadow-[0_10px_40px_rgba(0,0,0,0.08)]
//         p-6
//         "
//       >
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Create Account
//         </h2>

//         {serverError && (
//   <div
//     className="
//       mb-4
//       px-4 py-2
//       bg-red-50
//       border border-red-200
//       text-red-600
//       text-sm
//       rounded
//       text-center
//     "
//   >
//     {serverError}
//   </div>
// )}

//         <Formik
//           initialValues={initialValues}
//           validationSchema={toFormikValidationSchema(registerSchema)}
//           onSubmit={handleSubmit}
//           validateOnMount={false}
//   validateOnBlur={true}
//   validateOnChange={false}
//         >
//           {({ isSubmitting, setFieldValue, values }) => (
//             <Form className="space-y-4">
//               {/* NAME */}
//               <div>
//                 <Field
//                   name="name"
//                   placeholder="Full Name"
//                   className="w-full border border-borderMedium rounded px-3 py-2"
//                 />
//                 <ErrorMessage
//                   name="name"
//                   component="div"
//                   className="text-red-500 text-xs"
//                 />
//               </div>

//               {/* EMAIL */}
//               <div>
//                 <Field
//                   name="email"
//                   type="email"
//                   placeholder="Email Address"
//                   className="w-full border border-borderMedium rounded px-3 py-2"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-xs"
//                 />
//               </div>

//               {/* PHONE INPUT WITH FLAG */}
//               <div>
//                 <PhoneInput
//                   country={"in"}
//                   enableSearch
//                   value=""
//                   onChange={(value, data) => {
//                     setFieldValue("phone", value.slice(data.dialCode.length));
//                     setFieldValue("countryCode", Number(data.dialCode));
//                   }}
//                   inputClass="!w-full !border !border-borderMedium !rounded !py-2"
//                   containerClass="!w-full"
//                 />

//                 <ErrorMessage
//                   name="phone"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>

//               {/* PASSWORD */}

//             <div>
//                 {/* LABEL + INFO */}
//                 <div className="flex items-center gap-2 mb-1">
//                   <label className="text-sm font-medium">Password</label>

//                   <div className="relative group cursor-pointer">
//                     <Info size={12} className="text-gray-400" />

//                     {/* TOOLTIP */}
//                     <div
//                       className="
//                              absolute left-0 top-6 w-64
//                               bg-bgMain text-textPrimary text-xs
//                              p-3 rounded shadow-lg
//                                 opacity-0 group-hover:opacity-100
//                               pointer-events-none
//                              transition
//                                  z-50"
//                     >
//                       Password must contain:
//                       <ul className="list-disc pl-4 mt-1 space-y-1">
//                         <li>Minimum 8 characters</li>
//                         <li>One uppercase letter</li>
//                         <li>One lowercase letter</li>
//                         <li>One number</li>
//                         <li>One special character</li>
//                       </ul>
//                     </div>
//                   </div>
//                   </div>

//                   {/* INPUT */}
//                   <div className="relative">
//                   <Field
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     className="w-full border border-borderMedium rounded px-3 py-2 pr-10"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-[50%] translate-y-[-50%]"
//                   >
//                     {showPassword ? (
//                       <ShoppingBag size={18} className="text-primary" />
//                     ) : (
//                       <ShoppingCart size={18} />
//                     )}
//                     </button>
//                   </div>

//                   <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-xs"
//                 />
//             </div>

//               {/* CONFIRM PASSWORD */}
//               <div className="relative">
//                 <Field
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Confirm Password"
//                   className="w-full border border-borderMedium rounded px-3 py-2 pr-10"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-[50%] translate-y-[-50%]"
//                 >
//                   {/* {showConfirmPassword ? (
//                     <LockOpen size={18} />
//                   ) : (
//                     <Lock size={18} />
//                   )} */}
//                   {showConfirmPassword ? (
//                     <ShoppingBag size={18} className="text-primary" />
//                   ) : (
//                     <ShoppingCart size={18} />
//                   )}
//                 </button>

//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="div"
//                   className="text-red-500 text-xs"
//                 />
//               </div>

//               {/* BUTTON */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="
//                 w-full
//                 bg-primary
//                 hover:bg-primaryHover
//                 text-white
//                 py-2
//                 rounded
//                 font-medium
//                 transition
//                 "
//               >
//                 Continue
//               </button>

//               <div className="text-center text-sm text-textMuted">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-primary font-medium hover:underline"
//                 >
//                   Login
//                 </Link>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerSchema } from "../../validations/registerSchema";
import { useRegisterUserMutation } from "../../features/auth/authApiSlice";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Info, Eye, EyeOff, Loader2, ShoppingBag, ShoppingCart } from "lucide-react";
import registerBg from "../../assets/authentication/registerImage.jpeg"; // swap if different image

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    countryCode: 91,
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      await registerUser(values).unwrap();
      navigate("/verify-otp", {
        state: { email: values.email, phone: values.phone, from: location.state?.from },
      });
    } catch (err) {
      setServerError(err?.data?.message || "Something went wrong");
    }
    setSubmitting(false);
  };

  // shared input classes — adjusts colors per context
  const inputClass = (mobile) => `
    w-full px-5 py-3
    rounded-full
    border ${mobile ? "border-bgMain" : "border-textSecondary"}
    bg-transparent
    ${mobile ? "text-bgMain placeholder:text-bgMain" : "text-textPrimary placeholder:text-textMuted"}
    outline-none focus:border-primary
    transition
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const FormCard = ({ isSubmitting, mobile = false, setFieldValue }) => (
    <Form className="space-y-4 min-w-0">

      {/* SERVER ERROR */}
      {serverError && (
        <div className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
          {serverError}
        </div>
      )}

      {/* NAME */}
      <div>
        <Field
          name="name"
          placeholder="Full Name"
          disabled={isSubmitting}
          className={inputClass(mobile)}
        />
        <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1 pl-2" />
      </div>

      {/* EMAIL */}
      <div>
        <Field
          name="email"
          type="email"
          placeholder="Email Address"
          disabled={isSubmitting}
          className={inputClass(mobile)}
        />
        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 pl-2" />
      </div>

      {/* PHONE */}
      <div>
        <PhoneInput
          country={"in"}
          enableSearch
          value=""
          onChange={(value, data) => {
            setFieldValue("phone", value.slice(data.dialCode.length));
            setFieldValue("countryCode", Number(data.dialCode));
          }}
          inputStyle={{
  width: "100%",
  minWidth: "0",
  borderRadius: "9999px",
  border: `1px solid ${mobile ? "#ffffff" : "#404652"}`,
  backgroundColor: "transparent",
  color: mobile ? "#ffffff" : "#111111",
  padding: "12px 12px 12px 50px",
}}
          buttonStyle={{
            borderRadius: "9999px 0 0 9999px",
            border: `1px solid ${mobile ? "#ffffff" : "#404652"}`,
            backgroundColor: "transparent",
          }}
          dropdownStyle={{ borderRadius: "12px" }}
          // containerStyle={{ width: "100%" }}
          containerStyle={{
  width: "100%",
  minWidth: "0",
}}
        />
        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1 pl-2" />
      </div>

      {/* PASSWORD */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className={`text-sm font-medium ${mobile ? "text-bgMain" : "text-textPrimary"}`}>
            Password
          </label>
          <div className="relative group cursor-pointer">
            <Info size={12} className={mobile ? "text-bgMain/70" : "text-gray-400"} />
            <div className="absolute left-0 top-6 w-64 bg-white text-textPrimary text-xs p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition z-50">
              Password must contain:
              <ul className="list-disc pl-4 mt-1 space-y-1">
                <li>Minimum 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative">
          <Field
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            disabled={isSubmitting}
            className={inputClass(mobile) + " pr-12"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${mobile ? "text-bgMain/70 hover:text-bgMain" : "text-textMuted hover:text-primary"}`}
          >
            {/* {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
            {showPassword ? (
                                  <ShoppingBag size={18} className="text-bgMain" />
                                ) : (
                                  <ShoppingCart size={18} />
                                )}
          </button>
        </div>
        <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 pl-2" />
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <div className="relative">
          <Field
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            disabled={isSubmitting}
            className={inputClass(mobile) + " pr-12"}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${mobile ? "text-bgMain/70 hover:text-bgMain" : "text-textMuted hover:text-primary"}`}
          >
            {/* {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
            {showConfirmPassword ? (
                      <ShoppingBag size={18} className="text-bgMain" />
                    ) : (
                      <ShoppingCart size={18} />
                    )}
          </button>
        </div>
        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 pl-2" />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-3 rounded-full
          bg-primary hover:bg-primaryHover
          text-white font-semibold text-lg
          transition flex items-center justify-center gap-2
          disabled:opacity-70 disabled:cursor-not-allowed
        "
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Creating Account...
          </>
        ) : (
          "Continue"
        )}
      </button>

      {/* LOGIN LINK */}
      <div className={`text-center text-sm pt-1 ${mobile ? "text-gray-300" : "text-textMuted"}`}>
        Already have an account?{" "}
        <Link
          to="/login"
          className={`font-medium hover:underline ${mobile ? "text-gray-200" : "text-primary"}`}
        >
          Login
        </Link>
      </div>

    </Form>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(registerSchema)}
      onSubmit={handleSubmit}
      validateOnMount={false}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({ isSubmitting, setFieldValue }) => (
        <>

          {/* ── DESKTOP lg+ ── */}
          <div
            className="hidden lg:flex min-h-[calc(100vh-70px)]"
            style={{
              backgroundImage: `url(${registerBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* LEFT — form panel */}
            <div className="w-1/2 flex items-center justify-center px-16 py-10">
              <div className="w-full max-w-[420px]">
                <h2
                  className="text-4xl font-semibold text-textPrimary mb-6 text-center"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Create Account
                </h2>
                <FormCard isSubmitting={isSubmitting} mobile={false} setFieldValue={setFieldValue} />
              </div>
            </div>

            {/* RIGHT — empty, bg image shows */}
            <div className="w-1/2" />
          </div>

          {/* ── MOBILE / TABLET < lg ── */}
          <div className="lg:hidden min-h-[calc(100vh-70px)] flex items-center justify-center relative py-10 overflow-x-hidden">

            {/* BLURRED BG */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${registerBg})`,
                filter: "blur(3px)",
                transform: "scale(1.0)",
              }}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50" />

            {/* CARD */}
            <div className="
relative z-10
w-full
mx-2
max-w-[380px]
bg-transparent
backdrop-blur-sm
rounded-xl
shadow-[0_10px_40px_rgba(0,0,0,0.15)]
p-4 sm:p-8
">
              <h2
                className="text-2xl font-semibold text-center mb-6 text-bgCard"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Create Account
              </h2>
              <FormCard isSubmitting={isSubmitting} mobile={true} setFieldValue={setFieldValue} />
            </div>

          </div>

        </>
      )}
    </Formik>
  );
};

export default Register;