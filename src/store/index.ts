import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import lots from "./slices/lots";

const sliceReducers = {
  lots,
};

export * from "./slices/lots";
export * from "./selectors/lots";
export * from "./actions/lots";

export const store = configureStore({
  reducer: sliceReducers,
  devTools: import.meta.env.DEV,
});

export const getRootState = store.getState;

export type GetRootState = typeof store.getState;

export type RootState = ReturnType<GetRootState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
