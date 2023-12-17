import {User} from "@prisma/client";

export interface SanitizedUser {
    id: string;
    username: string;
    avatar: string;
}

export const user = (u: User): SanitizedUser => ({
    id: u.id,
    username: u.username,
    avatar: u.avatar,
});
