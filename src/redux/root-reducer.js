import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { TYPE_LOGOUT } from "@/constants/actionTypeConstants";


const combineReducer = combineReducers({
    auth:authSlice,
  });

const rootReducer = (state, action) => {
    if (action.type === TYPE_LOGOUT) {
      state = {};
    }
    return combineReducer(state, action);
  };
export { rootReducer, combineReducer };