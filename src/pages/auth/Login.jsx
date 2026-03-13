import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginUserMutation } from "../../features/auth/authApiSlice";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, LockOpen, ShoppingBag, ShoppingCart } from "lucide-react";
import { loginSchema } from "../../validations/loginSchema";

const Login = () => {

  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {

    try {

      await loginUser(values).unwrap();

    //   alert("Login successful");

      navigate("/");

    } catch (err) {
      console.log(err);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bgMain flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] bg-white border border-borderLight rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <Formik
  initialValues={initialValues}
  validationSchema={toFormikValidationSchema(loginSchema)}
  onSubmit={handleSubmit}
>
          {({ isSubmitting }) => (

            <Form className="space-y-4">

              {/* EMAIL */}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-borderMedium rounded px-3 py-2"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs"/>
              </div>

              {/* PASSWORD */}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                   {showPassword ? (
                      <ShoppingBag size={18} className="text-primary" />
                    ) : (
                      <ShoppingCart size={18} />
                    )}
                </button>

              </div>

              {/* FORGOT PASSWORD */}
              <div className="text-right text-sm">
                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primaryHover text-white py-2 rounded font-medium"
              >
                Login
              </button>

              {/* REGISTER */}
              <div className="text-center text-sm text-textMuted">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-medium">
                  Register
                </Link>
              </div>

            </Form>

          )}
        </Formik>

      </div>

    </div>
  );
};

export default Login;