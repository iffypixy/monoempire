import z from "zod";

export const GoogleRedirect = {
    query: z.object({
        code: z.string().nonempty(),
    }),
};

export type GoogleRedirectQuery = z.infer<typeof GoogleRedirect.query>;
