// import { useSelector } from "react-redux";
// import { useState, useEffect, useRef } from "react";
// import {
//   useGetUserProfileQuery,
//   useUpdateProfileMutation,
// } from "../../features/profile/profileApiSlice";
// import Container from "../../components/layout/Container";
// import { Camera, Pencil, X, Check, User, Mail, Phone, Calendar, Venus, MapPin } from "lucide-react";

// const ProfilePage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const id = user?._id || user?.id;

//   const { data, isLoading } = useGetUserProfileQuery(id);
//   const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
//   const [imageFile, setImageFile] = useState(null);

//   const profile = data?.data;
//   const [editing, setEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState("personal");
//   const [serverError, setServerError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // add this ref at the top of the component
// const fileInputRef = useRef(null);

// // add this handler
// // replace handleImageUpload — just preview, no API call yet
// const handleImageUpload = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;
//   setImageFile(file); // store file for later
//   const preview = URL.createObjectURL(file);
//   setForm((prev) => ({ ...prev, profileImage: preview })); // just for preview
// };

//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     gender: "",
//     dateOfBirth: "",
//     profileImage: "",
//     // form state — replace address object
// address: {
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
// },
//   });

//   useEffect(() => {
//     if (profile) {
//       setForm({
//         name: profile.name || "",
//         username: profile.username || "",
//         gender: profile.gender || "",
//         dateOfBirth: profile.dateOfBirth
//           ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
//           : "",
//         profileImage: profile.profileImage || "",
//         // useEffect — replace address mapping
// address: {
//   label: profile.addresses?.[0]?.label || "Home",
//   fullName: profile.addresses?.[0]?.fullName || "",
//   phone: profile.addresses?.[0]?.phone || "",
//   line1: profile.addresses?.[0]?.line1 || "",
//   line2: profile.addresses?.[0]?.line2 || "",
//   city: profile.addresses?.[0]?.city || "",
//   state: profile.addresses?.[0]?.state || "",
//   pincode: profile.addresses?.[0]?.pincode || "",
//   country: profile.addresses?.[0]?.country || "India",
//   isDefault: profile.addresses?.[0]?.isDefault || false,
// },
//       });
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("address.")) {
//       const key = name.split(".")[1];
//       setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

// const handleSave = async () => {
//   setServerError("");
//   setSuccessMsg("");

//   try {

//     const formData = new FormData();

//     formData.append("name", form.name);
//     formData.append("username", form.username);
//     formData.append("gender", form.gender);
//     formData.append("dateOfBirth", form.dateOfBirth);

//     formData.append("address", JSON.stringify([form.address]));

//     if (imageFile) {
//       formData.append("profileImage", imageFile);
//     }

//     await updateProfile({
//       id,
//       body: formData,
//     }).unwrap();

//     setSuccessMsg("Profile updated successfully!");
//     setImageFile(null);
//     setEditing(false);

//     setTimeout(() => setSuccessMsg(""), 3000);

//   } catch (err) {
//     setServerError(err?.data?.message || "Update failed");
//   }
// };

//   const handleCancel = () => {
//     setEditing(false);
//   setImageFile(null);
//   setServerError("");
//     if (profile) {
//       setForm({
//         name: profile.name || "",
//         username: profile.username || "",
//         gender: profile.gender || "",
//         dateOfBirth: profile.dateOfBirth
//           ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
//           : "",
//         profileImage: profile.profileImage || "",
//         // handleCancel — same reset
// address: {
//   label: profile.addresses?.[0]?.label || "Home",
//   fullName: profile.addresses?.[0]?.fullName || "",
//   phone: profile.addresses?.[0]?.phone || "",
//   line1: profile.addresses?.[0]?.line1 || "",
//   line2: profile.addresses?.[0]?.line2 || "",
//   city: profile.addresses?.[0]?.city || "",
//   state: profile.addresses?.[0]?.state || "",
//   pincode: profile.addresses?.[0]?.pincode || "",
//   country: profile.addresses?.[0]?.country || "India",
//   isDefault: profile.addresses?.[0]?.isDefault || false,
// },
//       });
//     }
//   };

//   useEffect(() => {
//   return () => {
//     if (form.profileImage?.startsWith("blob:")) {
//       URL.revokeObjectURL(form.profileImage);
//     }
//   };
// }, [form.profileImage]);

//   const inputClass = `
//     w-full px-4 py-2.5 rounded-lg
//     border border-borderMedium
//     bg-bgMain text-textPrimary
//     outline-none focus:border-primary
//     transition text-sm
//     disabled:opacity-50 disabled:cursor-not-allowed
//   `;

//   const labelClass = "text-xs text-textMuted font-medium uppercase tracking-wide mb-1 block";

//   if (isLoading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
//           <p className="text-textMuted text-sm">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   const tabs = [
//     { id: "personal", label: "Personal Info", icon: <User size={15} /> },
//     { id: "address", label: "Address", icon: <MapPin size={15} /> },
//   ];

//   return (
//     <div className="min-h-screen bg-bgMain py-10">
//       <Container>

//         {/* PAGE HEADER */}
//         <div className="mb-8">
//           <p className="text-textMuted text-sm tracking-[3px] uppercase">Account</p>
//           <h1
//             className="text-4xl text-primary mt-1"
//             style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
//           >
//             My Profile
//           </h1>
//         </div>

//         {/* SUCCESS / ERROR BANNERS */}
//         {successMsg && (
//           <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
//             <Check size={16} /> {successMsg}
//           </div>
//         )}
//         {serverError && (
//           <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
//             {serverError}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

//           {/* ── LEFT SIDEBAR ── */}
//           <div className="lg:col-span-1 flex flex-col gap-4">

//             {/* AVATAR CARD */}
//             <div
//               className="rounded-2xl border border-borderLight bg-white p-6 flex flex-col items-center gap-3"
//               style={{ boxShadow: "var(--shadow-soft)" }}
//             >
//               {/* AVATAR — replace the existing avatar div */}
// <div className="relative">
//   {form.profileImage ? (
//     <img
//       src={form.profileImage}
//       alt="Profile"
//       className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
//     />
//   ) : (
//     <div
//       className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-semibold"
//       style={{ backgroundColor: "var(--color-primary)" }}
//     >
//       {profile?.name?.charAt(0).toUpperCase()}
//     </div>
//   )}

//   {/* CAMERA BUTTON */}
//   {editing && (
//     <>
//       <button
//         onClick={() => fileInputRef.current.click()}
//         className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow hover:bg-primaryHover transition"
//       >
//         <Camera size={14} />
//       </button>
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleImageUpload}
//       />
//     </>
//   )}
// </div>

