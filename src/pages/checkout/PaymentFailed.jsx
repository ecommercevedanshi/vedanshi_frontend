import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { XCircle, RefreshCw, ShoppingBag, HeadphonesIcon } from "lucide-react";
import Container from "../../components/layout/Container";

// Maps backend reason codes to human-friendly messages
const REASON_MESSAGES = {
  invalid_signature : "Payment verification failed. Please try again.",
  not_found         : "We couldn't find your transaction. Please contact support.",
  server_error      : "Something went wrong on our end. Your money is safe.",
  "Payment failed"  : "Your payment was declined by the bank. Please try a different method.",
};

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const navigate        = useNavigate();

  // ?reason= is set by your backend paymentFailure handler
  const rawReason = searchParams.get("reason") || "Payment failed";
  const message   = REASON_MESSAGES[rawReason] ?? rawReason;

  // ?orderId= may or may not be present depending on where failure happened
  const orderId = searchParams.get("orderId");

  return (
    <div className="bg-bgMain py-10">
      <Container>
        <div className="max-w-lg mx-auto">

          {/* FAILURE HERO */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <XCircle size={36} className="text-red-500" />
            </div>
            <p className="text-textMuted text-xs tracking-[3px] uppercase mb-1">Oops!</p>
            <h1
              className="text-3xl sm:text-4xl text-primary"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              Payment Failed
            </h1>
            <p className="text-textMuted text-sm mt-3 max-w-sm leading-relaxed">
              {message}
            </p>
            {orderId && (
              <p className="text-textMuted text-xs mt-2">
                Order reference:{" "}
                <span className="font-medium text-textPrimary font-mono">#{orderId}</span>
              </p>
            )}
          </div>

          {/* REASSURANCE CARD */}
          <div className="bg-amber-50 border border-amber-100 px-5 py-4 mb-6 text-xs text-amber-700 leading-relaxed">
            💳 <strong>Don't worry — no money has been deducted.</strong> If you see a deduction,
            it will be automatically refunded within 5–7 business days.
          </div>

          {/* ACTIONS */}
          <div className="bg-white border border-borderLight shadow-sm p-6 space-y-3">

            {/* Primary: retry payment — go back to checkout */}
            {/* <button
              onClick={() => navigate("/checkout")}
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white text-sm font-medium hover:bg-primaryHover transition"
            >
              <RefreshCw size={15} /> Try Again
            </button> */}

            {/* Secondary: go to orders to see pending order */}
            <Link
              to="/my-orders"
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white text-sm font-medium hover:bg-primaryHover transition"
            >
              <ShoppingBag size={15} /> View My Orders
            </Link>

            {/* Tertiary: support */}
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 text-textMuted text-sm hover:text-textPrimary transition"
            >
              <HeadphonesIcon size={15} /> Contact Support
            </Link>

          </div>

        </div>
      </Container>
    </div>
  );
}