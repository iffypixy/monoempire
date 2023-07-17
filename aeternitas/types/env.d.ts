declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_REDIRECT_URI: string;
            SESSION_SECRET: string;
        }
    }
}

export {};
