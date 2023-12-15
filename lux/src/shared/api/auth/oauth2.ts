import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {Credentials} from "@features/auth";

type OAuth2Provider = "google" | "github" | "steam";

interface GetInterimCredentailsResponse {
    id: string;
    email?: string;
    provider: OAuth2Provider;
}

interface OAuth2SignUpBody {
    email?: string;
    username: string;
}

interface OAuth2SignUpResponse {
    credentials: Credentials;
}

export const oauth2 = createApi({
    reducerPath: "authApi/oauth2",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth2`,
        credentials: "include",
    }),
    endpoints: (build) => ({
        getInterimCredentials: build.query<GetInterimCredentailsResponse, void>(
            {
                query: () => "/interim",
            },
        ),
        signUp: build.mutation<OAuth2SignUpResponse, OAuth2SignUpBody>({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),
    }),
});
