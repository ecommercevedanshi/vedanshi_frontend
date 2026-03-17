// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   MapPin,
//   Plus,
//   X,
//   Check,
//   ShoppingBag,
//   Truck,
//   CreditCard,
//   ChevronRight,
//   LockKeyhole,
// } from "lucide-react";

// import { useGetCartQuery } from "../../features/cart/cartApiSlice";
// import { usePlaceOrderMutation } from "../../features/orders/orderApiSlice";
// import {
//   useGetUserProfileQuery,
//   useUpdateProfileMutation,
// } from "../../features/profile/profileApiSlice";
// import Container from "../../components/layout/Container";
// import { openCart } from "../../features/cart/cartSlice";

// const inputClass = `
//   w-full px-4 py-2.5
//   border border-borderMedium
//   bg-bgMain text-textPrimary
//   outline-none focus:border-primary
//   transition text-sm
// `;

// const labelClass =
//   "text-xs text-textMuted font-medium uppercase tracking-wide mb-1 block";

// const emptyAddressForm = {
//   label: "Home",
//   fullName: "",
//   phone: "",
//   line1: "",
//   line2: "",
//   city: "",
//   state: "",
//   pincode: "",
//   country: "India",
//   isDefault: false,
// };

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const id = user?._id || user?.id;

//   // Guard: no user → go home and open cart
//   useEffect(() => {
//     if (!user) {
//       navigate("/", { replace: true });
//       dispatch(openCart());
//     }
//   }, [user]);

//   const { data: profileData, isLoading: profileLoading } =
//     useGetUserProfileQuery(id);
//   const [updateProfile, { isLoading: isSavingAddress }] =
//     useUpdateProfileMutation();
//   const { data: cartData } = useGetCartQuery(undefined, { skip: !user });
//   const [placeOrder] = usePlaceOrderMutation();

//   const profile = profileData?.data;
//   const addresses = profile?.addresses || [];

//   const [selectedAddressId, setSelectedAddressId] = useState(null);

//   const defaultAddressId =
//     addresses.find((a) => a.isDefault)?._id || addresses[0]?._id || null;
//   const activeAddressId = selectedAddressId ?? defaultAddressId;
//   const selectedAddress =
//     addresses.find((a) => a._id === activeAddressId) || addresses[0];

//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newAddress, setNewAddress] = useState(emptyAddressForm);
//   const [addressError, setAddressError] = useState("");
//   const [orderError, setOrderError] = useState("");

//   // keep selectedAddressId in sync once profile loads
//   //   const selectedAddress = addresses.find((a) => a._id === selectedAddressId) || addresses[0];

//   const items = cartData?.data?.items || [];
//   const subtotal = items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0,
//   );
//   const shippingCharge = subtotal >= 999 ? 0 : 99;
//   const totalAmount = subtotal + shippingCharge;

//   const handleNewAddressChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveNewAddress = async () => {
//     if (
//       !newAddress.fullName ||
//       !newAddress.line1 ||
//       !newAddress.city ||
//       !newAddress.pincode ||
//       !newAddress.phone
//     ) {
//       setAddressError("Please fill all required fields.");
//       return;
//     }
//     setAddressError("");

//     try {
//       const updatedAddresses = [...addresses, newAddress];

//       const formData = new FormData();
//       formData.append("name", profile.name);
//       formData.append("address", JSON.stringify(updatedAddresses));

//       const res = await updateProfile({ id, body: formData }).unwrap();

//       // select the newly added address
//       const saved = res?.data?.addresses;
//       if (saved?.length) setSelectedAddressId(saved[saved.length - 1]._id);

//       setShowAddForm(false);
//       setNewAddress(emptyAddressForm);
//     } catch (err) {
//       setAddressError(err?.data?.message || "Failed to save address.");
//     }
//   };

//   // Replace handlePlaceOrder
//   const handlePlaceOrder = async () => {
//   setOrderError("");

//   if (!selectedAddress) {
//     setOrderError("Please select or add a shipping address before placing your order.");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     return;
//   }

//   // Block ONLINE before even hitting the API
//   if (paymentMethod === "ONLINE") {
//     setOrderError("Online payment is under development. Please use Cash on Delivery.");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     return;
//   }

