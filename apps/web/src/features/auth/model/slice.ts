import {createSlice} from "@reduxjs/toolkit";

import {Nullable} from "@shared/lib/types";
import {authApi} from "@shared/api/auth";

import {Credentials} from "../types";

interface AuthState {
    credentials: Nullable<Credentials>;
    isAuthenticated: boolean;
}

export const slice = createSlice({
    initialState: {
        credentials: null,
        isAuthenticated: false,
    } as AuthState,
    name: "auth",
    reducers: {},
    extraReducers: (build) => {
        build
            .addMatcher(
                authApi.local.endpoints.getCredentials.matchFulfilled,
                (state, action) => {
                    state.isAuthenticated = true;
                    state.credentials = action.payload.credentials;
                },
            )
            .addMatcher(
                authApi.local.endpoints.signIn.matchFulfilled,
                (state, action) => {
                    state.isAuthenticated = true;
                    state.credentials = action.payload.credentials;
                },
            )
            .addMatcher(
                authApi.local.endpoints.signUp.matchFulfilled,
                (state, action) => {
                    state.isAuthenticated = true;
                    state.credentials = action.payload.credentials;
                },
            )
            .addMatcher(
                authApi.oauth2.endpoints.signUp.matchFulfilled,
                (state, action) => {
                    state.isAuthenticated = true;
                    state.credentials = action.payload.credentials;
                },
            )
            .addMatcher(
                authApi.local.endpoints.logout.matchFulfilled,
                (state) => {
                    state.isAuthenticated = false;
                    state.credentials = null;
                },
            );
    },
});
