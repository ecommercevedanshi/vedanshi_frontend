import { Formik, Form, Field } from "formik";
import { useForgotPasswordMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const initialValues = { email: "" };

  const handleSubmit = async (values, { setSubmitting }) => {

    try {

      await forgotPassword(values).unwrap();

    //   alert("OTP sent to email");

      navigate("/verify-otp", {
        state: {
          email: values.email,
          otpType: "forgotPassword"
        }
      });

    } catch (err) {
      console.log(err);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bgMain flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] bg-white border border-borderLight rounded-xl shadow-soft p-6">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (

            <Form className="space-y-4">

              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-borderMedium rounded px-3 py-2"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primaryHover text-white py-2 rounded font-medium"
              >
                Send OTP
              </button>

            </Form>

          )}

        </Formik>

      </div>

    </div>
  );
};

export default ForgotPassword;