//   try {
//     const res = await placeOrder({ shippingAddress: selectedAddress, paymentMethod }).unwrap();
//     navigate("/order-success", { state: res.data.order });
//   } catch (err) {
//     setOrderError(err?.data?.message || "Something went wrong. Please try again.");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }
// };

//   if (!items.length) {
//     return (
//       <div className="min-h-screen bg-bgMain flex flex-col items-center justify-center gap-4">
//         <ShoppingBag size={48} className="text-borderMedium" />
//         <p className="text-textMuted text-sm">Your cart is empty</p>
//         <button
//           onClick={() => navigate("/products")}
//           className="px-6 py-2 bg-primary text-white text-sm hover:bg-primaryHover transition"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-bgMain py-10">
//       <Container>
//         {/* PAGE HEADER */}
//         <div className="mb-8">
//           <p className="text-textMuted text-xs tracking-[3px] uppercase">
//             Almost there
//           </p>
//           <h1
//             className="text-3xl sm:text-4xl text-primary mt-1"
//             style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
//           >
//             Checkout
//           </h1>
//         </div>

//         {/* BREADCRUMB STEPS */}
//         <div className="flex items-center gap-2 text-xs text-textMuted mb-8">
//           <span className="text-primary font-medium">Cart</span>
//           <ChevronRight size={12} />
//           <span className="text-primary font-semibold">Checkout</span>
//           <ChevronRight size={12} />
//           <span>Confirmation</span>
//         </div>

//         {orderError && (
//           <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm">
//             <X size={16} className="flex-shrink-0 mt-0.5" />
//             <p>{orderError}</p>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* ── LEFT: ADDRESS + PAYMENT ── */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* SHIPPING ADDRESS SECTION */}
//             <div className="bg-white shadow-sm border border-borderLight">
//               {/* Section header */}
//               <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
//                 <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
//                   1
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin size={16} className="text-primary" />
//                   <h2 className="font-semibold text-textPrimary">
//                     Shipping Address
//                   </h2>
//                 </div>
//               </div>

//               <div className="p-6 space-y-3">
//                 {profileLoading ? (
//                   <div className="flex items-center gap-3 py-4">
//                     <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
//                     <span className="text-sm text-textMuted">
//                       Loading addresses...
//                     </span>
//                   </div>
//                 ) : addresses.length === 0 && !showAddForm ? (
//                   <div className="flex flex-col items-center py-8 gap-3 text-center">
//                     <MapPin size={32} className="text-borderMedium" />
//                     <p className="text-textMuted text-sm">
//                       No saved addresses yet.
//                     </p>
//                     <button
//                       onClick={() => setShowAddForm(true)}
//                       className="flex items-center gap-1.5 px-4 py-2 border border-primary text-primary text-sm hover:bg-primary hover:text-white transition"
//                     >
//                       <Plus size={14} /> Add Address
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     {/* ADDRESS CARDS */}
//                     {addresses.map((addr) => (
//                       <label
//                         key={addr._id}
//                         className={`flex gap-4 p-4 border cursor-pointer transition ${
//                           activeAddressId === addr._id
//                             ? "border-primary bg-primary/5"
//                             : "border-borderLight hover:border-borderMedium"
//                         }`}
//                       >
//                         <input
//                           type="radio"
//                           name="address"
//                           className="mt-1 accent-primary flex-shrink-0"
//                           checked={activeAddressId === addr._id}
//                           onChange={() => setSelectedAddressId(addr._id)}
//                         />
//                         <div className="flex-1 text-sm space-y-0.5">
//                           <div className="flex items-center gap-2 flex-wrap">
//                             <span className="font-semibold text-textPrimary">
//                               {addr.fullName}
//                             </span>
//                             <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
//                               {addr.label}
//                             </span>
//                             {addr.isDefault && (
//                               <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full">
//                                 Default
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-textMuted">
//                             {addr.line1}
//                             {addr.line2 ? `, ${addr.line2}` : ""}
//                           </p>
//                           <p className="text-textMuted">
//                             {addr.city}, {addr.state} — {addr.pincode}
//                           </p>
//                           <p className="text-textMuted">{addr.phone}</p>
//                         </div>
//                         {activeAddressId === addr._id && (
//                           <Check
//                             size={16}
//                             className="text-primary flex-shrink-0 mt-1"
//                           />
//                         )}
//                       </label>
//                     ))}

