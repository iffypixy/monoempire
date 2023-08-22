import {client} from "./client";
import {redis} from "./redis";
import {session} from "./session";
import {oauth2} from "./oauth2";

export const config = [client, redis, session, ...oauth2];
