import {User} from "@prisma/client";

export const user = (u: User) => ({
    id: u.id,
    username: u.username,
    avatar: u.avatar,
});
