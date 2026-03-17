// import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
// import { useState } from "react";

// const ContactPage = () => {
//   const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
//   const [sent, setSent] = useState(false);

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const submit = (e) => {
//     e.preventDefault();
//     setSent(true);
//   };

//   return (
//     <div className="min-h-screen bg-bgMain">

//       {/* ── HERO BANNER ── */}
//       <div
//         className="w-full py-16 px-6 flex flex-col items-center justify-center text-center"
//         style={{ backgroundColor: "var(--color-primary)" }}
//       >
//         <p
//           className="text-white/70 tracking-[6px] text-xs mb-3"
//           style={{ fontFamily: "Georgia, serif" }}
//         >
//           W E &nbsp; A R E &nbsp; H E R E
//         </p>
//         <h1
//           className="text-white text-5xl sm:text-6xl"
//           style={{ fontFamily: "var(--font-stylish)" }}
//         >
//           Contact Us
//         </h1>
//         <p
//           className="text-white/80 mt-4 text-sm sm:text-base max-w-md"
//           style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
//         >
//           We'd love to hear from you. Reach out and we'll get back within 24 hours.
//         </p>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">

//         {/* ── LEFT — INFO CARDS ── */}
//         <div className="flex flex-col gap-6">

//           <h2
//             className="text-2xl text-textPrimary"
//             style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
//           >
//             Get in touch
//           </h2>

//           {[
//             {
//               icon: <Mail size={20} />,
//               title: "Email Us",
//               line1: "support@vedastras.com",
//               line2: "We reply within 24 hours",
//             },
//             {
//               icon: <Phone size={20} />,
//               title: "Call Us",
//               line1: "+91 98765 43210",
//               line2: "Mon – Sat, 10am – 7pm IST",
//             },
//             {
//               icon: <MapPin size={20} />,
//               title: "Visit Us",
//               line1: "12, Heritage Lane, Hyderabad",
//               line2: "Telangana, India – 500001",
//             },
//             {
//               icon: <Clock size={20} />,
//               title: "Business Hours",
//               line1: "Monday – Saturday: 10am – 7pm",
//               line2: "Sunday: Closed",
//             },
//           ].map((item) => (
//             <div
//               key={item.title}
//               className="flex items-start gap-4 p-5 rounded-xl border"
//               style={{
//                 borderColor: "var(--border-light)",
//                 backgroundColor: "var(--card-soft)",
//               }}
//             >
//               <div
//                 className="p-3 rounded-full text-white flex-shrink-0"
//                 style={{ backgroundColor: "var(--color-primary)" }}
//               >
//                 {item.icon}
//               </div>
//               <div>
//                 <p
//                   className="text-textPrimary font-medium text-sm tracking-wide"
//                   style={{ fontFamily: "Georgia, serif" }}
//                 >
//                   {item.title}
//                 </p>
//                 <p className="text-textSecondary text-sm mt-0.5">{item.line1}</p>
//                 <p className="text-textMuted text-xs mt-0.5">{item.line2}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── RIGHT — FORM ── */}
//         <div
//           className="rounded-2xl p-8 border"
//           style={{
//             borderColor: "var(--border-light)",
//             backgroundColor: "var(--card-bg)",
//             boxShadow: "var(--shadow-soft)",
//           }}
//         >
//           {sent ? (
//             <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
//               <div
//                 className="w-16 h-16 rounded-full flex items-center justify-center"
//                 style={{ backgroundColor: "var(--color-primary)" }}
//               >
//                 <Send size={28} className="text-white" />
//               </div>
//               <h3
//                 className="text-2xl text-textPrimary"
//                 style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
//               >
//                 Message Sent!
//               </h3>
//               <p className="text-textMuted text-sm max-w-xs">
//                 Thank you for reaching out. Our team will get back to you within 24 hours.
//               </p>
//               <button
//                 onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
//                 className="mt-4 text-sm px-6 py-2 rounded-full border transition hover:text-white"
//                 style={{
//                   borderColor: "var(--color-primary)",
//                   color: "var(--color-primary)",
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--color-primary)"}
//                 onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
//               >
//                 Send Another
//               </button>
//             </div>
//           ) : (
//             <>
//               <h2
//                 className="text-2xl text-textPrimary mb-6"
//                 style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
//               >
//                 Send a Message
//               </h2>

//               <form onSubmit={submit} className="flex flex-col gap-4">

//                 {/* Name + Email row */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {[
//                     { name: "name", placeholder: "Your Name", type: "text" },
//                     { name: "email", placeholder: "Your Email", type: "email" },
//                   ].map((f) => (
//                     <input
//                       key={f.name}
//                       type={f.type}
//                       name={f.name}
//                       placeholder={f.placeholder}
//                       value={form[f.name]}
//                       onChange={handle}
//                       required
//                       className="w-full px-4 py-3 rounded-lg text-sm outline-none border transition focus:border-primary"
//                       style={{
//                         borderColor: "var(--border-medium)",
//                         backgroundColor: "var(--card-soft)",
//                         color: "var(--text-primary)",
//                         fontFamily: "Georgia, serif",
//                       }}
//                     />
//                   ))}
//                 </div>