//                     {/* ADD NEW toggle */}
//                     {!showAddForm && (
//                       <button
//                         onClick={() => setShowAddForm(true)}
//                         className="flex items-center gap-2 text-sm text-primary border border-dashed border-primary w-full py-3 px-4 hover:bg-primary/5 transition mt-2"
//                       >
//                         <Plus size={15} /> Add a new address
//                       </button>
//                     )}
//                   </>
//                 )}

//                 {/* ADD NEW ADDRESS FORM */}
//                 {showAddForm && (
//                   <div className="border border-borderLight bg-bgMain p-5 mt-3 space-y-4">
//                     <div className="flex items-center justify-between mb-1">
//                       <p className="text-sm font-semibold text-textPrimary">
//                         New Address
//                       </p>
//                       <button
//                         onClick={() => {
//                           setShowAddForm(false);
//                           setAddressError("");
//                         }}
//                       >
//                         <X
//                           size={16}
//                           className="text-textMuted hover:text-textPrimary"
//                         />
//                       </button>
//                     </div>

//                     {addressError && (
//                       <p className="text-xs text-red-500 bg-red-50 px-3 py-2">
//                         {addressError}
//                       </p>
//                     )}

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       {/* LABEL */}
//                       <div>
//                         <label className={labelClass}>Label</label>
//                         <select
//                           name="label"
//                           value={newAddress.label}
//                           onChange={handleNewAddressChange}
//                           className={inputClass}
//                         >
//                           <option value="Home">Home</option>
//                           <option value="Work">Work</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>

//                       {/* FULL NAME */}
//                       <div>
//                         <label className={labelClass}>Full Name *</label>
//                         <input
//                           name="fullName"
//                           value={newAddress.fullName}
//                           onChange={handleNewAddressChange}
//                           placeholder="Recipient name"
//                           className={inputClass}
//                         />
//                       </div>

//                       {/* PHONE */}
//                       <div>
//                         <label className={labelClass}>Phone *</label>
//                         <input
//                           name="phone"
//                           value={newAddress.phone}
//                           onChange={handleNewAddressChange}
//                           placeholder="10-digit number"
//                           className={inputClass}
//                         />
//                       </div>

//                       {/* LINE 1 */}
//                       <div className="sm:col-span-2">
//                         <label className={labelClass}>Address Line 1 *</label>
//                         <input
//                           name="line1"
//                           value={newAddress.line1}
//                           onChange={handleNewAddressChange}
//                           placeholder="House No, Building, Street"
//                           className={inputClass}
//                         />
//                       </div>

//                       {/* LINE 2 */}
//                       <div className="sm:col-span-2">
//                         <label className={labelClass}>
//                           Address Line 2{" "}
//                           <span className="normal-case text-textMuted">
//                             (optional)
//                           </span>
//                         </label>
//                         <input
//                           name="line2"
//                           value={newAddress.line2}
//                           onChange={handleNewAddressChange}
//                           placeholder="Area, Locality, Landmark"
//                           className={inputClass}
//                         />
//                       </div>

//                       {/* CITY */}
//                       <div>
//                         <label className={labelClass}>City *</label>
//                         <input
//                           name="city"
//                           value={newAddress.city}
//                           onChange={handleNewAddressChange}
//                           placeholder="City"
//                           className={inputClass}
//                         />
//                       </div>

//                       {/* STATE */}
//                       <div>
//                         <label className={labelClass}>State</label>
//                         <input
//                           name="state"
//                           value={newAddress.state}
//                           onChange={handleNewAddressChange}
//                           placeholder="State"
//                           className={inputClass}
//                         />
//                       </div>

//                       {/* PINCODE */}
//                       <div>
//                         <label className={labelClass}>Pincode *</label>
//                         <input
//                           name="pincode"
//                           value={newAddress.pincode}
//                           onChange={handleNewAddressChange}
//                           placeholder="Pincode"
//                           className={inputClass}
//                         />
//                       </div>

