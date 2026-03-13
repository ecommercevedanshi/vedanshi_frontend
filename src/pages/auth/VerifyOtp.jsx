import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { otpSchema } from "../../validations/otpSchema";

import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../../features/auth/authApiSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VerifyOtp = () => {
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otpType = location.state?.otpType || "register";

  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const initialValues = {
    otp: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        email,
        otpType,
        otp: values.otp,
      };

      await verifyOtp(payload).unwrap();

      //   alert("Account verified successfully");

      //   navigate("/");
      if (otpType === "forgotPassword") {
        navigate("/reset-password", {
          state: { email },
        });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }

    setSubmitting(false);
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();

      alert("OTP resent successfully");

      setTimer(120);
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bgMain flex items-center justify-center px-4">
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
        <h2 className="text-2xl font-semibold text-center mb-2">Verify OTP</h2>

        <p className="text-sm text-textMuted text-center mb-6">
          Enter the OTP sent to
          <br />
          <span className="font-medium text-textPrimary">{email}</span>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(otpSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* OTP INPUT */}
              <div>
                <Field
                  name="otp"
                  placeholder="Enter OTP"
                  className="
                  w-full
                  text-center
                  text-lg
                  tracking-[0.3em]
                  border border-borderMedium
                  rounded
                  px-3 py-2
                  "
                />

                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* VERIFY BUTTON */}
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
                Verify OTP
              </button>

              {/* RESEND SECTION */}
              <div className="text-center text-sm">
                {timer > 0 ? (
                  <span className="text-textMuted">
                    Resend OTP in {formatTime(timer)}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-primary font-medium hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyOtp;
