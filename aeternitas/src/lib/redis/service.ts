import {RedisKey} from "ioredis";

import {client} from "./client";

const get = async (key: RedisKey) => {
    const json = await client.get(key);

    return JSON.parse(json);
};

const set = async (key: RedisKey, value: any) => {
    await client.set(key, JSON.stringify(value));
};

const update = async <T>(key: RedisKey, partial: Partial<T>) => {
    const value = (await get(key)) || {};

    const updated = {...value, ...partial};

    await set(key, updated);
};

const del = async (key: RedisKey) => {
    await client.del(key);
};

export const service = {get, set, update, delete: del};