//               <div className="text-center">
//                 <p className="font-semibold text-textPrimary">{profile?.name}</p>
//                 <p className="text-xs text-textMuted">@{profile?.username}</p>
//               </div>

//               {/* <div
//                 className="w-auto text-center px-4 py-2 rounded-full text-xs font-medium"
//                 style={{ backgroundColor: "var(--color-primary)", color: "white", opacity: 0.85 }}
//               >
//                 {profile?.isVerified ? "✓ Verified" : "Not Verified"}
//               </div> */}

//               <p className="text-xs text-textMuted text-center">
//                 Member since{" "}
//                 {new Date(profile?.createdAt).toLocaleDateString("en-IN", {
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>
//               {/* EDIT / SAVE / CANCEL */}
//                 <div className="flex gap-2 pb-1 ">
//                   {!editing ? (
//                     <button
//                       onClick={() => setEditing(true)}
//                       className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition"
//                     >
//                       <Pencil size={13} /> Edit
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         onClick={handleCancel}
//                         className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm border border-borderMedium text-textMuted hover:text-textPrimary transition"
//                       >
//                         <X size={13} /> Cancel
//                       </button>
//                       <button
//                         onClick={handleSave}
//                         disabled={isSaving}
//                         className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm bg-primary text-white hover:bg-primaryHover transition disabled:opacity-60 disabled:cursor-not-allowed"
//                       >
//                         <Check size={13} />
//                         {isSaving ? "Saving..." : "Save"}
//                       </button>
//                     </>
//                   )}
//                 </div>
//             </div>

