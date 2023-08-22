import {registerAs} from "@nestjs/config";

export const google = registerAs("oauth2.google", () => {
    const env = process.env;

    return {
        client: {
            id: env.GOOGLE_CLIENT_ID,
            secret: env.GOOGLE_CLIENT_SECRET,
        },
        redirectURI: env.GOOGLE_REDIRECT_URI,
        credentialsURI: env.GOOGLE_USER_INFO,
        authorizationURI: env.GOOGLE_AUTHORIZATION,
        token: env.GOOGLE_TOKEN,
        scope: env.GOOGLE_SCOPE,
    };
});
