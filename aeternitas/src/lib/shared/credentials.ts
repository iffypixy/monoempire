import {User} from "@prisma/client";

export interface SharedCredentials {
    id: User["id"];
    email: User["email"];
    username: User["username"];
    avatar: User["avatar"];
}

export const credentials = (u: User): SharedCredentials => ({
    id: u.id,
    email: u.email,
    username: u.username,
    avatar: u.avatar,
});
