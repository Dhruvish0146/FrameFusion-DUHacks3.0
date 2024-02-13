import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  name: null,
  token: null,
  picturePath: null,
  actor: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.actor = action.payload.actor;
      state.user = action.payload.user;
    },

    setLogout: (state) => {
      state.userId = null;
      state.token = null;
      state.name = null;
      state.actor = null;
      state.picturePath = null;
      state.user = null;
    },
    setPicturePath: (state, action) => {
      state.picturePath = action.payload.picturePath;
    },
    updateDetails: (state, action) => {
        // Merge the updated user object with the existing one in state
        state.user = { ...state.user, ...action.payload };
    
        // Update the name and picturePath directly from the updated user object
        state.name = state.user.name;
        state.picturePath = state.user.picturePath;
    },
  },
});

export const { setLogin, setLogout, setPicturePath, updateDetails } =
  authSlice.actions;
export default authSlice.reducer;
