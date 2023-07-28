import {z} from "zod";

export const PlayCard = z.object({
    matchId: z.string().nonempty(),
    cardId: z.string().nonempty(),
});
