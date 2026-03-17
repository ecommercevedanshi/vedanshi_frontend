// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
// };

// const userAuthSlice = createSlice({
//   name: "userAuth",
//   initialState,
//   reducers: {

//     setCredentials: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },

//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },

//   },
// });

// export const { setCredentials, logout } = userAuthSlice.actions;
// export default userAuthSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Safely parse whatever is in localStorage
const getRawUser = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) return null;

    // Handle old cookie-style shape { user: {...}, accessToken, refreshToken }
    if (stored.user && stored.accessToken) {
      return {
        _id: stored.user._id,
        name: stored.user.name,
        email: stored.user.email,
        token: stored.accessToken,
        refreshToken: stored.refreshToken,
      };
    }

    // New correct shape — return as-is
    return stored;
  } catch {
    return null;
  }
};

const initialState = {
  user: getRawUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;