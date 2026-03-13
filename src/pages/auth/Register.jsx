import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerSchema } from "../../validations/registerSchema";
import { useRegisterUserMutation } from "../../features/auth/authApiSlice";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate, Link } from "react-router-dom";
import { Info, ShoppingCart, ShoppingBag } from "lucide-react";

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    countryCode: 91,
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await registerUser(values).unwrap();

      // redirect to OTP page
      navigate("/verify-otp", {
        state: {
          email: values.email,
          phone: values.phone,
        },
      });
    } catch (err) {
      console.log(err);
    }

    setSubmitting(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div
        className="
        w-full
        max-w-[420px]
        bg-white
        border border-borderLight
        rounded-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        p-6
        "
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(registerSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              {/* NAME */}
              <div>
                <Field
                  name="name"
                  placeholder="Full Name"
                  className="w-full border border-borderMedium rounded px-3 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* EMAIL */}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-borderMedium rounded px-3 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* PHONE INPUT WITH FLAG */}
              <div>
                <PhoneInput
                  country={"in"}
                  enableSearch
                  value=""
                  onChange={(value, data) => {
                    setFieldValue("phone", value.slice(data.dialCode.length));
                    setFieldValue("countryCode", Number(data.dialCode));
                  }}
                  inputClass="!w-full !border !border-borderMedium !rounded !py-2"
                  containerClass="!w-full"
                />

                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* PASSWORD */}

            <div>
                {/* LABEL + INFO */}
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-sm font-medium">Password</label>

                  <div className="relative group cursor-pointer">
                    <Info size={12} className="text-gray-400" />

                    {/* TOOLTIP */}
                    <div
                      className="
                             absolute left-0 top-6 w-64
                              bg-bgMain text-textPrimary text-xs
                             p-3 rounded shadow-lg
                                opacity-0 group-hover:opacity-100
                              pointer-events-none
                             transition
                                 z-50"
                    >
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

                  {/* INPUT */}
                  <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border border-borderMedium rounded px-3 py-2 pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[50%] translate-y-[-50%]"
                  >
                    {showPassword ? (
                      <ShoppingBag size={18} className="text-primary" />
                    ) : (
                      <ShoppingCart size={18} />
                    )}
                    </button>
                  </div>

                  <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />
            </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full border border-borderMedium rounded px-3 py-2 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[50%] translate-y-[-50%]"
                >
                  {/* {showConfirmPassword ? (
                    <LockOpen size={18} />
                  ) : (
                    <Lock size={18} />
                  )} */}
                  {showConfirmPassword ? (
                    <ShoppingBag size={18} className="text-primary" />
                  ) : (
                    <ShoppingCart size={18} />
                  )}
                </button>

                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                w-full
                bg-primary
                hover:bg-primaryHover
                text-white
                py-2
                rounded
                font-medium
                transition
                "
              >
                Continue
              </button>

              <div className="text-center text-sm text-textMuted">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
