import {AnyZodObject, ZodError} from "zod";

import {middleware} from "./setup";

interface AcknowledgeOptions {
    msg?: string;
    payload?: any;
}

export type Acknowledge = (ok: boolean, options?: AcknowledgeOptions) => void;

export const validate = <T extends AnyZodObject>(schema: T) =>
    middleware((payload, acknowledge) => {
        if (typeof acknowledge !== "function")
            throw new Error("No acknowledge utility provided");

        try {
            schema.parseAsync(payload);
        } catch (e) {
            if (e instanceof ZodError)
                return acknowledge(false, {
                    msg: "Validation error",
                });

            acknowledge(false, {
                msg: "Unexpected error",
            });
        }
    });
