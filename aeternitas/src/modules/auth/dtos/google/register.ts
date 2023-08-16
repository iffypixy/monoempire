import z from "zod";

import {validation} from "@lib/validation";

export const GoogleRegister = validation.schema({
    body: z.object({
        username: z
            .string()
            .min(4)
            .max(18)
            .regex(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
    }),
});

export type GoogleRegisterBody = z.infer<typeof GoogleRegister.body>;
