import {ws} from "@lib/ws";
import {redis} from "@lib/redis";

import * as dtos from "../dtos";
import {constants} from "../constants";
import {PublicMatch} from "../lib/match";

const events = ws.events("match", {
    client: {},
    server: {
        PLAY_CARD: "play-card",
        NOPE: "nope",
        JOIN: "join",
    },
});

export const gateway = ws.gateway((io) => {
    io.on("connection", (socket) => {
        socket.on(
            events.server.PLAY_CARD,
            ws.validate(dtos.PlayCard, async (payload, acknowledge) => {
                const match = await redis.service.get<PublicMatch>(
                    `${constants.redis.MATCH}:${payload.matchId}`,
                );

                if (!match) return acknowledge(false, {msg: "No match found"});

                const isPlayer = match.players.some(
                    (player) => player.id === socket.request.session.userId,
                );

                if (!isPlayer)
                    return acknowledge(false, {
                        msg: "You are not a player of the match",
                    });
            }),
        );
    });
});
