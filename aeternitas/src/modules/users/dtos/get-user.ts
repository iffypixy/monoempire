import z from "zod";

import {validation} from "@lib/validation";

export const GetUser = validation.schema({
    params: z.object({
        username: z.string().nonempty(),
    }),
});

export type GetUserParams = z.infer<typeof GetUser.params>;
