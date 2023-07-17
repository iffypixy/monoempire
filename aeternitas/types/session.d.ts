import {User} from "@prisma/client";

declare module "express-session" {
    interface SessionData {
        user: User;
        userId: User["id"];
        registration: {
            interim: {
                google: {
                    id: number;
                    email: string;
                };
            };
        };
    }
}
