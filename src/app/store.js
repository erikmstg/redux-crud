import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "../features/heroSlice";

export const store = configureStore({
  reducer: {
    hero: heroSlice,
  },
});
