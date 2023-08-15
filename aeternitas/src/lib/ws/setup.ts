import {Server as HTTPServer} from "http";
import {Server as WSServer} from "socket.io";

import {config} from "@lib/config";
import {session} from "@lib/session";
import {Acknowledge} from "./middlewares/validation";

type WsGateway = (server: WSServer) => void;

export const setup = (server: HTTPServer, gateways: WsGateway[]) => {
    const io = new WSServer(server, {
        cors: {
            origin: config.client.ORIGIN,
            credentials: true,
        },
    });

    io.engine.use(session);

    gateways.forEach((init) => init(io));
};

export const gateway = (g: WsGateway) => g;

type WsMiddleware<T> = (
    payload: T,
    acknowledge: Acknowledge,
) => void | Promise<void>;

export const middleware = <T>(mw: WsMiddleware<T>) => mw;

export const handler =
    <T>(
        mws: WsMiddleware<T>[],
        cb: (payload: T, acknowledge: Acknowledge) => void | Promise<void>,
    ) =>
    async (payload: T, acknowledge: Acknowledge) => {
        for (const middleware of mws) {
            await middleware(payload, acknowledge);
        }

        cb(payload, acknowledge);
    };

interface WsEvents {
    server: Record<string, string>;
    client: Record<string, string>;
}

export const events = <T extends WsEvents>(prefix: string, events: T): T => {
    const modified = {
        server: {},
        client: {},
    } as WsEvents;

    Object.keys(events.server).forEach((prop) => {
        modified.server[prop] = `${prefix}:${events.server[prop]}`;
    });

    Object.keys(events.client).forEach((prop) => {
        modified.client[prop] = `${prefix}:${events.client[prop]}`;
    });

    return modified as T;
};
