// import { useLocation, useNavigate, Link } from "react-router-dom";
// import { useEffect } from "react";
// import { CheckCircle, MapPin, CreditCard, Package, ArrowRight, ShoppingBag } from "lucide-react";
// import Container from "../../components/layout/Container";
// import confetti from "canvas-confetti";

// export default function OrderSuccessPage() {
//   const { state: order } = useLocation();
//   const navigate = useNavigate();

//   // Fire confetti on mount
//   useEffect(() => {
//     if (!order) return;
//     const end = Date.now() + 1500;
//     const frame = () => {
//       confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
//       confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
//       if (Date.now() < end) requestAnimationFrame(frame);
//     };
//     frame();
//   }, []);

//   // Guard: if someone lands here directly without state
//   if (!order) {
//     return (
//       <div className="min-h-screen bg-bgMain flex flex-col items-center justify-center gap-4">
//         <ShoppingBag size={48} className="text-borderMedium" />
//         <p className="text-textMuted text-sm">No order found.</p>
//         <button
//           onClick={() => navigate("/")}
//           className="px-6 py-2 bg-primary text-white text-sm hover:bg-primaryHover transition"
//         >
//           Go Home
//         </button>
//       </div>
//     );
//   }

//   const { shippingAddress: addr, paymentMethod, totalAmount, subtotal, shippingCharge, items = [], _id: orderId, createdAt } = order;

//   return (
//     <div className="min-h-screen bg-bgMain py-10">
//       <Container>

//         {/* SUCCESS HERO */}
//         <div className="flex flex-col items-center text-center mb-10">
//           <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
//             <CheckCircle size={36} className="text-green-500" />
//           </div>
//           <p className="text-textMuted text-xs tracking-[3px] uppercase mb-1">Thank you!</p>
//           <h1
//             className="text-3xl sm:text-4xl text-primary"
//             style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
//           >
//             Order Placed
//           </h1>
//           {orderId && (
//   <p className="text-textMuted text-xs mt-3">
//     Order ID: <span className="font-medium text-textPrimary font-mono">#{orderId}</span>
//   </p>
// )}
//           {createdAt && (
//             <p className="text-textMuted text-xs mt-1">
//               {new Date(createdAt).toLocaleDateString("en-IN", {
//                 day: "numeric", month: "long", year: "numeric",
//                 hour: "2-digit", minute: "2-digit",
//               })}
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

//           {/* LEFT: ADDRESS + PAYMENT */}
//           <div className="lg:col-span-2 space-y-5">

//             {/* DELIVERY ADDRESS */}
//             {addr && (
//               <div className="bg-white border border-borderLight shadow-sm">
//                 <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
//                   <MapPin size={15} className="text-primary" />
//                   <h2 className="font-semibold text-textPrimary text-sm">Delivery Address</h2>
//                 </div>
//                 <div className="px-6 py-4 text-sm space-y-1 text-textMuted">
//                   <p className="font-semibold text-textPrimary">{addr.fullName}</p>
//                   <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
//                   <p>{addr.city}, {addr.state} — {addr.pincode}</p>
//                   <p>{addr.country}</p>
//                   <p className="pt-1">{addr.phone}</p>
//                 </div>
//               </div>
//             )}

//             {/* PAYMENT */}
//             <div className="bg-white border border-borderLight shadow-sm">
//               <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
//                 <CreditCard size={15} className="text-primary" />
//                 <h2 className="font-semibold text-textPrimary text-sm">Payment</h2>
//               </div>
//               <div className="px-6 py-4 text-sm">
//                 <p className="text-textPrimary font-medium">
//                   {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
//                 </p>
//                 <p className="text-textMuted text-xs mt-0.5">
//                   {paymentMethod === "COD"
//                     ? "Pay when your order arrives at your door."
//                     : "Payment confirmed online."}
//                 </p>
//               </div>
//             </div>

