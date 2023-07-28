import express from "express";
import http from "http";

import {matches} from "@modules/matches";
import {auth} from "@modules/auth";
import {users} from "@modules/users";
import {session} from "@lib/session";
import {ws} from "@lib/ws";

const app = express();

export const server = http.createServer(app);

ws.setup(server, {
    gateways: [matches.gateways.public, matches.gateways.core],
});

app.use(express.json());
app.use(session);

app.use(auth.route, auth.router);
app.use(users.route, users.router);
