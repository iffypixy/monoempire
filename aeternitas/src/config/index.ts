export const config = () => {
    const env = process.env;

    return {
        oauth2: {
            google: {
                client: {
                    id: env.GOOGLE_CLIENT_ID,
                    secret: env.GOOGLE_CLIENT_SECRET,
                },
                redirectURI: env.GOOGLE_REDIRECT_URI,
                credentialsURI: env.GOOGLE_CREDENTIALS_URI,
                authorizationURI: env.GOOGLE_AUTHORIZATION_URI,
                token: env.GOOGLE_TOKEN,
                scope: env.GOOGLE_SCOPE,
            },
        },
        client: {
            origin: env.CLIENT_ORIGIN,
            registration: {
                google: `${env.CLIENT_ORIGIN}${env.CLIENT_GOOGLE_REGISTRATION}`,
            },
        },
        redis: {
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
        },
        session: {
            secret: env.SESSION_SECRET,
        },
    };
};
