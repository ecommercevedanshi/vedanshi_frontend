import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";

import { useResetPasswordMutation } from "../../features/auth/authApiSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Info, ShoppingBag, ShoppingCart } from "lucide-react";

const ResetPassword = () => {

  const [resetPassword] = useResetPasswordMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {

    try {

      const payload = {
        email,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      };

      await resetPassword(payload).unwrap();

    //   alert("Password updated successfully");

      navigate("/login");

    } catch (err) {
      console.log(err);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bgMain flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] bg-white border border-borderLight rounded-xl shadow-soft p-6">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(resetPasswordSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (

            <Form className="space-y-4">

              {/* PASSWORD */}
              <div>

                {/* LABEL + INFO */}
                <div className="flex items-center gap-2 mb-1">

                  <label className="text-sm font-medium">
                    Password
                  </label>

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
                      z-50
                      "
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
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-[50%] translate-y-[-50%]"
                >
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
                Reset Password
              </button>

            </Form>

          )}
        </Formik>

      </div>

    </div>
  );
};

export default ResetPassword;