import { Scale, ShieldCheck, Ban, CreditCard, Truck, RefreshCw, Lock, Globe, AlertTriangle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import Footer from "../../components/layout/Footer";
import { useEffect, useState } from "react";

const SECTIONS = [
  {
    id: "acceptance",
    icon: <Scale />,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the Jaimax website, mobile application, or any of our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
      "These terms apply to all visitors, users, and customers. Jaimax reserves the right to update or modify these terms at any time without prior notice. Continued use of our services after any changes constitutes your acceptance of the revised terms.",
      "If you are using our services on behalf of an organisation, you confirm that you have the authority to bind that organisation to these terms.",
    ],
  },
  {
    id: "account",
    icon: <ShieldCheck size={20} />,
    title: "User Accounts",
    content: [
      "To access certain features of our platform, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "You must provide accurate, current, and complete information during the registration process and keep your account information updated at all times.",
      "You must immediately notify Jaimax of any unauthorised use of your account or any other breach of security. Jaimax will not be liable for any loss or damage arising from your failure to protect your account credentials.",
      "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or are inactive for an extended period.",
    ],
  },
  {
    id: "products",
    icon: <Globe size={20} />,
    title: "Products & Availability",
    content: [
      "All product descriptions, images, and pricing on our platform are as accurate as possible. However, Jaimax does not warrant that product descriptions or other content is error-free, complete, or current.",
      "Product availability is subject to change without notice. We reserve the right to limit the quantity of any product and to discontinue any product at any time.",
      "Colours of products may appear slightly different depending on your device's display settings. Jaimax is not responsible for colour discrepancies caused by screen variations.",
      "In the event a product is listed with an incorrect price due to a typographical or system error, Jaimax reserves the right to refuse or cancel any orders placed at the incorrect price.",
    ],
  },
  {
    id: "orders",
    icon: <CreditCard size={20} />,
    title: "Orders & Payment",
    content: [
      "By placing an order on Jaimax, you confirm that you are at least 18 years of age or are placing the order under parental supervision.",
      "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product unavailability, errors in pricing, or suspected fraud.",
      "Payment must be made in full at the time of placing the order. We accept UPI, credit/debit cards, net banking, wallets, and Cash on Delivery (subject to availability at your pin code).",
      "All prices are in Indian Rupees (₹) and include applicable taxes unless stated otherwise. Shipping charges, if any, are added at checkout.",
      "You will receive an order confirmation email after a successful transaction. This confirmation does not guarantee dispatch — orders may still be cancelled if stock becomes unavailable after confirmation.",
    ],
  },
  {
    id: "shipping",
    icon: <Truck size={20} />,
    title: "Shipping & Delivery",
    content: [
      "Jaimax ships across India to 27,000+ pin codes. Delivery timelines are estimates and may vary due to courier delays, public holidays, or unforeseen circumstances.",
      "Risk of loss and title for items pass to you upon delivery to the carrier. Jaimax is not responsible for delays caused by the courier partner after the order has been dispatched.",
      "For detailed information about delivery timelines, charges, and tracking, please refer to our Shipping Policy.",
    ],
  },
  {
    id: "returns",
    icon: <RefreshCw size={20} />,
    title: "Returns & Refunds",
    content: [
      "Returns are accepted within 7 days of delivery for eligible items in their original, unused condition with all tags intact. Items that have been worn, washed, or altered are not eligible for return.",
      "Refunds are processed within 5–7 business days after the returned item passes quality inspection at our warehouse. Refunds are credited to the original payment method.",
      "For complete details on return eligibility, process, and exclusions, please refer to our Return Policy.",
    ],
  },
  {
    id: "prohibited",
    icon: <Ban size={20} />,
    title: "Prohibited Conduct",
    content: [
      "You agree not to use our platform for any unlawful purpose or in any way that could damage, disable, or impair our services.",
      "You must not attempt to gain unauthorised access to any part of our platform, other accounts, or computer systems connected to Jaimax.",
      "You must not use automated tools, bots, or scrapers to extract data from our platform without our prior written consent.",
      "You must not post or transmit any content that is defamatory, obscene, fraudulent, or that infringes on the intellectual property rights of others.",
      "Bulk purchasing for commercial resale purposes without our prior written consent is strictly prohibited.",
    ],
  },
  {
    id: "privacy",
    icon: <Lock size={20} />,
    title: "Privacy & Data",
    content: [
      "Your use of our platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference.",
      "By using our services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.",
      "We implement industry-standard security measures to protect your personal and payment information. However, no method of transmission over the internet is 100% secure.",
      "We do not sell your personal information to third parties. Data shared with courier partners and payment gateways is strictly for order fulfilment purposes.",
    ],
  },
  {
    id: "intellectual",
    icon: <ShieldCheck size={20} />,
    title: "Intellectual Property",
    content: [
      "All content on the Jaimax platform — including but not limited to text, images, logos, graphics, and software — is the exclusive property of Jaimax or its licensors and is protected under applicable intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works from any content on our platform without prior written consent from Jaimax.",
      "Any feedback, suggestions, or ideas you submit to us may be used by Jaimax without any obligation to compensate you.",
    ],
  },
  {
    id: "liability",
    icon: <AlertTriangle size={20} />,
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by applicable law, Jaimax shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.",
      "Our total liability to you for any claim arising from your use of our platform shall not exceed the amount you paid for the specific order giving rise to the claim.",
      "Jaimax does not warrant that our services will be uninterrupted, error-free, or free of viruses or other harmful components.",
      "We are not responsible for any losses resulting from unauthorised access to your account due to your failure to safeguard your credentials.",
    ],
  },
  {
    id: "governing",
    icon: <Scale size={20} />,
    title: "Governing Law & Disputes",
    content: [
      "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana.",
      "In the event of a dispute, we encourage you to contact us first at support@jaimax.com to resolve the matter amicably before pursuing legal action.",
      "If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.",
    ],
  },
];