//                       {/* COUNTRY */}
//                       <div>
//                         <label className={labelClass}>Country</label>
//                         <input
//                           name="country"
//                           value={newAddress.country}
//                           onChange={handleNewAddressChange}
//                           className={inputClass}
//                         />
//                       </div>

//                       {/* SET DEFAULT */}
//                       <div className="sm:col-span-2">
//                         <label className="flex items-center gap-2 cursor-pointer text-sm text-textPrimary">
//                           <input
//                             type="checkbox"
//                             checked={newAddress.isDefault}
//                             onChange={(e) =>
//                               setNewAddress((p) => ({
//                                 ...p,
//                                 isDefault: e.target.checked,
//                               }))
//                             }
//                             className="accent-primary w-4 h-4"
//                           />
//                           Set as default address
//                         </label>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 pt-1">
//                       <button
//                         onClick={() => {
//                           setShowAddForm(false);
//                           setAddressError("");
//                         }}
//                         className="px-5 py-2 border border-borderMedium text-textMuted text-sm hover:text-textPrimary transition"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleSaveNewAddress}
//                         disabled={isSavingAddress}
//                         className="px-5 py-2 bg-primary text-white text-sm hover:bg-primaryHover transition disabled:opacity-60 disabled:cursor-not-allowed"
//                       >
//                         {isSavingAddress ? "Saving..." : "Save Address"}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* PAYMENT METHOD SECTION */}
//             <div className="bg-white shadow-sm border border-borderLight">
//               <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
//                 <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
//                   2
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CreditCard size={16} className="text-primary" />
//                   <h2 className="font-semibold text-textPrimary">
//                     Payment Method
//                   </h2>
//                 </div>
//               </div>

//               <div className="p-6 space-y-3">
//                 {[
//                   {
//                     value: "COD",
//                     label: "Cash on Delivery",
//                     desc: "Pay when your order arrives",
//                   },
//                   {
//                     value: "ONLINE",
//                     label: "Online Payment",
//                     desc: "UPI, Cards, Net Banking (coming soon)",
//                   },
//                 ].map((opt) => (
//                   <label
//                     key={opt.value}
//                     className={`flex gap-4 p-4 border cursor-pointer transition ${
//                       paymentMethod === opt.value
//                         ? "border-primary bg-primary/5"
//                         : "border-borderLight hover:border-borderMedium"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="payment"
//                       value={opt.value}
//                       checked={paymentMethod === opt.value}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="mt-1 accent-primary flex-shrink-0"
//                     />
//                     <div>
//                       <p className="text-sm font-medium text-textPrimary">
//                         {opt.label}
//                       </p>
//                       <p className="text-xs text-textMuted mt-0.5">
//                         {opt.desc}
//                       </p>
//                     </div>
//                     {paymentMethod === opt.value && (
//                       <Check
//                         size={16}
//                         className="text-primary ml-auto flex-shrink-0 mt-1"
//                       />
//                     )}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── RIGHT: ORDER SUMMARY ── */}
//           <div className="lg:col-span-1">
//             <div className="bg-white shadow-sm border border-borderLight sticky top-6">
//               <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
//                 <ShoppingBag size={16} className="text-primary" />
//                 <h2 className="font-semibold text-textPrimary">
//                   Order Summary
//                 </h2>
//               </div>

