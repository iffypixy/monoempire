import {Callback} from "../types";

export const debounce = (cb: Callback, delay: number) => {
    let timeout: number;

    return (...args: any[]) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    };
};

export const TYPING_DEBOUCE_DELAY = 300;
