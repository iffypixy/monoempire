declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            SESSION_SECRET: string;
            REDIS_HOST: string;
            REDIS_PORT: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_REDIRECT_URI: string;
            GOOGLE_CREDENTIALS_URI: string;
            GOOGLE_AUTHORIZATION_URI: string;
            GOOGLE_TOKEN: string;
            GOOGLE_SCOPE: string;
            CLIENT_ORIGIN: string;
            CLIENT_GOOGLE_REGISTRATION: string;
        }
    }
}

export {};
