import fetch from "node-fetch";

import {qs} from "./qs";

interface TokensPayload {
    id_token: string;
    access_token: string;
}

interface OAuth2Options<T> {
    redirect_uri: string;
    client_id: string;
    client_secret: string;
    scope: string;
    authorization: string;
    token: string;
    credentials: (options: TokensPayload) => Promise<T>;
}

export class OAuth2<T> {
    constructor(public readonly options: OAuth2Options<T>) {}

    get authorizationURL() {
        return `${this.options.authorization}?${qs.authorization({
            clientID: this.options.client_id,
            redirectURI: this.options.redirect_uri,
            scope: this.options.scope,
        })}`;
    }

    async loadCredentials(code: string) {
        const res = await fetch(
            `${this.options.token}?${qs.token({
                code,
                clientID: this.options.client_id,
                clientSecret: this.options.client_secret,
                redirectURI: this.options.redirect_uri,
            })}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        const payload = (await res.json()) as TokensPayload;

        return this.options.credentials(payload);
    }
}
