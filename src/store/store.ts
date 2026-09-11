import { configureStore } from "@reduxjs/toolkit";
import { errorMiddleware } from "./middleware/errorHandler";
import { successMiddleware } from "./middleware/successHandler";
import authReducer from "./reducer/auth";
import { authApi } from "./api/auth-api";

const isDevelopment = import.meta.env.VITE_ENV === "development";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    // [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      //   .concat(baseApi.middleware)
      .concat(successMiddleware)
      .concat(errorMiddleware),
  devTools: isDevelopment,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
