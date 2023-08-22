import {registerAs} from "@nestjs/config";

export const redis = registerAs("redis", () => {
    const env = process.env;

    return {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
    };
});
