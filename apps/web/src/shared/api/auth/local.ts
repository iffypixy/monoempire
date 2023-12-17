import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {Credentials} from "@features/auth";

interface LocalSignUpBody {
    email: string;
    username: string;
    password: string;
}

interface LocalSignUpResponse {
    credentials: Credentials;
}

interface LocalSignInBody {
    emailOrUsername: string;
    password: string;
}

interface LocalSignInResponse {
    credentials: Credentials;
}

interface GetCredentialsResponse {
    credentials: Credentials;
}

interface VerifyResponse {
    ok: boolean;
}

interface VerifyUsernameBody {
    username: string;
}

interface VerifyEmailBody {
    email: string;
}

export const local = createApi({
    reducerPath: "authApi/local",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        credentials: "include",
    }),
    endpoints: (build) => ({
        signUp: build.mutation<LocalSignUpResponse, LocalSignUpBody>({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),
        signIn: build.mutation<LocalSignInResponse, LocalSignInBody>({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),
        getCredentials: build.query<GetCredentialsResponse, void>({
            query: () => "/credentials",
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        verifyUsername: build.mutation<VerifyResponse, VerifyUsernameBody>({
            query: (body) => ({
                url: "/verify/username",
                method: "POST",
                body,
            }),
        }),
        verifyEmail: build.mutation<VerifyResponse, VerifyEmailBody>({
            query: (body) => ({
                url: "/verify/email",
                method: "POST",
                body,
            }),
        }),
    }),
});