//               {/* ITEMS */}
//               <div className="px-6 py-4 space-y-3 max-h-60 overflow-y-auto border-b border-borderLight">
//                 {items.map((item) => (
//                   <div key={item._id} className="flex gap-3 items-start">
//                     <img
//                       src={item.imageUrl}
//                       alt={item.productName}
//                       className="w-14 h-16 object-cover flex-shrink-0 bg-bgMain"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs font-medium text-textPrimary truncate">
//                         {item.productName}
//                       </p>
//                       {item.size && (
//                         <p className="text-xs text-textMuted">
//                           Size: {item.size}
//                         </p>
//                       )}
//                       <p className="text-xs text-textMuted mt-0.5">
//                         Qty: {item.quantity}
//                       </p>
//                     </div>
//                     <p className="text-xs font-semibold text-textPrimary flex-shrink-0">
//                       ₹{(item.price * item.quantity).toLocaleString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* TOTALS */}
//               <div className="px-6 py-4 space-y-3 text-sm border-b border-borderLight">
//                 <div className="flex justify-between text-textMuted">
//                   <span>Subtotal ({items.length} items)</span>
//                   <span>₹{subtotal.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-textMuted">
//                   <span className="flex items-center gap-1.5">
//                     <Truck size={13} /> Shipping
//                   </span>
//                   <span
//                     className={
//                       shippingCharge === 0 ? "text-green-600 font-medium" : ""
//                     }
//                   >
//                     {shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}
//                   </span>
//                 </div>
//                 {shippingCharge > 0 && (
//                   <p className="text-xs text-textMuted bg-amber-50 px-3 py-2 border border-amber-100">
//                     Add ₹{(999 - subtotal).toLocaleString()} more for free
//                     shipping
//                   </p>
//                 )}
//                 <div className="flex justify-between font-semibold text-textPrimary pt-1 border-t border-borderLight">
//                   <span>Total</span>
//                   <span className="text-lg">
//                     ₹{totalAmount.toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <button
//                   onClick={handlePlaceOrder}
//                   disabled={!items.length || !selectedAddress}
//                   className="w-full py-3.5 text-sm font-medium tracking-wider transition bg-primary text-white hover:bg-primaryHover disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
//                 >
//                   PLACE ORDER
//                 </button>
//                 <p className="text-xs text-textMuted text-center mt-3 flex items-center justify-center gap-2">
//                   <LockKeyhole size={16} /> Secure & encrypted checkout
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  MapPin, Plus, X, Check, ShoppingBag,
  Truck, CreditCard, ChevronRight, LockKeyhole, Loader2,
} from "lucide-react";

