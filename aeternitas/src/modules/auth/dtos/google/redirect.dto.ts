import z from "zod";

import {createSchema} from "@lib/validation";

export const GoogleRedirect = createSchema({
    query: z.object({
        code: z.string().nonempty(),
    }),
});

export type GoogleRedirectQuery = z.infer<typeof GoogleRedirect.query>;
