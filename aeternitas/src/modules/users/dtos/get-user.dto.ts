import z from "zod";

import {createSchema} from "@lib/validation";

export const GetUser = createSchema({
    params: z.object({
        username: z.string().nonempty(),
    }),
});

export type GetUserParams = z.infer<typeof GetUser.params>;
