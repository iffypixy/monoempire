import {ws} from "@lib/ws";
import {redis} from "@lib/redis";
import {validation} from "@lib/validation";

import * as dtos from "../dtos";
import {constants} from "../constants";
import {IMatch} from "../lib/match";

const events = ws.events("match", {
    client: {},
    server: {
        PLAY_CARD: "play-card",
        NOPE: "nope",
        JOIN: "join",
        RESIGN: "resign",
    },
});

export const gateway = ws.gateway((io) => {
    io.on("connection", (socket) => {
        socket.on(
            events.server.PLAY_CARD,
            ws.handler<dtos.PlayCard>(
                [validation.check.ws(dtos.PlayCard)],
                async (payload, acknowledge) => {
                    const match = await redis.service.get<IMatch>(
                        `${constants.redis.MATCH}:${payload.matchId}`,
                    );

                    if (!match)
                        return acknowledge(false, {msg: "No match found"});

                    const isPlayer = match.players.some(
                        (player) => player.id === socket.request.session.userId,
                    );

                    if (!isPlayer)
                        return acknowledge(false, {
                            msg: "You are not a player of the match",
                        });
                },
            ),
        );
    });
});
