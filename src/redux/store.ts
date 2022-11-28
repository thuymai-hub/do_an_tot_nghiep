import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "./slice/root.slice";
import myUserRedeucer from "./slice/user.slice";
const rootReducer = {
  root: appReducer,
  user: myUserRedeucer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
