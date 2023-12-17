import s from "express-session";
import Store from "connect-redis";

import {redis} from "@lib/redis";

const month = 2629800000;

export const session = () => {
    const store = new Store({client: redis.client!});

    return s({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        store,
        cookie: {
            maxAge: month,
            httpOnly: true,
        },
    });
};
