import z from "zod";

import {validation} from "@lib/validation";

export const GoogleRedirect = validation.create({
    query: z.object({
        code: z.string().nonempty(),
    }),
});

export type GoogleRedirectQuery = z.infer<typeof GoogleRedirect.query>;
