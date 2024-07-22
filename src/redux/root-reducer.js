import { combineReducers } from "@reduxjs/toolkit";
import { TYPE_LOGOUT } from "@/constants/actionTypeConstants";
import authSlice from "./auth/authSlice";
import videoSlice from "./videos/videoSlice";


const combineReducer = combineReducers({
    auth:authSlice,
    videos: videoSlice.reducer,
  });

const rootReducer = (state, action) => {
    if (action.type === TYPE_LOGOUT) {
      state = {};
    }
    return combineReducer(state, action);
  };
export { rootReducer, combineReducer };