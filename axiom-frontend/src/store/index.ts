import { configureStore } from "@reduxjs/toolkit";
import tokenTableReducer from "./tokenTableSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      tokenTable: tokenTableReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