import { useGetCartQuery } from "../../features/cart/cartApiSlice";
import { usePlaceOrderMutation } from "../../features/orders/orderApiSlice";
import { useInitiatePaymentMutation } from "../../features/payement/paymentApiSlice";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "../../features/profile/profileApiSlice";
import Container from "../../components/layout/Container";
import { openCart } from "../../features/cart/cartSlice";

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const inputClass = `
  w-full px-4 py-2.5
  border border-borderMedium
  bg-bgMain text-textPrimary
  outline-none focus:border-primary
  transition text-sm
`;
const labelClass = "text-xs text-textMuted font-medium uppercase tracking-wide mb-1 block";
const emptyAddressForm = {
  label: "Home", fullName: "", phone: "",
  line1: "", line2: "", city: "", state: "",
  pincode: "", country: "India", isDefault: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// PayU hidden-form submitter
// Mounts a hidden <form> with all PayU params and auto-submits to PayU's URL.
// PayU requires a real HTML form POST — fetch/axios won't work here.
// ─────────────────────────────────────────────────────────────────────────────
function PayUForm({ payuBaseUrl, payuParams, formRef }) {
  return (
    <form ref={formRef} method="POST" action={payuBaseUrl} style={{ display: "none" }}>
      {Object.entries(payuParams).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value ?? ""} />
      ))}
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const navigate   = useNavigate();
  const { user }   = useSelector((state) => state.auth);
  const id         = user?._id || user?.id;
  const payuFormRef = useRef(null);

  // ── Redirect if not logged in ──────────────────────────────────────────────
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
      dispatch(openCart());
    }
  }, [user]);

  // ── Queries & Mutations ────────────────────────────────────────────────────
  const { data: profileData, isLoading: profileLoading } = useGetUserProfileQuery(id);
  const [updateProfile, { isLoading: isSavingAddress }]  = useUpdateProfileMutation();
  const { data: cartData }                               = useGetCartQuery(undefined, { skip: !user });
  const [placeOrder]                                     = usePlaceOrderMutation();
  const [initiatePayment]                                = useInitiatePaymentMutation();

  // ── Derived state ──────────────────────────────────────────────────────────
  const profile   = profileData?.data;
  const addresses = profile?.addresses || [];
  const items     = cartData?.data?.items || [];
  const subtotal  = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCharge = subtotal >= 999 ? 0 : 99;
  const totalAmount    = subtotal + shippingCharge;

  // ── Local state ────────────────────────────────────────────────────────────
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod]         = useState("COD");
  const [showAddForm, setShowAddForm]             = useState(false);
  const [newAddress, setNewAddress]               = useState(emptyAddressForm);
  const [addressError, setAddressError]           = useState("");
  const [orderError, setOrderError]               = useState("");
  const [isPlacing, setIsPlacing]                 = useState(false);

  // PayU form data — set just before form submit
  const [payuData, setPayuData] = useState(null);

  const defaultAddressId = addresses.find((a) => a.isDefault)?._id || addresses[0]?._id || null;
  const activeAddressId  = selectedAddressId ?? defaultAddressId;
  const selectedAddress  = addresses.find((a) => a._id === activeAddressId) || addresses[0];

  // ── Auto-submit PayU form once payuData is set ─────────────────────────────
  // We set payuData in state, React re-renders with the hidden form,
  // then this effect fires and submits it — clean and reliable.
  useEffect(() => {
    if (payuData && payuFormRef.current) {
      payuFormRef.current.submit();
    }
  }, [payuData]);

  // ── Address form handlers ──────────────────────────────────────────────────
  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewAddress = async () => {
    if (!newAddress.fullName || !newAddress.line1 || !newAddress.city || !newAddress.pincode || !newAddress.phone) {
      setAddressError("Please fill all required fields.");
      return;
    }
    setAddressError("");
    try {
      const updatedAddresses = [...addresses, newAddress];
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("address", JSON.stringify(updatedAddresses));
      const res = await updateProfile({ id, body: formData }).unwrap();
      const saved = res?.data?.addresses;
      if (saved?.length) setSelectedAddressId(saved[saved.length - 1]._id);
      setShowAddForm(false);
      setNewAddress(emptyAddressForm);
    } catch (err) {
      setAddressError(err?.data?.message || "Failed to save address.");
    }
  };

  // ── Place Order ────────────────────────────────────────────────────────────
  const handlePlaceOrder = async () => {
    setOrderError("");

    if (!selectedAddress) {
      setOrderError("Please select or add a shipping address.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsPlacing(true);

    try {
      // ── STEP 1: Create the order (same for both COD and ONLINE) ──
      const orderRes = await placeOrder({
        shippingAddress: selectedAddress,
        paymentMethod,
      }).unwrap();

      const order = orderRes?.data?.order;

      // ── COD: Done — navigate to success ──────────────────────────────────
      if (paymentMethod === "COD") {
        navigate("/order/success", { state: order });
        return;
      }

      // ── ONLINE: Call /payment/initiate with the orderId ───────────────────
      // Backend returns PayU params — we then auto-submit a hidden HTML form
      // to PayU. This is required because PayU needs a browser form POST,
      // not a fetch/XHR request.
      const paymentRes = await initiatePayment({
        orderId: order.orderId,   // ← human-readable: "ORD-2024-000001"
      }).unwrap();

      const { payuBaseUrl, payuParams } = paymentRes?.data;

      // Setting this triggers the useEffect above which submits the form
      setPayuData({ payuBaseUrl, payuParams });

    } catch (err) {
      console.error("handlePlaceOrder error:", err);
      setOrderError(err?.data?.message || "Something went wrong. Please try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      // Don't set isPlacing false for ONLINE — page is navigating away to PayU
      if (paymentMethod === "COD") setIsPlacing(false);
    }
  };

  // ── Empty cart guard ───────────────────────────────────────────────────────
  if (!items.length) {
    return (
      <div className="min-h-screen bg-bgMain flex flex-col items-center justify-center gap-4">
        <ShoppingBag size={48} className="text-borderMedium" />
        <p className="text-textMuted text-sm">Your cart is empty</p>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-2 bg-primary text-white text-sm hover:bg-primaryHover transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-bgMain py-10">
      {/* Hidden PayU form — rendered only when payuData is set, then auto-submitted */}
      {payuData && (
        <PayUForm
          payuBaseUrl={payuData.payuBaseUrl}
          payuParams={payuData.payuParams}
          formRef={payuFormRef}
        />
      )}

      <Container>
        {/* PAGE HEADER */}
        <div className="mb-8">
          <p className="text-textMuted text-xs tracking-[3px] uppercase">Almost there</p>
          <h1
            className="text-3xl sm:text-4xl text-primary mt-1"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Checkout
          </h1>
        </div>

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-textMuted mb-8">
          <span className="text-primary font-medium">Cart</span>
          <ChevronRight size={12} />
          <span className="text-primary font-semibold">Checkout</span>
          <ChevronRight size={12} />
          <span>Confirmation</span>
        </div>

        {/* ERROR BANNER */}
        {orderError && (
          <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm">
            <X size={16} className="flex-shrink-0 mt-0.5" />
            <p>{orderError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT: ADDRESS + PAYMENT ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* SHIPPING ADDRESS */}
            <div className="bg-white shadow-sm border border-borderLight">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">1</div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <h2 className="font-semibold text-textPrimary">Shipping Address</h2>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {profileLoading ? (
                  <div className="flex items-center gap-3 py-4">
                    <Loader2 size={18} className="text-primary animate-spin" />
                    <span className="text-sm text-textMuted">Loading addresses...</span>
                  </div>
                ) : addresses.length === 0 && !showAddForm ? (
                  <div className="flex flex-col items-center py-8 gap-3 text-center">
                    <MapPin size={32} className="text-borderMedium" />
                    <p className="text-textMuted text-sm">No saved addresses yet.</p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center gap-1.5 px-4 py-2 border border-primary text-primary text-sm hover:bg-primary hover:text-white transition"
                    >
                      <Plus size={14} /> Add Address
                    </button>
                  </div>
                ) : (
                  <>
                    {addresses.map((addr) => (
                      <label
                        key={addr._id}
                        className={`flex gap-4 p-4 border cursor-pointer transition ${
                          activeAddressId === addr._id
                            ? "border-primary bg-primary/5"
                            : "border-borderLight hover:border-borderMedium"
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          className="mt-1 accent-primary flex-shrink-0"
                          checked={activeAddressId === addr._id}
                          onChange={() => setSelectedAddressId(addr._id)}
                        />
                        <div className="flex-1 text-sm space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-textPrimary">{addr.fullName}</span>
                            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full">Default</span>
                            )}
                          </div>
                          <p className="text-textMuted">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                          <p className="text-textMuted">{addr.city}, {addr.state} — {addr.pincode}</p>
                          <p className="text-textMuted">{addr.phone}</p>
                        </div>
                        {activeAddressId === addr._id && (
                          <Check size={16} className="text-primary flex-shrink-0 mt-1" />
                        )}
                      </label>
                    ))}

                    {!showAddForm && (
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 text-sm text-primary border border-dashed border-primary w-full py-3 px-4 hover:bg-primary/5 transition mt-2"
                      >
                        <Plus size={15} /> Add a new address
                      </button>
                    )}
                  </>
                )}

                {/* ADD ADDRESS FORM */}
                {showAddForm && (
                  <div className="border border-borderLight bg-bgMain p-5 mt-3 space-y-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-textPrimary">New Address</p>
                      <button onClick={() => { setShowAddForm(false); setAddressError(""); }}>
                        <X size={16} className="text-textMuted hover:text-textPrimary" />
                      </button>
                    </div>

                    {addressError && (
                      <p className="text-xs text-red-500 bg-red-50 px-3 py-2">{addressError}</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Label</label>
                        <select name="label" value={newAddress.label} onChange={handleNewAddressChange} className={inputClass}>
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input name="fullName" value={newAddress.fullName} onChange={handleNewAddressChange} placeholder="Recipient name" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Phone *</label>
                        <input name="phone" value={newAddress.phone} onChange={handleNewAddressChange} placeholder="10-digit number" className={inputClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Address Line 1 *</label>
                        <input name="line1" value={newAddress.line1} onChange={handleNewAddressChange} placeholder="House No, Building, Street" className={inputClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Address Line 2 <span className="normal-case text-textMuted">(optional)</span></label>
                        <input name="line2" value={newAddress.line2} onChange={handleNewAddressChange} placeholder="Area, Locality, Landmark" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>City *</label>
                        <input name="city" value={newAddress.city} onChange={handleNewAddressChange} placeholder="City" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>State</label>
                        <input name="state" value={newAddress.state} onChange={handleNewAddressChange} placeholder="State" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Pincode *</label>
                        <input name="pincode" value={newAddress.pincode} onChange={handleNewAddressChange} placeholder="Pincode" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Country</label>
                        <input name="country" value={newAddress.country} onChange={handleNewAddressChange} className={inputClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-textPrimary">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress((p) => ({ ...p, isDefault: e.target.checked }))}
                            className="accent-primary w-4 h-4"
                          />
                          Set as default address
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-1">
                      <button
                        onClick={() => { setShowAddForm(false); setAddressError(""); }}
                        className="px-5 py-2 border border-borderMedium text-textMuted text-sm hover:text-textPrimary transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveNewAddress}
                        disabled={isSavingAddress}
                        className="px-5 py-2 bg-primary text-white text-sm hover:bg-primaryHover transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSavingAddress ? "Saving..." : "Save Address"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white shadow-sm border border-borderLight">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">2</div>
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-primary" />
                  <h2 className="font-semibold text-textPrimary">Payment Method</h2>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {[
                  { value: "COD",    label: "Cash on Delivery",  desc: "Pay when your order arrives" },
                  { value: "ONLINE", label: "Online Payment",    desc: "UPI, Cards, Net Banking via PayU" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex gap-4 p-4 border cursor-pointer transition ${
                      paymentMethod === opt.value
                        ? "border-primary bg-primary/5"
                        : "border-borderLight hover:border-borderMedium"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={paymentMethod === opt.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 accent-primary flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-textPrimary">{opt.label}</p>
                      <p className="text-xs text-textMuted mt-0.5">{opt.desc}</p>
                    </div>
                    {paymentMethod === opt.value && (
                      <Check size={16} className="text-primary ml-auto flex-shrink-0 mt-1" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: ORDER SUMMARY ─────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm border border-borderLight sticky top-6">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-borderLight">
                <ShoppingBag size={16} className="text-primary" />
                <h2 className="font-semibold text-textPrimary">Order Summary</h2>
              </div>

              {/* ITEMS LIST */}
              <div className="px-6 py-4 space-y-3 max-h-60 overflow-y-auto border-b border-borderLight">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3 items-start">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-14 h-16 object-cover flex-shrink-0 bg-bgMain"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-textPrimary truncate">{item.productName}</p>
                      {item.size && <p className="text-xs text-textMuted">Size: {item.size}</p>}
                      <p className="text-xs text-textMuted mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-semibold text-textPrimary flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTALS */}
              <div className="px-6 py-4 space-y-3 text-sm border-b border-borderLight">
                <div className="flex justify-between text-textMuted">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-textMuted">
                  <span className="flex items-center gap-1.5"><Truck size={13} /> Shipping</span>
                  <span className={shippingCharge === 0 ? "text-green-600 font-medium" : ""}>
                    {shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}
                  </span>
                </div>
                {shippingCharge > 0 && (
                  <p className="text-xs text-textMuted bg-amber-50 px-3 py-2 border border-amber-100">
                    Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="flex justify-between font-semibold text-textPrimary pt-1 border-t border-borderLight">
                  <span>Total</span>
                  <span className="text-lg">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing || !items.length || !selectedAddress}
                  className="w-full py-3.5 text-sm font-medium tracking-wider transition bg-primary text-white hover:bg-primaryHover disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPlacing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {paymentMethod === "ONLINE" ? "Redirecting to PayU..." : "Placing Order..."}
                    </>
                  ) : (
                    paymentMethod === "ONLINE" ? "PROCEED TO PAYMENT" : "PLACE ORDER"
                  )}
                </button>
                <p className="text-xs text-textMuted text-center mt-3 flex items-center justify-center gap-2">
                  <LockKeyhole size={16} /> Secure & encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}