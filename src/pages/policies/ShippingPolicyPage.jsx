import { Truck, Clock, MapPin, AlertCircle, Package, Phone, CheckCircle, Banknote, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import Footer from "../../components/layout/Footer";

const HIGHLIGHTS = [
  {
    icon: <Truck size={22} />,
    title: "Free Shipping",
    desc: "On all orders above ₹999. No hidden charges, no surprises at checkout.",
  },
  {
    icon: <Clock size={22} />,
    title: "Fast Delivery",
    desc: "Standard delivery in 4–7 business days. Express delivery available at checkout.",
  },
  {
    icon: <MapPin size={22} />,
    title: "Pan India Delivery",
    desc: "We deliver to 27,000+ pin codes across India including remote areas.",
  },
  {
    icon: <Package size={22} />,
    title: "Secure Packaging",
    desc: "Every order is carefully packed to ensure it reaches you in perfect condition.",
  },
];

const DELIVERY_TABLE = [
  {
    type: "Standard Delivery",
    time: "4–7 business days",
    charge: "Free above ₹999",
    chargeNote: "₹49 below",
    icon: <Truck size={20} />,
    accent: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    type: "Express Delivery",
    time: "1–3 business days",
    charge: "₹99 flat",
    chargeNote: "Any order value",
    icon: <Zap size={20} />,
    accent: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    type: "Same Day Delivery",
    time: "Within 24 hours",
    charge: "₹149 flat",
    chargeNote: "Select cities only",
    icon: <Clock size={20} />,
    accent: "bg-green-50 text-green-600 border-green-100",
  },
  {
    type: "Cash on Delivery",
    time: "4–7 business days",
    charge: "₹30 handling fee",
    chargeNote: "All pin codes",
    icon: <Banknote size={20} />,
    accent: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

const STEPS = [
  { step: "01", title: "Order placed",     desc: "You place your order and payment is confirmed." },
  { step: "02", title: "Processing",       desc: "We pick, quality-check, and pack your item within 24 hours." },
  { step: "03", title: "Dispatched",       desc: "Your order is handed to our courier partner and tracking is activated." },
  { step: "04", title: "Out for delivery", desc: "Our delivery partner is on the way to your address." },
  { step: "05", title: "Delivered",        desc: "Package arrives at your doorstep. Enjoy your order!" },
];

const NOTES = [
  "Business days exclude Sundays and public holidays.",
  "Delivery timelines may be affected during peak sale periods or natural disruptions.",
  "Orders placed before 12pm IST are typically dispatched the same day.",
  "In case of a failed delivery attempt, our courier will retry up to 2 times.",
  "For remote pin codes, delivery may take up to 10 business days.",
  "You will receive an SMS and email with your tracking link once dispatched.",
];

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-bgMain">

      {/* HERO */}
      <div className="w-full py-14 px-6 flex flex-col items-center justify-center text-center bg-primary">
        <p
          className="text-white/70 tracking-[6px] text-xs mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          F A S T &nbsp; &amp; &nbsp; R E L I A B L E
        </p>
        <h1
          className="text-white text-4xl sm:text-5xl"
          // style={{ fontFamily: "var(--font-stylish)" }}
          style={{ fontFamily: "var(--font-bodoni)" }}
        >
          Shipping Policy
        </h1>
        <p
          className="text-white/80 mt-3 text-sm sm:text-base max-w-md"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          Everything you need to know about how we get your order to you.
        </p>
      </div>

      <Container>
        <div className="py-14 mx-auto space-y-16">

          {/* HIGHLIGHTS */}
          <section>
            <p className="text-xs tracking-widest text-textMuted uppercase mb-6 text-center">
              What to expect
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map((p) => (
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

{/* DELIVERY OPTIONS TABLE */}
<section>
  <h2
    className="text-xl text-textPrimary mb-5"
    style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
  >
    Delivery options & charges
  </h2>
  <div className="rounded-xl border border-borderLight overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-primary text-white">
          <th className="text-left px-6 py-4 font-medium tracking-wide">Delivery Type</th>
          <th className="text-left px-6 py-4 font-medium tracking-wide">Estimated Time</th>
          <th className="text-left px-6 py-4 font-medium tracking-wide">Charge</th>
        </tr>
      </thead>
      <tbody>
        {DELIVERY_TABLE.map((row, i) => (
          <tr
            key={row.type}
            className="border-t border-borderLight hover:bg-primary/5 transition-colors duration-150 group"
          >
            {/* TYPE with colored icon badge */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-md border flex-shrink-0 ${row.accent}`}>
                  {row.icon}
                </div>
                <span className="font-medium text-textPrimary">{row.type}</span>
              </div>
            </td>

            {/* TIME */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-textMuted flex-shrink-0" />
                <span className="text-textSecondary">{row.time}</span>
              </div>
            </td>

            {/* CHARGE */}
            <td className="px-6 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-textPrimary">{row.charge}</span>
                <span className="text-xs text-textMuted">{row.chargeNote}</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

          {/* HOW IT WORKS */}
          <section>
            <p className="text-xs tracking-widest text-textMuted uppercase mb-8 text-center">
              Order journey
            </p>
            <div className="relative">

              {/* CONNECTOR LINE — desktop */}
              <div className="hidden sm:block absolute top-8 left-0 right-0 h-[1px] bg-borderLight z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 relative z-10">
                {STEPS.map((s) => (
                  <div key={s.step} className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold flex-shrink-0 border-4 border-bgMain">
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

          {/* IMPORTANT NOTES */}
          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <AlertCircle size={20} className="text-amber-500 flex-shrink-0" />
              <h2
                className="text-lg text-textPrimary"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                Important notes
              </h2>
            </div>
            <ul className="space-y-3">
              {NOTES.map((note) => (
                <li key={note} className="flex items-start gap-3 text-sm text-textSecondary">
                  <CheckCircle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  {note}
                </li>
              ))}
            </ul>
          </section>

          {/* TRACKING */}
          <section>
            <h2
              className="text-xl text-textPrimary mb-4"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              Tracking your order
            </h2>
            <div className="text-sm text-textSecondary space-y-4">
              <p className="leading-relaxed">
                Once your order is dispatched, you will receive a <span className="font-medium text-textPrimary">tracking link via SMS and email</span>. You can also track your order anytime from the{" "}
                <Link to="/account/orders" className="text-primary underline underline-offset-2 hover:opacity-80 transition">
                  My Orders
                </Link>{" "}
                section in your account.
              </p>
              <p className="leading-relaxed">
                If your tracking shows "delivered" but you haven't received the package, please contact us within <span className="font-medium text-textPrimary">48 hours</span> of the delivery update so we can investigate and resolve it promptly.
              </p>
              <p className="leading-relaxed">
                For orders with multiple items, they may be shipped separately and arrive at different times. Each shipment will have its own tracking number.
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
                Need help with your shipment?
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

export default ShippingPolicyPage;