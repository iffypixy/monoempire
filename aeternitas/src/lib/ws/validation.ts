import {AnyZodObject, z} from "zod";

interface AcknowledgeOptions {
    ok: boolean;
    msg?: string;
    payload?: any;
}

export type Acknowledge = (options: AcknowledgeOptions) => void;

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
            acknowledge({ok: false});
        }
    };
};