//             {/* ORDERED ITEMS */}
//             {items.length > 0 && (
//               <div className="bg-white border border-borderLight shadow-sm">
//                 <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
//                   <Package size={15} className="text-primary" />
//                   <h2 className="font-semibold text-textPrimary text-sm">Items Ordered</h2>
//                 </div>
//                 <div className="px-6 py-4 space-y-4">
//                   {items.map((item, i) => (
//                     <div key={i} className="flex gap-4 items-start">
//                       {item.imageUrl && (
//                         <img
//                           src={item.imageUrl}
//                           alt={item.productName}
//                           className="w-16 h-20 object-cover flex-shrink-0 bg-bgMain"
//                         />
//                       )}
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-textPrimary truncate">{item.productName}</p>
//                         {item.size && <p className="text-xs text-textMuted mt-0.5">Size: {item.size}</p>}
//                         <p className="text-xs text-textMuted">Qty: {item.quantity}</p>
//                       </div>
//                       <p className="text-sm font-semibold text-textPrimary flex-shrink-0">
//                         ₹{(item.unitPrice * item.quantity).toLocaleString()}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>

//           {/* RIGHT: SUMMARY + ACTIONS */}
//           <div className="lg:col-span-1 space-y-5">

//             {/* TOTAL SUMMARY */}
//             {/* TOTALS */}
// <div className="px-6 py-4 space-y-2 text-sm">
//   <div className="flex justify-between text-textMuted">
//     <span>Subtotal</span>
//     <span>₹{subtotal?.toLocaleString()}</span>
//   </div>
//   <div className="flex justify-between text-textMuted">
//     <span>Shipping</span>
//     <span className={shippingCharge === 0 ? "text-green-600 font-medium" : ""}>
//       {shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}
//     </span>
//   </div>
//   <div className="flex justify-between font-semibold text-textPrimary pt-2 border-t border-borderLight">
//     <span>Total Paid</span>
//     <span className="text-lg">₹{totalAmount?.toLocaleString()}</span>
//   </div>
// </div>

//             {/* ACTIONS */}
//             <div className="bg-white border border-borderLight shadow-sm p-6 space-y-3">
//               <Link
//                 to="/my-orders"
//                 className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white text-sm font-medium hover:bg-primaryHover transition"
//               >
//                 Track My Order <ArrowRight size={15} />
//               </Link>
//               <Link
//                 to="/"
//                 className="flex items-center justify-center gap-2 w-full py-3 border border-borderMedium text-textMuted text-sm hover:text-textPrimary hover:border-primary transition"
//               >
//                 Continue Shopping
//               </Link>
//             </div>

//             {/* DELIVERY NOTE */}
//             <div className="bg-amber-50 border border-amber-100 px-4 py-3">
//               <p className="text-xs text-amber-700 leading-relaxed">
//                 🚚 Estimated delivery in <strong>3–5 business days</strong>. You'll receive updates on your registered contact.
//               </p>
//             </div>

//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }

import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle, MapPin, CreditCard, Package, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import Container from "../../components/layout/Container";
import confetti from "canvas-confetti";
import { useGetMyOrderByOrderIdQuery } from "../../features/orders/orderApiSlice"; // ← CHANGED

