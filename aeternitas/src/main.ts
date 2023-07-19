import express from "express";

import {auth} from "@modules/auth";
import {session} from "@lib/session";

import "@lib/config";

export const app = express();

app.use(express.json());
app.use(session());

app.use(auth.route, auth.router);
