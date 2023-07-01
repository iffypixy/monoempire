import {configureStore} from "@reduxjs/toolkit";
import {useDispatch as useUntypedDispatch} from "react-redux";

import {reducer} from "./reducer";

export const store = configureStore({reducer});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useDispatch: () => RootDispatch = useUntypedDispatch;