const TermsPage = () => {
  const [activeId, setActiveId] = useState("acceptance");

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  setActiveId(id);
};

useEffect(() => {
  const observers = [];

  SECTIONS.forEach((section) => {
    const el = document.getElementById(section.id);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveId(section.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px", // triggers when section is in upper 30% of viewport
        threshold: 0,
      }
    );

    observer.observe(el);
    observers.push(observer);
  });

  return () => observers.forEach((o) => o.disconnect());
}, []);

  return (
    <div className="min-h-screen bg-bgMain">

      {/* HERO */}
      <div className="w-full py-14 px-6 flex flex-col items-center justify-center text-center bg-primary">
        <p
          className="text-white/70 tracking-[6px] text-xs mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          P L E A S E &nbsp; R E A D &nbsp; C A R E F U L L Y
        </p>
        <h1
          className="text-white text-4xl sm:text-5xl"
          // style={{ fontFamily: "var(--font-stylish)" }}
          style={{ fontFamily: "var(--font-bodoni)" }}
        >
          Terms & Conditions
        </h1>
        <p
          className="text-white/80 mt-3 text-sm sm:text-base max-w-md"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          Last updated: March 2026. These terms govern your use of Jaimax services.
        </p>
      </div>

      <Container>
        <div className="py-14 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">

         {/* ── MOBILE HORIZONTAL TABS ── */}
<div className="lg:hidden sticky top-[70px] z-40 bg-bgMain border-b border-borderLight -mx-4 px-4">
  <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2">
    {SECTIONS.map((s) => {
      const isActive = activeId === s.id;
      return (
        <button
  key={s.id}
  onClick={() => scrollTo(s.id)}
  className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-150 border ${
    isActive
      ? "bg-primary text-white border-primary"
      : "bg-white text-textSecondary border-borderLight hover:border-primary hover:text-primary"
  }`}
>
  <span style={{ width: 11, height: 11, display: "flex", alignItems: "center", flexShrink: 0 }}>
    {s.icon}
  </span>
  {s.title}
</button>
      );
    })}
  </div>
</div>

{/* ── DESKTOP STICKY SIDEBAR ── */}
<aside className="hidden lg:block sticky top-24">
  <p className="text-xs tracking-widest text-textMuted uppercase mb-4">Contents</p>
  <nav className="flex flex-col gap-1">
    {SECTIONS.map((s) => {
      const isActive = activeId === s.id;
      return (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className={`text-left text-sm px-3 py-2 rounded-lg transition-colors duration-150 flex items-center gap-2 group ${
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-textSecondary hover:text-primary hover:bg-primary/5"
          }`}
        >
          <span className={`transition-colors ${isActive ? "text-primary" : "text-textMuted group-hover:text-primary"}`}>
            {s.icon}
          </span>
          {s.title}
          {isActive && (
            <span className="ml-auto w-1 h-4 rounded-full bg-primary flex-shrink-0" />
          )}
        </button>
      );
    })}
  </nav>
</aside>

          {/* ── MAIN CONTENT ── */}
          <main className="space-y-12">

            {/* INTRO */}
            <div className="bg-white border border-borderLight rounded-xl p-6">
              <p className="text-sm text-textSecondary leading-relaxed">
                Welcome to Jaimax. These Terms and Conditions outline the rules and regulations for the use of our platform and services. By accessing this website or placing an order, you accept these terms in full. Please read them carefully before proceeding.
              </p>
              <p className="text-sm text-textMuted mt-3">
                For questions, contact us at{" "}
                <a href="mailto:support@jaimax.com" className="text-primary underline underline-offset-2 hover:opacity-80 transition">
                  support@jaimax.com
                </a>
              </p>
            </div>

            {/* SECTIONS */}
            {SECTIONS.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                {/* SECTION HEADER */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs text-textMuted font-mono">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="text-lg text-textPrimary"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* BORDER LEFT CONTENT */}
                <div className="border-l-2 border-borderLight pl-6 space-y-4">
                  {section.content.map((para, i) => (
                    <p key={i} className="text-sm text-textSecondary leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* CROSS LINKS for shipping/returns */}
                {section.id === "shipping" && (
                  <Link
                    to="/shipping-policy"
                    className="mt-4 inline-flex items-center gap-2 text-xs text-primary border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/5 transition ml-6"
                  >
                    <Truck size={13} /> Read full Shipping Policy
                  </Link>
                )}
                {section.id === "returns" && (
                  <Link
                    to="/return-policy"
                    className="mt-4 inline-flex items-center gap-2 text-xs text-primary border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/5 transition ml-6"
                  >
                    <RefreshCw size={13} /> Read full Return Policy
                  </Link>
                )}
              </section>
            ))}

            {/* CONTACT CTA */}
            <section className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white border border-borderLight rounded-2xl p-8">
              <div>
                <h3
                  className="text-lg text-textPrimary"
                  style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                >
                  Have a question about our terms?
                </h3>
                <p className="text-sm text-textMuted mt-1">
                  We're happy to clarify anything. Reach out to our team.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Mail size={16} className="text-primary" />
                <span className="text-sm text-textPrimary font-medium">support@jaimax.com</span>
                <Link
                  to="/contact"
                  className="ml-2 px-5 py-2.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 transition"
                >
                  Contact Us
                </Link>
              </div>
            </section>

          </main>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default TermsPage;