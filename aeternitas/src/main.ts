import express from "express";
import http from "http";

import {auth} from "@modules/auth";
import {users} from "@modules/users";
import {session} from "@lib/session";

const app = express();

export const server = http.createServer(app);

app.use(express.json());
app.use(session);

app.use(auth.route, auth.router);
app.use(users.route, users.router);
