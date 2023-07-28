import {AnyZodObject, ZodError, z} from "zod";

interface AcknowledgeOptions {
    msg?: string;
    payload?: any;
}

export type Acknowledge = (ok: boolean, options?: AcknowledgeOptions) => void;

export const validate = <T extends AnyZodObject>(
    schema: T,
    listener: (payload: z.infer<T>, ack: Acknowledge) => void,
) => {
    return (payload: T, acknowledge: Acknowledge) => {
        if (typeof acknowledge !== "function") return;

        try {
            schema.parseAsync(payload);

            listener(payload, acknowledge);
        } catch (e) {
            if (e instanceof ZodError)
                return acknowledge(false, {
                    msg: "Validation error",
                });

            acknowledge(false, {
                msg: "Unexpected error",
            });
        }
    };
};
