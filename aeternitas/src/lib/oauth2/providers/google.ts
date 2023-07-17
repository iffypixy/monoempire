import fetch from "node-fetch";

import {config} from "@lib/config";

import {OAuth2} from "../oauth2";

interface GoogleCredentials {
    id: number;
    email: string;
    verified: boolean;
}

export const google = new OAuth2<GoogleCredentials>({
    authorization: config.google.AUTHORIZATION,
    token: config.google.TOKEN,
    scope: config.google.SCOPE,
    client_id: config.google.CLIENT_ID,
    client_secret: config.google.CLIENT_SECRET,
    redirect_uri: config.google.REDIRECT_URI,
    credentials: async (options) => {
        const qs = new URLSearchParams({
            alt: "json",
            access_token: options.access_token,
        });

        const res = await fetch(`${config.google.USER_INFO}?${qs}`);
        const json = (await res.json()) as GoogleCredentials;

        return json;
    },
});
