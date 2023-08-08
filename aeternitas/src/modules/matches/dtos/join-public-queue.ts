import {z} from "zod";

export const JoinPublicQueue = z.object({
    username: z.string().nonempty(),
});

export type JoinPublicQueue = z.infer<typeof JoinPublicQueue>;