//             {/* QUICK INFO */}
//             <div
//               className="rounded-2xl border border-borderLight bg-white p-5 flex flex-col gap-3"
//               style={{ boxShadow: "var(--shadow-soft)" }}
//             >
//               {[
//                 { icon: <Mail size={14} />, value: profile?.email },
//                 { icon: <Phone size={14} />, value: profile?.phone || "Not set" },
//                 {
//                   icon: <Calendar size={14} />,
//                   value: profile?.dateOfBirth
//                     ? new Date(profile.dateOfBirth).toLocaleDateString("en-IN")
//                     : "Not set",
//                 },
//                 {
//                   icon: <Venus size={14} />,
//                   value: profile?.gender
//                     ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
//                     : "Not set",
//                 },
//               ].map((item, i) => (
//                 <div key={i} className="flex items-center gap-3 text-sm text-textSecondary">
//                   <span className="text-primary flex-shrink-0">{item.icon}</span>
//                   <span className="truncate">{item.value}</span>
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* ── RIGHT MAIN PANEL ── */}
//           <div className="lg:col-span-3">
//             <div
//               className="rounded-2xl border border-borderLight bg-white"
//               style={{ boxShadow: "var(--shadow-soft)" }}
//             >

//               {/* TAB BAR + EDIT BUTTON */}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:px-6 pt-5 border-b border-borderLight">
//                 <div className="flex gap-1">
//                   {tabs.map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition border-b-2 -mb-px ${
//                         activeTab === tab.id
//                           ? "border-primary text-primary"
//                           : "border-transparent text-textMuted hover:text-textPrimary"
//                       }`}
//                     >
//                       {tab.icon}
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>

                
//               </div>

//               {/* TAB CONTENT */}
//               <div className="p-6">

//                 {/* ── PERSONAL INFO TAB ── */}
//                 {activeTab === "personal" && (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

//                     {/* NAME */}
//                     <div>
//                       <label className={labelClass}>Full Name</label>
//                       {editing ? (
//                         <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
//                       ) : (
//                         <p className="text-textPrimary font-medium py-2.5">{profile?.name || "—"}</p>
//                       )}
//                     </div>

//                     {/* USERNAME */}
//                     <div>
//                       <label className={labelClass}>Username</label>
//                       {editing ? (
//                         <input name="username" value={form.username} onChange={handleChange} className={inputClass} />
//                       ) : (
//                         <p className="text-textPrimary font-medium py-2.5">@{profile?.username || "—"}</p>
//                       )}
//                     </div>

//                     {/* EMAIL — read only */}
//                     <div>
//                       <label className={labelClass}>Email</label>
//                       <p className="text-textPrimary font-medium py-2.5 flex items-center gap-2">
//                         {profile?.email}
//                         <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Verified</span>
//                       </p>
//                     </div>

//                     {/* PHONE — read only */}
//                     <div>
//                       <label className={labelClass}>Phone</label>
//                       <p className="text-textPrimary font-medium py-2.5">{profile?.phone || "—"}</p>
//                     </div>

//                     {/* GENDER */}
//                     <div>
//                       <label className={labelClass}>Gender</label>
//                       {editing ? (
//                         <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
//                           <option value="">Select gender</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                           <option value="prefer_not_to_say">Prefer not to say</option>
//                         </select>
//                       ) : (
//                         <p className="text-textPrimary font-medium py-2.5 capitalize">
//                           {profile?.gender?.replace("_", " ") || "—"}
//                         </p>
//                       )}
//                     </div>

