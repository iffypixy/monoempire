import Redis from "ioredis";

import {Nullable} from "@lib/types";

export const redis: {
    client: Nullable<Redis>;
    setup: () => void;
} = {
    client: null,
    setup() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        });
    },
};
