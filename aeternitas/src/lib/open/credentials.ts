import {User} from "@prisma/client";

export const credentials = (u: User) => ({
    id: u.id,
    email: u.email,
    username: u.username,
    avatar: u.avatar,
});
