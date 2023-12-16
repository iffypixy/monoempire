import {User} from "@prisma/client";
import "express-session";

import {Maybe} from "@lib/types";

declare module "express-session" {
    interface SessionData {
        user: Maybe<User>;
        userId: Maybe<User["id"]>;
        registration: Maybe<{
            interim: {
                id: string;
                email?: string;
                provider: "google" | "steam" | "github";
            };
        }>;
    }

    export type SessionWithData = Session & SessionData;
}