//                 {/* Subject */}
//                 <input
//                   type="text"
//                   name="subject"
//                   placeholder="Subject"
//                   value={form.subject}
//                   onChange={handle}
//                   required
//                   className="w-full px-4 py-3 rounded-lg text-sm outline-none border transition"
//                   style={{
//                     borderColor: "var(--border-medium)",
//                     backgroundColor: "var(--card-soft)",
//                     color: "var(--text-primary)",
//                     fontFamily: "Georgia, serif",
//                   }}
//                 />

//                 {/* Message */}
//                 <textarea
//                   name="message"
//                   placeholder="Your message..."
//                   rows={5}
//                   value={form.message}
//                   onChange={handle}
//                   required
//                   className="w-full px-4 py-3 rounded-lg text-sm outline-none border transition resize-none"
//                   style={{
//                     borderColor: "var(--border-medium)",
//                     backgroundColor: "var(--card-soft)",
//                     color: "var(--text-primary)",
//                     fontFamily: "Georgia, serif",
//                   }}
//                 />

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="w-full py-3 rounded-lg text-white text-sm tracking-widest transition hover:opacity-90 flex items-center justify-center gap-2"
//                   style={{ backgroundColor: "var(--color-primary)", fontFamily: "Georgia, serif" }}
//                 >
//                   <Send size={16} />
//                   SEND MESSAGE
//                 </button>

//               </form>
//             </>
//           )}
//         </div>

//       </div>

//       {/* ── BOTTOM STRIP ── */}
//       <div
//         className="w-full py-6 text-center"
//         style={{ backgroundColor: "var(--card-soft)", borderTop: "1px solid var(--border-light)" }}
//       >
//         <p
//           className="text-textMuted text-xs tracking-[4px]"
//           style={{ fontFamily: "Georgia, serif" }}
//         >
//           V E D A S T R A S &nbsp;·&nbsp; CRAFTED WITH CULTURE
//         </p>
//       </div>

//     </div>
//   );
// };

// export default ContactPage;

