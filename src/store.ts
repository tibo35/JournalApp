import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // <-- This line

// Extract RootState type from rootReducer
export type RootState = ReturnType<typeof rootReducer>;