//                     {/* DATE OF BIRTH */}
//                     <div>
//                       <label className={labelClass}>Date of Birth</label>
//                       {editing ? (
//                         <input
//                           type="date"
//                           name="dateOfBirth"
//                           value={form.dateOfBirth}
//                           onChange={handleChange}
//                           className={inputClass}
//                         />
//                       ) : (
//                         <p className="text-textPrimary font-medium py-2.5">
//                           {profile?.dateOfBirth
//                             ? new Date(profile.dateOfBirth).toLocaleDateString("en-IN", {
//                                 day: "numeric", month: "long", year: "numeric",
//                               })
//                             : "—"}
//                         </p>
//                       )}
//                     </div>

//                   </div>
//                 )}

//                 {/* ── ADDRESS TAB ── */}
//                 {activeTab === "address" && (
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

//     {/* LABEL */}
//     <div>
//       <label className={labelClass}>Label</label>
//       {editing ? (
//         <select name="address.label" value={form.address.label} onChange={handleChange} className={inputClass}>
//           <option value="Home">Home</option>
//           <option value="Work">Work</option>
//           <option value="Other">Other</option>
//         </select>
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.label || "—"}</p>
//       )}
//     </div>

//     {/* IS DEFAULT */}
//     <div className="flex items-center gap-3 pt-6">
//       {editing ? (
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={form.address.isDefault}
//             onChange={(e) =>
//               setForm((prev) => ({ ...prev, address: { ...prev.address, isDefault: e.target.checked } }))
//             }
//             className="accent-primary w-4 h-4"
//           />
//           <span className="text-sm text-textPrimary">Set as default address</span>
//         </label>
//       ) : (
//         profile?.addresses?.[0]?.isDefault && (
//           <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
//             ✓ Default Address
//           </span>
//         )
//       )}
//     </div>

//     {/* FULL NAME */}
//     <div>
//       <label className={labelClass}>Full Name</label>
//       {editing ? (
//         <input name="address.fullName" value={form.address.fullName} onChange={handleChange} placeholder="Recipient full name" className={inputClass} />
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.fullName || "—"}</p>
//       )}
//     </div>

//     {/* PHONE */}
//     <div>
//       <label className={labelClass}>Phone</label>
//       {editing ? (
//         <input name="address.phone" value={form.address.phone} onChange={handleChange} placeholder="Contact number" className={inputClass} />
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.phone || "—"}</p>
//       )}
//     </div>

//     {/* LINE 1 */}
//     <div className="sm:col-span-2">
//       <label className={labelClass}>Address Line 1</label>
//       {editing ? (
//         <input name="address.line1" value={form.address.line1} onChange={handleChange} placeholder="House No, Building, Street" className={inputClass} />
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.line1 || "—"}</p>
//       )}
//     </div>

//     {/* LINE 2 */}
//     <div className="sm:col-span-2">
//       <label className={labelClass}>Address Line 2 <span className="normal-case text-textMuted">(optional)</span></label>
//       {editing ? (
//         <input name="address.line2" value={form.address.line2} onChange={handleChange} placeholder="Area, Locality, Landmark" className={inputClass} />
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.line2 || "—"}</p>
//       )}
//     </div>

//     {/* CITY */}
//     <div>
//       <label className={labelClass}>City</label>
//       {editing ? (
//         <input name="address.city" value={form.address.city} onChange={handleChange} placeholder="City" className={inputClass} />
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.city || "—"}</p>
//       )}
//     </div>

//     {/* STATE */}
//     <div>
//       <label className={labelClass}>State</label>
//       {editing ? (
//         <input name="address.state" value={form.address.state} onChange={handleChange} placeholder="State" className={inputClass} />
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.state || "—"}</p>
//       )}
//     </div>

//     {/* PINCODE */}
//     <div>
//       <label className={labelClass}>Pincode</label>
//       {editing ? (
//         <input name="address.pincode" value={form.address.pincode} onChange={handleChange} placeholder="Pincode" className={inputClass} />
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.pincode || "—"}</p>
//       )}
//     </div>

