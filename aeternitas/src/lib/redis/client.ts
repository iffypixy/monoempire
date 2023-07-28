import Redis from "ioredis";

import {config} from "@lib/config";

export const client = new Redis({
    host: config.redis.HOST,
    port: config.redis.PORT,
});