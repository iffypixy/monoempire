import {Server as HTTPServer} from "http";
import {Server as WSServer} from "socket.io";

import {config} from "@lib/config";
import {session} from "@lib/session";

type WsGateway = (server: WSServer) => void;

interface WsSetupOptions {
    gateways: WsGateway[];
}

export const setup = (server: HTTPServer, {gateways}: WsSetupOptions) => {
    const io = new WSServer(server, {
        cors: {
            origin: config.client.ORIGIN,
            credentials: true,
        },
    });

    io.engine.use(session);

    gateways.forEach((init) => init(io));
};

export const createGateway = (gateway: WsGateway) => gateway;
