import {User} from "@prisma/client";

export interface SharedUser {
    id: string;
    username: string;
    avatar: string;
}

export const user = (u: User): SharedUser => ({
    id: u.id,
    username: u.username,
    avatar: u.avatar,
});