//     {/* COUNTRY */}
//     <div>
//       <label className={labelClass}>Country</label>
//       {editing ? (
//         <input name="address.country" value={form.address.country} onChange={handleChange} placeholder="Country" className={inputClass} />
//       ) : (
//         <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.country || "India"}</p>
//       )}
//     </div>

//     {/* EMPTY STATE */}
//     {!editing && !profile?.addresses?.[0]?.line1 && (
//       <div className="sm:col-span-2 flex flex-col items-center py-10 text-center gap-3">
//         <MapPin size={32} className="text-borderMedium" />
//         <p className="text-textMuted text-sm">No address added yet.</p>
//         <button
//           onClick={() => setEditing(true)}
//           className="px-4 py-1.5 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition"
//         >
//           Add Address
//         </button>
//       </div>
//     )}

//   </div>
// )}

//               </div>
//             </div>
//           </div>

//         </div>
//       </Container>
//     </div>
//   );
// };

// export default ProfilePage;



import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "../../features/profile/profileApiSlice";
import Container from "../../components/layout/Container";
import { Pencil, X, Check, User, Mail, Phone, Calendar, Venus, MapPin } from "lucide-react";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const id = user?._id || user?.id;

  const { data, isLoading } = useGetUserProfileQuery(id);
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const profile = data?.data;
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    gender: "",
    dateOfBirth: "",
    address: {
      label: "Home",
      fullName: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        username: profile.username || "",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
          : "",
        address: {
          label: profile.addresses?.[0]?.label || "Home",
          fullName: profile.addresses?.[0]?.fullName || "",
          phone: profile.addresses?.[0]?.phone || "",
          line1: profile.addresses?.[0]?.line1 || "",
          line2: profile.addresses?.[0]?.line2 || "",
          city: profile.addresses?.[0]?.city || "",
          state: profile.addresses?.[0]?.state || "",
          pincode: profile.addresses?.[0]?.pincode || "",
          country: profile.addresses?.[0]?.country || "India",
          isDefault: profile.addresses?.[0]?.isDefault || false,
        },
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setServerError("");
    setSuccessMsg("");

    try {
      await updateProfile({
        id,
        body: {
          name: form.name,
          gender: form.gender,
          dateOfBirth: form.dateOfBirth,
          address: [form.address],
        },
      }).unwrap();

      setSuccessMsg("Profile updated successfully!");
      setEditing(false);

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setServerError(err?.data?.message || "Update failed");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setServerError("");

    if (profile) {
      setForm({
        name: profile.name || "",
        username: profile.username || "",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
          : "",
        address: {
          label: profile.addresses?.[0]?.label || "Home",
          fullName: profile.addresses?.[0]?.fullName || "",
          phone: profile.addresses?.[0]?.phone || "",
          line1: profile.addresses?.[0]?.line1 || "",
          line2: profile.addresses?.[0]?.line2 || "",
          city: profile.addresses?.[0]?.city || "",
          state: profile.addresses?.[0]?.state || "",
          pincode: profile.addresses?.[0]?.pincode || "",
          country: profile.addresses?.[0]?.country || "India",
          isDefault: profile.addresses?.[0]?.isDefault || false,
        },
      });
    }
  };

  const inputClass = `
    w-full px-4 py-2.5 rounded-lg
    border border-borderMedium
    bg-bgMain text-textPrimary
    outline-none focus:border-primary
    transition text-sm
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const labelClass =
    "text-xs text-textMuted font-medium uppercase tracking-wide mb-1 block";

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-textMuted text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal Info", icon: <User size={15} /> },
    { id: "address", label: "Address", icon: <MapPin size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-bgMain py-10">
      <Container>
        <div className="mb-8">
          <p className="text-textMuted text-sm tracking-[3px] uppercase">
            Account
          </p>
          <h1
            className="text-4xl text-primary mt-1"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            My Profile
          </h1>
        </div>

        {successMsg && (
          <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
            <Check size={16} /> {successMsg}
          </div>
        )}

        {serverError && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT SIDEBAR */}

          <div className="lg:col-span-1 flex flex-col gap-4">

            <div
              className="rounded-2xl border border-borderLight bg-white p-6 flex flex-col items-center gap-3"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="relative">
                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                ) : (
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-semibold"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {profile?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="font-semibold text-textPrimary">{profile?.name}</p>
                <p className="text-xs text-textMuted">@{profile?.username}</p>
              </div>

              <p className="text-xs text-textMuted text-center">
                Member since{" "}
                {new Date(profile?.createdAt).toLocaleDateString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="flex gap-2 pb-1">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm border border-borderMedium text-textMuted hover:text-textPrimary transition"
                    >
                      <X size={13} /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm bg-primary text-white hover:bg-primaryHover transition disabled:opacity-60"
                    >
                      <Check size={13} />
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* QUICK INFO */}

            <div
              className="rounded-2xl border border-borderLight bg-white p-5 flex flex-col gap-3"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {[
                { icon: <Mail size={14} />, value: profile?.email },
                { icon: <Phone size={14} />, value: profile?.phone || "Not set" },
                {
                  icon: <Calendar size={14} />,
                  value: profile?.dateOfBirth
                    ? new Date(profile.dateOfBirth).toLocaleDateString("en-IN")
                    : "Not set",
                },
                {
                  icon: <Venus size={14} />,
                  value: profile?.gender
                    ? profile.gender.charAt(0).toUpperCase() +
                      profile.gender.slice(1)
                    : "Not set",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-textSecondary"
                >
                  <span className="text-primary flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.value}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT MAIN PANEL ── */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl border border-borderLight bg-white"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >

              {/* TAB BAR + EDIT BUTTON */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:px-6 pt-5 border-b border-borderLight">
                <div className="flex gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition border-b-2 -mb-px ${
                        activeTab === tab.id
                          ? "border-primary text-primary"
                          : "border-transparent text-textMuted hover:text-textPrimary"
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                
              </div>

              {/* TAB CONTENT */}
              <div className="p-6">

                {/* ── PERSONAL INFO TAB ── */}
                {activeTab === "personal" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* NAME */}
                    <div>
                      <label className={labelClass}>Full Name</label>
                      {editing ? (
                        <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
                      ) : (
                        <p className="text-textPrimary font-medium py-2.5">{profile?.name || "—"}</p>
                      )}
                    </div>

                    {/* USERNAME */}
                    <div>
                      <label className={labelClass}>Username</label>
                      {editing ? (
                        <input name="username" value={form.username} onChange={handleChange} className={inputClass} />
                      ) : (
                        <p className="text-textPrimary font-medium py-2.5">@{profile?.username || "—"}</p>
                      )}
                    </div>

                    {/* EMAIL — read only */}
                    <div>
                      <label className={labelClass}>Email</label>
                      <p className="text-textPrimary font-medium py-2.5 flex items-center gap-2">
                        {profile?.email}
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Verified</span>
                      </p>
                    </div>

                    {/* PHONE — read only */}
                    <div>
                      <label className={labelClass}>Phone</label>
                      <p className="text-textPrimary font-medium py-2.5">{profile?.phone || "—"}</p>
                    </div>

                    {/* GENDER */}
                    <div>
                      <label className={labelClass}>Gender</label>
                      {editing ? (
                        <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                      ) : (
                        <p className="text-textPrimary font-medium py-2.5 capitalize">
                          {profile?.gender?.replace("_", " ") || "—"}
                        </p>
                      )}
                    </div>

                    {/* DATE OF BIRTH */}
                    <div>
                      <label className={labelClass}>Date of Birth</label>
                      {editing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={form.dateOfBirth}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      ) : (
                        <p className="text-textPrimary font-medium py-2.5">
                          {profile?.dateOfBirth
                            ? new Date(profile.dateOfBirth).toLocaleDateString("en-IN", {
                                day: "numeric", month: "long", year: "numeric",
                              })
                            : "—"}
                        </p>
                      )}
                    </div>

                  </div>
                )}

                {/* ── ADDRESS TAB ── */}
                {activeTab === "address" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    {/* LABEL */}
    <div>
      <label className={labelClass}>Label</label>
      {editing ? (
        <select name="address.label" value={form.address.label} onChange={handleChange} className={inputClass}>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.label || "—"}</p>
      )}
    </div>

    {/* IS DEFAULT */}
    <div className="flex items-center gap-3 pt-6">
      {editing ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.address.isDefault}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, address: { ...prev.address, isDefault: e.target.checked } }))
            }
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm text-textPrimary">Set as default address</span>
        </label>
      ) : (
        profile?.addresses?.[0]?.isDefault && (
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            ✓ Default Address
          </span>
        )
      )}
    </div>

    {/* FULL NAME */}
    <div>
      <label className={labelClass}>Full Name</label>
      {editing ? (
        <input name="address.fullName" value={form.address.fullName} onChange={handleChange} placeholder="Recipient full name" className={inputClass} />
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.fullName || "—"}</p>
      )}
    </div>

    {/* PHONE */}
    <div>
      <label className={labelClass}>Phone</label>
      {editing ? (
        <input name="address.phone" value={form.address.phone} onChange={handleChange} placeholder="Contact number" className={inputClass} />
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.phone || "—"}</p>
      )}
    </div>

    {/* LINE 1 */}
    <div className="sm:col-span-2">
      <label className={labelClass}>Address Line 1</label>
      {editing ? (
        <input name="address.line1" value={form.address.line1} onChange={handleChange} placeholder="House No, Building, Street" className={inputClass} />
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.line1 || "—"}</p>
      )}
    </div>

    {/* LINE 2 */}
    <div className="sm:col-span-2">
      <label className={labelClass}>Address Line 2 <span className="normal-case text-textMuted">(optional)</span></label>
      {editing ? (
        <input name="address.line2" value={form.address.line2} onChange={handleChange} placeholder="Area, Locality, Landmark" className={inputClass} />
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.line2 || "—"}</p>
      )}
    </div>

    {/* CITY */}
    <div>
      <label className={labelClass}>City</label>
      {editing ? (
        <input name="address.city" value={form.address.city} onChange={handleChange} placeholder="City" className={inputClass} />
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.city || "—"}</p>
      )}
    </div>

    {/* STATE */}
    <div>
      <label className={labelClass}>State</label>
      {editing ? (
        <input name="address.state" value={form.address.state} onChange={handleChange} placeholder="State" className={inputClass} />
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.state || "—"}</p>
      )}
    </div>

    {/* PINCODE */}
    <div>
      <label className={labelClass}>Pincode</label>
      {editing ? (
        <input name="address.pincode" value={form.address.pincode} onChange={handleChange} placeholder="Pincode" className={inputClass} />
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.pincode || "—"}</p>
      )}
    </div>

    {/* COUNTRY */}
    <div>
      <label className={labelClass}>Country</label>
      {editing ? (
        <input name="address.country" value={form.address.country} onChange={handleChange} placeholder="Country" className={inputClass} />
      ) : (
        <p className="text-textPrimary font-medium py-2.5">{profile?.addresses?.[0]?.country || "India"}</p>
      )}
    </div>

    {/* EMPTY STATE */}
    {!editing && !profile?.addresses?.[0]?.line1 && (
      <div className="sm:col-span-2 flex flex-col items-center py-10 text-center gap-3">
        <MapPin size={32} className="text-borderMedium" />
        <p className="text-textMuted text-sm">No address added yet.</p>
        <button
          onClick={() => setEditing(true)}
          className="px-4 py-1.5 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition"
        >
          Add Address
        </button>
      </div>
    )}

  </div>
)}

              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;