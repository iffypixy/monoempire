import {RedisKey} from "ioredis";

import {client} from "./client";

const get = async <T>(key: RedisKey): Promise<T | null> => {
    const json = await client.get(key);

    return JSON.parse(json);
};

const set = async <T>(key: RedisKey, value: T) => {
    await client.set(key, JSON.stringify(value));
};

const update = async <T>(key: RedisKey, partial: Partial<T>) => {
    const value = (await get(key)) || {};

    const updated = {...(value as object), ...partial};

    await set(key, updated);
};

const del = async (key: RedisKey) => {
    await client.del(key);
};

export const service = {get, set, update, delete: del};
