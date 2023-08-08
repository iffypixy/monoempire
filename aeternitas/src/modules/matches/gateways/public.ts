import {ws} from "@lib/ws";
import {redis} from "@lib/redis";
import {utils} from "@lib/utils";
import {open} from "@lib/open";

import {PublicQueue} from "../types";
import {constants} from "../constants";
import * as dtos from "../dtos";
import {PublicMatch} from "../lib/match";

const QUEUE_INTERVAL = 5000;

const events = ws.events("public-match", {
    server: {
        JOIN_QUEUE: "join-queue",
    },
    client: {
        START: "start",
        PLAYER_DISCONNECT: "player-disconnect",
        PLAYER_RECONNECT: "player-reconnect",
    },
});

export const gateway = ws.gateway((io) => {
    const service = ws.service.init(io);

    setInterval(async () => {
        const queue = await redis.service.get<PublicQueue>(
            constants.redis.PUBLIC_QUEUE,
        );

        const groups = utils.splitArray(queue, constants.MAX_PLAYERS);

        const ready = groups.filter(
            (group) => group.length >= constants.MIN_PLAYERS,
        );

        ready.forEach(async (group) => {
            const match = PublicMatch.init(group);

            await redis.service.set(match.id, match);

            match.players.forEach((player) => {
                const sockets = service.getSocketsByUserId(player.id);

                sockets.forEach((socket) => {
                    socket.join(match.id);

                    socket.on("disconnect", () => {
                        const sockets = service.getSocketsByUserId(player.id);

                        const isDisconnected = sockets.length === 0;

                        if (isDisconnected) {
                            io.to(match.id).emit(
                                events.client.PLAYER_DISCONNECT,
                                {playerId: player.id},
                            );
                        }
                    });

                    socket.on("reconnect", () => {
                        const sockets = service
                            .getSocketsByUserId(player.id)
                            .filter((s) => s.id !== socket.id);

                        const isDisconnected = sockets.length === 0;

                        if (isDisconnected) {
                            io.to(match.id).emit(
                                events.client.PLAYER_RECONNECT,
                                {
                                    playerId: player.id,
                                },
                            );
                        }
                    });
                });
            });

            io.to(match.id).emit(events.client.START, {
                match: open.match.public(match),
            });
        });

        const updated = groups
            .filter((group) => !(group.length >= constants.MIN_PLAYERS))
            .flat();

        await redis.service.set<PublicQueue>(
            constants.redis.PUBLIC_QUEUE,
            updated,
        );
    }, QUEUE_INTERVAL);

    io.on("connection", async (socket) => {
        socket.on(
            events.server.JOIN_QUEUE,
            ws.handler<dtos.JoinPublicQueue>(
                [ws.validate(dtos.JoinPublicQueue)],
                async (payload, acknowledge) => {
                    const queue =
                        (await redis.service.get<PublicQueue>(
                            constants.redis.PUBLIC_QUEUE,
                        )) || [];

                    const isQueued = queue.some(
                        ({id}) => id === socket.request.session.id,
                    );

                    if (isQueued)
                        return acknowledge(false, {
                            msg: "You are already enqueued",
                        });

                    queue.push({
                        id: socket.request.session.id,
                        username: payload.username,
                    });

                    return acknowledge(true);
                },
            ),
        );
    });
});
