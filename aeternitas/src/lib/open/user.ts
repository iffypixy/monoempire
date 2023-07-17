import {User} from "@prisma/client";

export interface UserPublic {
    id: string;
    username: string;
    avatar: string;
}

export const user = (u: User): UserPublic => ({
    id: u.id,
    username: u.username,
    avatar: u.avatar,
});
