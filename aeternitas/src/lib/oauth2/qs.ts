interface AuthorizationQSOptions {
    redirectURI: string;
    clientID: string;
    scope: string;
}

interface TokenQSOptions {
    code: string;
    redirectURI: string;
    clientID: string;
    clientSecret: string;
}

const authorization = (opts: AuthorizationQSOptions) => {
    const options = {
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        redirect_uri: opts.redirectURI,
        client_id: opts.clientID,
        scope: opts.scope,
    };

    return new URLSearchParams(options);
};

const token = (opts: TokenQSOptions) => {
    const options = {
        redirect_uri: opts.redirectURI,
        client_id: opts.clientID,
        client_secret: opts.clientSecret,
        code: opts.code,
        grant_type: "authorization_code",
    };

    return new URLSearchParams(options);
};

export const qs = {authorization, token};
