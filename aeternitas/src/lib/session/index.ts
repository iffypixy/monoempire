import s from "express-session";
import Store from "connect-redis";

import {redis} from "@lib/redis";
import {config} from "@lib/config";

const month = 2629800000;

const store = new Store({client: redis.client});

export const session = s({
    secret: config.session.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store,
    cookie: {
        maxAge: month,
        httpOnly: true,
    },
});
