import {z} from "zod";

export const PlayCard = z.object({
    matchId: z.string().nonempty(),
    cardId: z.string().nonempty(),
});

export type PlayCard = z.infer<typeof PlayCard>;
