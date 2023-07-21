import z from "zod";

import {createSchema} from "@lib/validation";

export const Login = createSchema({
    body: z.object({
        username: z.string().nonempty(),
        email: z.string().email(),
        password: z.string().nonempty(),
    }),
});

export type LoginBody = z.infer<typeof Login.body>;
