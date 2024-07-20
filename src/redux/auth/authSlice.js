import { createSlice } from "@reduxjs/toolkit";
import authInitialState from "./authInitialState";
import { loginUserThunk, registerUserThunk, loggedInUserThunk } from "./authThunks";
import { PURGE } from "redux-persist";
import { storeUserInfo } from "@/lib/storage";
import { decodeAndValidateToken } from "@/lib/token";

// Slice to manage authentication-related state
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    // Additional reducers can be added if needed
  },

  // Reducers to handle actions dispatched by async thunks
  extraReducers: (builder) => {
    builder
      // Reducers for registerUserThunk
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userInfo = null;
        state.accessToken = null;
        state.refreshToken = null;
      })



      // Reducers for loginUserThunk
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        const {
          access, refresh
        } = action.payload;
        state.loading = false;
        const { isValidToken } = decodeAndValidateToken(access);
        if (isValidToken){          
          state.accessToken = access;
          state.refreshToken = refresh;
          storeUserInfo(access, refresh);
        }
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userInfo = null;
        state.accessToken = null;
        state.refreshToken = null;
      })


      // Reducers for registerUserThunk
      .addCase(loggedInUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loggedInUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loggedInUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userInfo = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      .addCase(PURGE, (state) => {
        state.loading = false;
        state.error = null;
        state.userInfo = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
      
  },
});

export default authSlice.reducer;
