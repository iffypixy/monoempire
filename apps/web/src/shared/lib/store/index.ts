import {configureStore} from "@reduxjs/toolkit";
import {useDispatch as useUntypedDispatch} from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";

import {authApi} from "@shared/api/auth";

import {reducer} from "./reducer";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.local.middleware,
            authApi.oauth2.middleware,
        ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useDispatch: () => RootDispatch = useUntypedDispatch;