import { Mail, Phone, MapPin, Clock, Send, Package, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../features/orders/orderApiSlice"
import Container from "../../components/layout/Container";
import Footer from "../../components/layout/Footer";

const STATUS_STYLES = {
  pending:   { bg: "bg-amber-50",  text: "text-amber-700",  label: "Pending" },
  confirmed: { bg: "bg-blue-50",   text: "text-blue-700",   label: "Confirmed" },
  shipped:   { bg: "bg-purple-50", text: "text-purple-700", label: "Shipped" },
  delivered: { bg: "bg-green-50",  text: "text-green-700",  label: "Delivered" },
  cancelled: { bg: "bg-red-50",    text: "text-red-700",    label: "Cancelled" },
};

const ISSUES = [
  "Where is my order?",
  "I want to cancel my order",
  "I received a wrong item",
  "Item is damaged / defective",
  "I want to return / exchange",
  "Payment issue",
  "Other",
];

const ContactPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: ordersData, isLoading: ordersLoading } = useGetMyOrdersQuery(
    undefined,
    { skip: !user }
  );

  const orders = ordersData?.data?.orders || [];

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setSelectedOrder(null);
    setSelectedIssue("");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-bgMain">

      {/* HERO */}
      <div className="w-full py-12 px-6 flex flex-col items-center justify-center text-center bg-primary">
        <p className="text-white/70 tracking-[6px] text-xs mb-3" style={{ fontFamily: "Georgia, serif" }}>
          W E &nbsp; A R E &nbsp; H E R E
        </p>
        <h1 className="text-white text-4xl sm:text-5xl" 
        // style={{ fontFamily: "var(--font-stylish)" }}
        style={{ fontFamily: "var(--font-bodoni)" }}
        >
          Help Center
        </h1>
        <p className="text-white/80 mt-3 text-sm max-w-md" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          Select an order and tell us what's wrong — we'll sort it out fast.
        </p>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">

        {/* ── LEFT — RECENT ORDERS ── */}
        <div>
          <p className="text-xs tracking-widest text-textMuted uppercase mb-4">
            Your Recent Orders
          </p>

          {!user ? (
            <div className="flex flex-col items-center py-12 gap-3 text-center border border-borderLight rounded-xl">
              <Package size={32} className="text-borderMedium" />
              <p className="text-sm text-textMuted">Login to see your orders</p>
            </div>
          ) : ordersLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-xl border border-borderLight p-4">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center py-12 gap-3 text-center border border-borderLight rounded-xl">
              <Package size={32} className="text-borderMedium" />
              <p className="text-sm text-textMuted">No orders yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map((order) => {
                const item = order.items?.[0];
                const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
                const isSelected = selectedOrder?._id === order._id;
                const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                });

                return (
                  <button
                    key={order._id}
                    onClick={() => { setSelectedOrder(order); setSelectedIssue(""); setSent(false); }}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-borderLight bg-white hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">

                      {/* PRODUCT IMAGE */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-borderLight">
                        {item?.imageUrl ? (
                          <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={18} className="text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* INFO */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-textPrimary truncate">
                          {item?.productName}
                          {order.items.length > 1 && (
                            <span className="text-textMuted font-normal"> +{order.items.length - 1} more</span>
                          )}
                        </p>
                        <p className="text-xs text-textMuted mt-0.5">{date} · ₹{order.totalAmount.toLocaleString()}</p>
                        <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                          {statusStyle.label}
                        </span>
                      </div>

                      <ChevronRight size={16} className={`flex-shrink-0 transition-colors ${isSelected ? "text-primary" : "text-gray-300"}`} />
                    </div>
                  </button>
                );
              })}

              {/* NO ORDER OPTION */}
              <button
                onClick={() => { setSelectedOrder(null); setSelectedIssue(""); setSent(false); }}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  !selectedOrder
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-borderLight bg-white hover:border-primary/40"
                }`}
              >
                <p className="text-sm font-medium text-textPrimary">Not related to an order</p>
                <p className="text-xs text-textMuted mt-0.5">General enquiry, feedback, or other</p>
              </button>
            </div>
          )}

          {/* CONTACT INFO */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: <Mail size={15} />, text: "support@jaimax.com" },
              { icon: <Phone size={15} />, text: "+91 98765 43210" },
              { icon: <Clock size={15} />, text: "Mon – Sat, 10am – 7pm IST" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-textMuted">
                <span className="text-primary">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — FORM ── */}
        <div className="bg-white rounded-2xl border border-borderLight p-8">

          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <Send size={24} className="text-white" />
              </div>
              <h3 className="text-2xl text-textPrimary" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                Message Sent!
              </h3>
              <p className="text-textMuted text-sm max-w-xs">
                We've received your message and will get back within 24 hours.
              </p>
              <button
                onClick={reset}
                className="mt-3 text-sm px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
              >
                Send Another
              </button>
            </div>

          ) : (
            <>
              {/* FORM HEADER */}
              <div className="mb-6">
                <h2 className="text-2xl text-textPrimary" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                  {selectedOrder ? `Help with order` : "Get in touch"}
                </h2>
                {selectedOrder && (
                  <p className="text-xs text-textMuted mt-1">
                    #{selectedOrder._id.slice(-8).toUpperCase()} · {selectedOrder.items?.[0]?.productName}
                  </p>
                )}
              </div>

              {/* ISSUE CHIPS — only when order selected */}
              {selectedOrder && (
                <div className="mb-6">
                  <p className="text-xs text-textMuted uppercase tracking-widest mb-3">What's the issue?</p>
                  <div className="flex flex-wrap gap-2">
                    {ISSUES.map((issue) => (
                      <button
                        key={issue}
                        type="button"
                        onClick={() => setSelectedIssue(issue)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selectedIssue === issue
                            ? "bg-primary text-white border-primary"
                            : "border-borderLight text-textSecondary hover:border-primary hover:text-primary"
                        }`}
                      >
                        {issue}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handle}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-borderMedium bg-bgMain text-textPrimary focus:border-primary transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handle}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-borderMedium bg-bgMain text-textPrimary focus:border-primary transition"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder={
                    selectedIssue
                      ? `Tell us more about "${selectedIssue}"...`
                      : "Describe your issue or question..."
                  }
                  rows={5}
                  value={form.message}
                  onChange={handle}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none border border-borderMedium bg-bgMain text-textPrimary focus:border-primary transition resize-none"
                />

                <button
                  type="submit"
                  disabled={selectedOrder && !selectedIssue}
                  className="w-full py-3 rounded-lg text-white text-sm tracking-widest flex items-center justify-center gap-2 bg-primary hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  <Send size={15} />
                  SEND MESSAGE
                </button>

                {selectedOrder && !selectedIssue && (
                  <p className="text-xs text-center text-textMuted">
                    Please select an issue above to continue
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>

      {/* BOTTOM STRIP */}
      {/* <div className="w-full py-5 text-center border-t border-borderLight bg-bgMain">
        <p className="text-textMuted text-xs tracking-[4px]" style={{ fontFamily: "Georgia, serif" }}>
          J A I M A X &nbsp;·&nbsp; CRAFTED WITH CULTURE
        </p>
      </div> */}
      <Footer />
    </div>
  );
};

export default ContactPage;