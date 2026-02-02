import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "../app/features/users/UserSlice";
export const store = configureStore({
  reducer: {
    users: UsersReducer,
  },
});
