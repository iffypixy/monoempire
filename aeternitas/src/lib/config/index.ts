import dotenv from "dotenv";

const result = dotenv.config();

if (result.error) throw result.error;

const env = result.parsed as typeof process.env;

export const config = {
    env: env.NODE_ENV,
    client: {
        ORIGIN: env.CLIENT_ORIGIN,
        registration: {
            GOOGLE: env.CLIENT_GOOGLE_REGISTRATION,
        },
    },
    google: {
        CLIENT_ID: env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
        REDIRECT_URI: env.GOOGLE_REDIRECT_URI,
        USER_INFO: env.GOOGLE_USER_INFO,
        AUTHORIZATION: env.GOOGLE_AUTHORIZATION,
        SCOPE: env.GOOGLE_SCOPE,
        TOKEN: env.GOOGLE_TOKEN,
    },
    session: {
        SECRET: env.SESSION_SECRET,
    },
    redis: {
        HOST: env.REDIS_HOST,
        PORT: Number(env.REDIS_PORT),
    },
};
