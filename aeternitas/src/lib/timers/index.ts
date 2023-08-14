import crypto from "crypto";

import {redis} from "@lib/redis";

interface StartOptions {
    id?: string;
    repeat?: boolean;
    delay: number;
}

type Timer = true | null;
type Callback = (...args: any[]) => void;

const key = (id: string) => `$timer:${id}`;

/*
@note: uuid is designed for generating consistent id across multiple node.js instances
*/
const uuid = (cb: Callback, payload?: any) => {
    const addon = payload ? JSON.stringify(payload) : "";

    const hash = crypto
        .createHash("sha256")
        .update(cb.toString().concat(addon))
        .digest("hex");

    return hash.slice(0, 8);
};

const start = async (cb: Callback, options?: StartOptions) => {
    const id = options.id || uuid(cb);

    const result = await redis.client.set(key(id), JSON.stringify(true), "NX");

    const isUnlocked = result === "OK";

    if (isUnlocked) {
        if (options.repeat) {
            const repeat = async () => {
                setTimeout(async () => {
                    const isActive = await redis.service.get<Timer>(key(id));

                    if (isActive) {
                        cb();

                        repeat();
                    }
                }, options.delay);
            };

            repeat();
        } else {
            setTimeout(async () => {
                const isActive = await redis.service.get<Timer>(key(id));

                if (isActive) {
                    cb();

                    await redis.service.delete(key(id));
                }
            }, options.delay);
        }
    }

    return id;
};

const revoke = async (id: string) => {
    await redis.service.delete(key(id));
};

type ProcessOptions = Partial<{
    delay: number;
}>;

const process = <T>(
    name: string,
    processor: (payload: T) => void,
    options?: ProcessOptions,
) => {
    const key = (id: string) => `${name}:${id}`;

    return {
        async get(id: string) {
            const isActive = await redis.service.get(key(id));

            if (!isActive) return null;

            return {
                revoke: () => revoke(key(id)),
            };
        },
        add(payload: T, opts: StartOptions) {
            const id =
                opts.id ||
                uuid(processor, {
                    ...opts,
                    ...payload,
                });

            const delay = opts.delay || options.delay;

            return start(() => processor(payload), {
                id: key(id),
                repeat: opts.repeat,
                delay,
            });
        },
        revoke(id: string) {
            revoke(key(id));
        },
    };
};

export const timers = {process, start, revoke};
