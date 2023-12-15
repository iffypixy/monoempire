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
            github: {
                client: {
                    id: env.GITHUB_CLIENT_ID,
                    secret: env.GITHUB_CLIENT_SECRET,
                },
                redirectURI: env.GITHUB_REDIRECT_URI,
                credentialsURI: env.GITHUB_CREDENTIALS_URI,
                authorizationURI: env.GITHUB_AUTHORIZATION_URI,
                token: env.GITHUB_TOKEN,
                scope: env.GITHUB_SCOPE,
            },
        },
        client: {
            origin: env.CLIENT_ORIGIN,
            registration: `${env.CLIENT_ORIGIN}${env.CLIENT_REGISTRATION}`,
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
