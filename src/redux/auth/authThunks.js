import { authService } from "@/services/serviceInstances";
import { createAsyncThunk } from "@reduxjs/toolkit";


// Async thunk for user registration
export const registerUserThunk = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await authService.login(loginData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching logged in user
export const loggedInUserThunk = createAsyncThunk(
  "auth/fetchLoggedInUser",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await authService.fetchLoggedInUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
