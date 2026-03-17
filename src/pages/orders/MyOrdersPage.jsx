import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Package, ChevronDown, ChevronUp, X, RotateCcw,
  ShoppingBag, MapPin, CreditCard, Truck
} from "lucide-react";

import {
  useGetMyOrdersQuery,
  useGetMyOrderByIdMutation,
  useCancelOrderMutation,
  useRequestReturnMutation,
} from "../../features/orders/orderApiSlice";
import Container from "../../components/layout/Container";

const STATUS_STYLES = {
  pending:    "bg-amber-50 text-amber-600 border-amber-200",
  confirmed:  "bg-blue-50 text-blue-600 border-blue-200",
  processing: "bg-purple-50 text-purple-600 border-purple-200",
  shipped:    "bg-indigo-50 text-indigo-600 border-indigo-200",
  delivered:  "bg-green-50 text-green-600 border-green-200",
  cancelled:  "bg-red-50 text-red-500 border-red-200",
  returned:   "bg-gray-50 text-gray-500 border-gray-200",
};

const PAYMENT_STATUS_STYLES = {
  pending: "text-amber-600",
  paid:    "text-green-600",
  failed:  "text-red-500",
  refunded:"text-blue-600",
};

const FILTERS = ["All", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"];

const labelClass = "text-xs text-textMuted font-medium uppercase tracking-wide mb-1 block";

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const id = user?._id || user?.id;

  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});   // { [orderId]: detailData }
  const [loadingDetail, setLoadingDetail] = useState(null);

  // cancel / return modal state
  const [modal, setModal] = useState(null); // { type: "cancel"|"return", orderId, _id }
  const [reason, setReason] = useState("");
  const [actionError, setActionError] = useState("");

  const { data, isLoading, isFetching } = useGetMyOrdersQuery({
    status: statusFilter === "All" ? undefined : statusFilter,
  });

  const [getOrderById]   = useGetMyOrderByIdMutation();
  const [cancelOrder,  { isLoading: isCancelling }]  = useCancelOrderMutation();
  const [requestReturn,{ isLoading: isReturning  }]  = useRequestReturnMutation();

  const orders = data?.data?.orders || [];

  // ── EXPAND / FETCH DETAIL ──
  const handleToggle = async (order) => {
    const oid = order._id;
    if (expandedOrderId === oid) {
      setExpandedOrderId(null);
      return;
    }
    setExpandedOrderId(oid);
    if (orderDetails[oid]) return; // already fetched

    try {
      setLoadingDetail(oid);
      const res = await getOrderById({ id, orderId: oid }).unwrap();
      setOrderDetails((prev) => ({ ...prev, [oid]: res.data?.order || res.data }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetail(null);
    }
  };

  // ── CANCEL ──
  const handleCancel = async () => {
    if (!reason.trim()) { setActionError("Please provide a reason."); return; }
    setActionError("");
    try {
      await cancelOrder({ id, orderId: modal._id, cancellationReason: reason }).unwrap();
      setModal(null);
      setReason("");
      // refresh detail cache
      setOrderDetails((prev) => { const n = { ...prev }; delete n[modal._id]; return n; });
    } catch (err) {
      setActionError(err?.data?.message || "Failed to cancel order.");
    }
  };

  // ── RETURN ──
  const handleReturn = async () => {
    if (!reason.trim()) { setActionError("Please provide a reason."); return; }
    setActionError("");
    try {
      await requestReturn({ id, orderId: modal._id, returnReason: reason }).unwrap();
      setModal(null);
      setReason("");
      setOrderDetails((prev) => { const n = { ...prev }; delete n[modal._id]; return n; });
    } catch (err) {
      setActionError(err?.data?.message || "Failed to request return.");
    }
  };

  const openModal = (type, order) => {
    setReason("");
    setActionError("");
    setModal({ type, _id: order._id });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bgMain flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-textMuted text-sm">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgMain py-10">
      <Container>

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-textMuted text-xs tracking-[3px] uppercase">Account</p>
          <h1
            className="text-3xl sm:text-4xl text-primary mt-1"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            My Orders
          </h1>
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-2 flex-wrap mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-1.5 text-xs border transition capitalize ${
                statusFilter === f
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-textMuted border-borderLight hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!isFetching && orders.length === 0 && (
          <div className="flex flex-col items-center py-20 gap-4 text-center">
            <ShoppingBag size={48} className="text-borderMedium" />
            <p className="text-textMuted text-sm">No orders found.</p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2 bg-primary text-white text-sm hover:bg-primaryHover transition"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* ORDER LIST */}
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order._id;
            const detail = orderDetails[order._id];
            const isLoadingThis = loadingDetail === order._id;
            const canCancel = ["pending", "confirmed"].includes(order.status);
            const canReturn = order.status === "delivered";

            return (
              <div key={order._id} className="bg-white border border-borderLight shadow-sm">

                {/* ORDER HEADER ROW */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 cursor-pointer hover:bg-bgMain transition"
                  onClick={() => handleToggle(order)}
                >
                  {/* LEFT */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Package size={15} className="text-primary flex-shrink-0" />
                      <span className="text-xs font-mono text-textMuted">#{order._id?.slice(-8).toUpperCase()}</span>
                      <span className={`text-xs px-2.5 py-0.5 border rounded-full capitalize font-medium ${STATUS_STYLES[order.status] || "bg-gray-50 text-gray-500 border-gray-200"}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-textMuted pl-[23px]">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                      {" · "}{order.items?.length} item{order.items?.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4 pl-[23px] sm:pl-0">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-textPrimary">₹{order.totalAmount?.toLocaleString()}</p>
                      <p className={`text-xs capitalize ${PAYMENT_STATUS_STYLES[order.paymentStatus] || "text-textMuted"}`}>
                        {order.paymentMethod} · {order.paymentStatus}
                      </p>
                    </div>
                    {isExpanded ? <ChevronUp size={16} className="text-textMuted flex-shrink-0" /> : <ChevronDown size={16} className="text-textMuted flex-shrink-0" />}
                  </div>
                </div>

                {/* EXPANDED DETAIL */}
                {isExpanded && (
                  <div className="border-t border-borderLight">

                    {isLoadingThis ? (
                      <div className="flex items-center gap-3 px-5 py-6">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-textMuted">Loading details...</span>
                      </div>
                    ) : detail ? (
                      <div className="p-5 space-y-5">

                        {/* ITEMS */}
                        <div>
                          <p className={labelClass}>Items</p>
                          <div className="space-y-3 mt-2">
                            {detail.items?.map((item) => (
                              <div key={item._id} className="flex gap-4 items-start">
                                {item.imageUrl && (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="w-14 h-18 object-cover flex-shrink-0 bg-bgMain border border-borderLight"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-textPrimary truncate">{item.productName}</p>
                                  <div className="flex gap-3 flex-wrap mt-0.5">
                                    {item.size && <p className="text-xs text-textMuted">Size: {item.size}</p>}
                                    {item.colour && <p className="text-xs text-textMuted">Colour: {item.colour}</p>}
                                    <p className="text-xs text-textMuted">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-xs text-textMuted mt-0.5">
                                    ₹{item.unitPrice} × {item.quantity} = <span className="font-medium text-textPrimary">₹{item.totalPrice?.toLocaleString()}</span>
                                  </p>
                                </div>
                                <span className={`text-xs px-2 py-0.5 border rounded-full capitalize flex-shrink-0 ${STATUS_STYLES[item.itemStatus] || "bg-gray-50 text-gray-400 border-gray-200"}`}>
                                  {item.itemStatus}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* BOTTOM GRID: address + payment + totals */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-borderLight">

                          {/* SHIPPING */}
                          <div>
                            <p className={labelClass + " flex items-center gap-1"}><MapPin size={11} /> Shipping Address</p>
                            <div className="text-xs text-textMuted space-y-0.5">
                              <p className="font-medium text-textPrimary">{detail.shippingAddress?.fullName}</p>
                              <p>{detail.shippingAddress?.line1}</p>
                              {detail.shippingAddress?.line2 && <p>{detail.shippingAddress.line2}</p>}
                              <p>{detail.shippingAddress?.city}, {detail.shippingAddress?.state} — {detail.shippingAddress?.pincode}</p>
                              <p>{detail.shippingAddress?.phone}</p>
                            </div>
                          </div>

                          {/* PAYMENT */}
                          <div>
                            <p className={labelClass + " flex items-center gap-1"}><CreditCard size={11} /> Payment</p>
                            <div className="text-xs space-y-1">
                              <p className="text-textPrimary font-medium capitalize">{detail.paymentMethod === "COD" ? "Cash on Delivery" : "Online"}</p>
                              <p className={`capitalize font-medium ${PAYMENT_STATUS_STYLES[detail.paymentStatus]}`}>{detail.paymentStatus}</p>
                            </div>
                          </div>

                          {/* TOTALS */}
                          <div>
                            <p className={labelClass + " flex items-center gap-1"}><Truck size={11} /> Order Total</p>
                            <div className="text-xs space-y-1 text-textMuted">
                              <div className="flex justify-between"><span>Subtotal</span><span>₹{detail.subtotal?.toLocaleString()}</span></div>
                              <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className={detail.shippingCharge === 0 ? "text-green-600" : ""}>
                                  {detail.shippingCharge === 0 ? "Free" : `₹${detail.shippingCharge}`}
                                </span>
                              </div>
                              <div className="flex justify-between font-semibold text-textPrimary pt-1 border-t border-borderLight">
                                <span>Total</span><span>₹{detail.totalAmount?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* ACTIONS */}
                        {(canCancel || canReturn) && (
                          <div className="flex gap-3 pt-2 border-t border-borderLight flex-wrap">
                            {canCancel && (
                              <button
                                onClick={() => openModal("cancel", order)}
                                className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-500 text-xs hover:bg-red-50 transition"
                              >
                                <X size={13} /> Cancel Order
                              </button>
                            )}
                            {canReturn && (
                              <button
                                onClick={() => openModal("return", order)}
                                className="flex items-center gap-1.5 px-4 py-2 border border-borderMedium text-textMuted text-xs hover:border-primary hover:text-primary transition"
                              >
                                <RotateCcw size={13} /> Request Return
                              </button>
                            )}
                          </div>
                        )}

                      </div>
                    ) : (
                      // fallback: show items from list response
                      <div className="px-5 py-4 space-y-2">
                        {order.items?.map((item, i) => (
                          <div key={i} className="flex gap-3 text-sm items-center">
                            {item.imageUrl && (
                              <img src={item.imageUrl} alt={item.productName} className="w-10 h-12 object-cover flex-shrink-0" />
                            )}
                            <div>
                              <p className="text-textPrimary font-medium text-xs">{item.productName}</p>
                              <p className="text-textMuted text-xs">Qty: {item.quantity} · ₹{item.totalPrice?.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </Container>

      {/* CANCEL / RETURN MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md shadow-xl">

            <div className="flex items-center justify-between px-6 py-4 border-b border-borderLight">
              <h3 className="font-semibold text-textPrimary">
                {modal.type === "cancel" ? "Cancel Order" : "Request Return"}
              </h3>
              <button onClick={() => setModal(null)}>
                <X size={16} className="text-textMuted hover:text-textPrimary" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <p className="text-sm text-textMuted">
                {modal.type === "cancel"
                  ? "Please tell us why you'd like to cancel this order."
                  : "Please tell us why you'd like to return this order."}
              </p>

              {actionError && (
                <p className="text-xs text-red-500 bg-red-50 px-3 py-2 border border-red-100">{actionError}</p>
              )}

              <div>
                <label className={labelClass}>Reason *</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your reason..."
                  className="w-full px-4 py-2.5 border border-borderMedium bg-bgMain text-textPrimary outline-none focus:border-primary transition text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-1">
                <button
                  onClick={() => setModal(null)}
                  className="px-5 py-2 border border-borderMedium text-textMuted text-sm hover:text-textPrimary transition"
                >
                  Go Back
                </button>
                <button
                  onClick={modal.type === "cancel" ? handleCancel : handleReturn}
                  disabled={isCancelling || isReturning}
                  className={`px-5 py-2 text-white text-sm transition disabled:opacity-60 disabled:cursor-not-allowed ${
                    modal.type === "cancel" ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primaryHover"
                  }`}
                >
                  {isCancelling || isReturning
                    ? "Submitting..."
                    : modal.type === "cancel" ? "Confirm Cancel" : "Submit Return"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}