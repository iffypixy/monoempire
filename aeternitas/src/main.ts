import express from "express";

import {auth} from "@modules/auth";
import {users} from "@modules/users";
import {session} from "@lib/session";

export const app = express();

app.use(express.json());
app.use(session);

app.use(auth.route, auth.router);
app.use(users.route, users.router);