export default function OrderSuccessPage() {
  const { state: orderFromState } = useLocation();
  const [searchParams]            = useSearchParams();
  const navigate                  = useNavigate();

  const onlineOrderId = searchParams.get("orderId");
  const isOnlineFlow  = !!onlineOrderId && !orderFromState;

  // ── CHANGED: clean query, no more useEffect + useState + mutation ──────────
  const {
    data: fetchedData,
    isLoading,
    isError,
  } = useGetMyOrderByOrderIdQuery(onlineOrderId, {
    skip: !isOnlineFlow,  // only fetches for online flow
  });

  const order = isOnlineFlow ? fetchedData?.data?.order : orderFromState;

  // ── Confetti ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!order) return;
    const end = Date.now() + 1500;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60,  spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [order]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isOnlineFlow && isLoading) {
    return (
      <div className="min-h-screen bg-bgMain flex flex-col items-center justify-center gap-4">
        <Loader2 size={36} className="text-primary animate-spin" />
        <p className="text-textMuted text-sm">Confirming your payment...</p>
      </div>
    );
  }

  // ── Not found / error ──────────────────────────────────────────────────────
  if (isError || (!order && !isLoading)) {
    return (
      <div className="min-h-screen bg-bgMain flex flex-col items-center justify-center gap-4">
        <ShoppingBag size={48} className="text-borderMedium" />
        <p className="text-textMuted text-sm">No order found.</p>
        <button onClick={() => navigate("/")} className="px-6 py-2 bg-primary text-white text-sm hover:bg-primaryHover transition">
          Go Home
        </button>
      </div>
    );
  }

  const {
    shippingAddress: addr, paymentMethod,
    totalAmount, subtotal, shippingCharge,
    items = [], orderId, createdAt,
  } = order;

  return (
    <div className="bg-bgMain py-10">
      <Container>
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <CheckCircle size={36} className="text-green-500" />
          </div>
          <p className="text-textMuted text-xs tracking-[3px] uppercase mb-1">Thank you!</p>
          <h1 className="text-3xl sm:text-4xl text-primary" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Order Placed
          </h1>
          {orderId && (
            <p className="text-textMuted text-xs mt-3">
              Order ID: <span className="font-medium text-textPrimary font-mono">#{orderId}</span>
            </p>
          )}
          {createdAt && (
            <p className="text-textMuted text-xs mt-1">
              {new Date(createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </p>
          )}
          {paymentMethod === "ONLINE" && (
            <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-100">
              <CheckCircle size={12} /> Payment confirmed
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-5">
            {addr && (
              <div className="bg-white border border-borderLight shadow-sm">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
                  <MapPin size={15} className="text-primary" />
                  <h2 className="font-semibold text-textPrimary text-sm">Delivery Address</h2>
                </div>
                <div className="px-6 py-4 text-sm space-y-1 text-textMuted">
                  <p className="font-semibold text-textPrimary">{addr.fullName}</p>
                  <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                  <p>{addr.city}, {addr.state} — {addr.pincode}</p>
                  <p>{addr.country}</p>
                  <p className="pt-1">{addr.phone}</p>
                </div>
              </div>
            )}

            <div className="bg-white border border-borderLight shadow-sm">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
                <CreditCard size={15} className="text-primary" />
                <h2 className="font-semibold text-textPrimary text-sm">Payment</h2>
              </div>
              <div className="px-6 py-4 text-sm">
                <p className="text-textPrimary font-medium">
                  {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                </p>
                <p className="text-textMuted text-xs mt-0.5">
                  {paymentMethod === "COD" ? "Pay when your order arrives." : "Payment confirmed online."}
                </p>
              </div>
            </div>

            {items.length > 0 && (
              <div className="bg-white border border-borderLight shadow-sm">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
                  <Package size={15} className="text-primary" />
                  <h2 className="font-semibold text-textPrimary text-sm">Items Ordered</h2>
                </div>
                <div className="px-6 py-4 space-y-4">
                  {items.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.productName} className="w-16 h-20 object-cover flex-shrink-0 bg-bgMain" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-textPrimary truncate">{item.productName}</p>
                        {item.size && <p className="text-xs text-textMuted mt-0.5">Size: {item.size}</p>}
                        <p className="text-xs text-textMuted">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-textPrimary flex-shrink-0">
                        ₹{(item.unitPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white border border-borderLight shadow-sm px-6 py-4 space-y-2 text-sm">
              <div className="flex justify-between text-textMuted">
                <span>Subtotal</span><span>₹{subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-textMuted">
                <span>Shipping</span>
                <span className={shippingCharge === 0 ? "text-green-600 font-medium" : ""}>
                  {shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-textPrimary pt-2 border-t border-borderLight">
                <span>Total Paid</span>
                <span className="text-lg">₹{totalAmount?.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white border border-borderLight shadow-sm p-6 space-y-3">
              <Link to="/my-orders" className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white text-sm font-medium hover:bg-primaryHover transition">
                Track My Order <ArrowRight size={15} />
              </Link>
              <Link to="/products" className="flex items-center justify-center gap-2 w-full py-3 border border-borderMedium text-textMuted text-sm hover:text-textPrimary hover:border-primary transition">
                Continue Shopping
              </Link>
            </div>

            <div className="bg-amber-50 border border-amber-100 px-4 py-3">
              <p className="text-xs text-amber-700 leading-relaxed">
                🚚 Estimated delivery in <strong>3–5 business days</strong>. You'll receive updates on your registered contact.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}