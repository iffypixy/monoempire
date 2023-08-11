import {nanoid} from "nanoid";

import {redis} from "@lib/redis";

const key = (id: string) => `$timer:${id}`;

interface StartOptions {
    id?: string;
}

const start = async (cb: () => void, delay: number, options?: StartOptions) => {
    const id = options.id || nanoid();

    await redis.service.set(key(id), true);

    setTimeout(async () => {
        const isActive = await redis.service.get(key(id));

        if (isActive) {
            cb();

            await redis.service.delete(key(id));
        }
    }, delay);

    return id;
};

const revoke = async (id: string) => {
    await redis.service.delete(key(id));
};

type BuildOptions = Partial<{
    delay: number;
}>;

type AddTimerOptions = Partial<{
    id: string;
    delay: number;
}>;

const build = <T>(
    name: string,
    processor: (payload: T) => void,
    options?: BuildOptions,
) => {
    const key = (id: string) => `${name}:${id}`;

    return {
        async get(id: string) {
            const isActive = await redis.service.get(key(id));

            if (!isActive) return null;

            return {
                revoke: () => revoke(id),
            };
        },
        add(payload: T, opts?: AddTimerOptions) {
            const delay = opts.delay || options.delay || 0;

            return start(() => processor(payload), delay, {id: opts.id});
        },
    };
};

export const timers = {build, start, revoke};
