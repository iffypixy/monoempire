import Queue from "bull";
import {User} from "@prisma/client";

import {auth} from "@modules/auth";
import {ws} from "@lib/ws";
import {redis} from "@lib/redis";
import {Callback} from "@lib/types";
import {utils} from "@lib/utils";
import {prisma} from "@lib/prisma";
import {shared} from "@lib/shared";

import {constants} from "../constants";
import {Match} from "../lib/match";

const events = ws.events("competitive-match", {
    server: {
        JOIN_QUEUE: "join-queue",
    },
    client: {
        START: "start",
        PLAYER_RECONNECT: "player-reconnect",
        PLAYER_DISCONNECT: "player-disconnect",
    },
});

const queues = {
    matchmaking: new Queue("competitive-matchmaking"),
};

const startMatchmakingQueue = (cb: Callback) => {
    queues.matchmaking.process(cb);

    queues.matchmaking.add(null, {
        repeat: {
            every: constants.MATCHMAKING_INTERVAL,
        },
    });
};

type CompetitiveMatchmakingQueue = User["id"][];

export const gateway = ws.gateway((io) => {
    const service = ws.service.init(io);

    startMatchmakingQueue(async () => {
        const queue =
            (await redis.service.get<CompetitiveMatchmakingQueue>(
                constants.redis.matchmaking.COMPETITIVE_QUEUE,
            )) || [];

        const groups = utils.splitArray(queue, constants.MAX_PLAYERS);

        const ready = groups.filter(
            (group) => group.length >= constants.MIN_PLAYERS,
        );

        ready.forEach(async (group) => {
            const players = (
                await Promise.all(
                    group.map(async (id) => {
                        const user = await prisma.user.findUnique({
                            where: {id},
                        });

                        if (!user) return null;

                        return {
                            id,
                            username: user.username,
                            avatar: user.avatar,
                            user,
                        };
                    }),
                )
            ).filter(Boolean);

            const match = Match.init({type: "competitive", players});

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
                match: shared.match(match),
            });
        });

        const updated = groups
            .filter((group) => !(group.length >= constants.MIN_PLAYERS))
            .flat();

        await redis.service.set<CompetitiveMatchmakingQueue>(
            constants.redis.matchmaking.COMPETITIVE_QUEUE,
            updated,
        );
    });

    io.on("connection", (socket) => {
        const isPermitted = auth.guards.isAuthenticated.ws(socket);

        if (!isPermitted) return;
    });
});
