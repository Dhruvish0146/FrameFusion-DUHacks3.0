import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    token: null
};

export const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state,action) => {
            
            state.token = action.payload.token;
        },

        setLogout: (state) => {
            
            state.token = null;
        },
    },
    
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;