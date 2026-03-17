import { Shield, RefreshCw, XCircle, Clock, Package, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import Footer from "../../components/layout/Footer";

const POLICIES = [
  {
    icon: <RefreshCw size={22} />,
    title: "7-Day Easy Returns",
    desc: "Changed your mind? Return any unused item within 7 days of delivery — no questions asked.",
  },
  {
    icon: <Shield size={22} />,
    title: "Quality Guarantee",
    desc: "If you receive a damaged or defective product, we'll replace it or refund you in full.",
  },
  {
    icon: <Clock size={22} />,
    title: "Fast Refunds",
    desc: "Once we receive your return, refunds are processed within 5–7 business days to your original payment method.",
  },
  {
    icon: <Package size={22} />,
    title: "Free Return Pickup",
    desc: "We arrange pickup from your doorstep. No need to visit a store or courier office.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Raise a request",
    desc: "Go to My Orders, select the item and click 'Return / Exchange'.",
  },
  {
    step: "02",
    title: "Schedule pickup",
    desc: "Choose a convenient date. Our courier partner will collect the item from your address.",
  },
  {
    step: "03",
    title: "Item inspection",
    desc: "We verify the returned item meets return conditions — unused, tags intact, original packaging.",
  },
  {
    step: "04",
    title: "Refund processed",
    desc: "Refund is credited to your original payment method within 5–7 business days.",
  },
];

const NOT_ELIGIBLE = [
  "Items returned after 7 days of delivery",
  "Worn, washed, or altered items",
  "Items without original tags or packaging",
  "Innerwear, socks, and personal care products",
  "Items marked as 'Final Sale' or 'Non-returnable'",
];

const ReturnPolicyPage = () => {
  return (
    <div className="bg-bgMain">

      {/* HERO */}
      <div className="w-full py-14 px-6 flex flex-col items-center justify-center text-center bg-primary">
        <p
          className="text-white/70 tracking-[6px] text-xs mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          H A S S L E - F R E E
        </p>
        <h1
          className="text-white text-4xl sm:text-5xl"
          // style={{ fontFamily: "var(--font-stylish)" }}
          style={{ fontFamily: "var(--font-bodoni)" }}
        >
          Return Policy
        </h1>
        <p
          className="text-white/80 mt-3 text-sm sm:text-base max-w-md"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          We want you to love what you ordered. If not, returning is simple.
        </p>
      </div>

      <Container>
        <div className="py-14 mx-auto space-y-16">

          {/* POLICY HIGHLIGHTS */}
          <section>
            <p className="text-xs tracking-widest text-textMuted uppercase mb-6 text-center">
              What we promise
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {POLICIES.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-4 p-5 rounded-xl border border-borderLight bg-white"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-textPrimary">{p.title}</p>
                    <p className="text-sm text-textMuted mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section>
            <p className="text-xs tracking-widest text-textMuted uppercase mb-6 text-center">
              How it works
            </p>
            <div className="relative">

              {/* CONNECTOR LINE */}
              <div className="hidden sm:block absolute top-8 left-0 right-0 h-[1px] bg-borderLight z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                {STEPS.map((s) => (
                  <div key={s.step} className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold flex-shrink-0 border-4 border-bgMain">
                      {s.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-textPrimary">{s.title}</p>
                      <p className="text-xs text-textMuted mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NOT ELIGIBLE */}
          <section className="bg-red-50 border border-red-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <XCircle size={20} className="text-red-400 flex-shrink-0" />
              <h2
                className="text-lg text-textPrimary"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                Items not eligible for return
              </h2>
            </div>
            <ul className="space-y-3">
              {NOT_ELIGIBLE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-textSecondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* CONDITIONS */}
          <section>
            <h2
              className="text-xl text-textPrimary mb-5"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              Return conditions
            </h2>
            <div className="prose prose-sm text-textSecondary space-y-4">
              <p className="leading-relaxed">
                1. All returned items must be in their <span className="font-medium text-textPrimary">original, unused condition</span> with all tags attached and in the original packaging. Items that have been worn, washed, or altered in any way will not be accepted.
              </p>
              <p className="leading-relaxed">
                2. Returns must be initiated within <span className="font-medium text-textPrimary">7 days of delivery</span>. The delivery date is determined by the tracking information provided by our courier partner.
              </p>
              <p className="leading-relaxed">
                3. For exchange requests, the replacement item will be dispatched once the original item passes quality inspection at our warehouse. Exchange is subject to stock availability.
              </p>
              <p className="leading-relaxed">
                4. Refunds for orders paid via Cash on Delivery will be processed as store credit or bank transfer (NEFT) within 7–10 business days.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white border border-borderLight rounded-2xl p-8">
            <div>
              <h3
                className="text-lg text-textPrimary"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                Still have questions?
              </h3>
              <p className="text-sm text-textMuted mt-1">
                Our support team is available Mon – Sat, 10am – 7pm IST.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Phone size={16} className="text-primary" />
              <span className="text-sm text-textPrimary font-medium">+91 98765 43210</span>
              <Link
                to="/contact"
                className="ml-2 px-5 py-2.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 transition"
              >
                Contact Us
              </Link>
            </div>
          </section>

        </div>
      </Container>

      {/* BOTTOM STRIP */}
      {/* <div className="border-t border-borderLight py-5 text-center">
        <p
          className="text-textMuted text-xs tracking-[4px]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          J A I M A X &nbsp;·&nbsp; CRAFTED WITH CULTURE
        </p>
      </div> */}
      <Footer />

    </div>
  );
};

export default ReturnPolicyPage;