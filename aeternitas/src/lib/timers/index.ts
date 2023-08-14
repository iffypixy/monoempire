import {nanoid} from "nanoid";

import {redis} from "@lib/redis";

const key = (id: string) => `$timer:${id}`;

interface StartOptions {
    id?: string;
    repeat?: number;
}

type Timer = true | null;

const start = async (cb: () => void, delay: number, options?: StartOptions) => {
    const id = options.id || nanoid();

    await redis.service.set<Timer>(key(id), true);

    if (options.repeat) {
        const repeat = async () => {
            setTimeout(async () => {
                const isActive = await redis.service.get<Timer>(key(id));

                if (isActive) {
                    cb();

                    repeat();
                }
            }, delay);
        };

        repeat();
    } else {
        setTimeout(async () => {
            const isActive = await redis.service.get<Timer>(key(id));

            if (isActive) {
                cb();

                await redis.service.delete(key(id));
            }
        }, delay);
    }

    return id;
};

const revoke = async (id: string) => {
    await redis.service.delete(key(id));
};

type ProcessOptions = Partial<{
    delay: number;
}>;

type AddTimerOptions = Partial<{
    id: string;
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
        add(payload: T, opts?: AddTimerOptions) {
            const id = opts.id || nanoid();
            const delay = opts.delay || options.delay || 0;

            return start(() => processor(payload), delay, {id: key(id)});
        },
        revoke(id: string) {
            revoke(key(id));
        },
    };
};

export const timers = {process, start, revoke};
