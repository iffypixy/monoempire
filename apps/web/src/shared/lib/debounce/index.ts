import {useCallback, useEffect, useRef, useState} from "react";

import {Callback, Nullable} from "../types";

export const useDebouncedValue = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useDebouncedCallback = (cb: Callback, delay: number) => {
    const timeoutRef = useRef<Nullable<number>>(null);

    const debounceCb = useCallback(
        (...args: unknown[]) => {
            const timeoutId = timeoutRef.current;

            if (timeoutId) clearTimeout(timeoutId);

            timeoutRef.current = setTimeout(() => cb(args), delay);
        },
        [cb, delay],
    );

    const cancelDebouncedCb = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    return [debounceCb, cancelDebouncedCb] as const;
};
