import {IMatch} from "@modules/matches";
import {Nullable} from "@lib/types";

import {SanitizedUser, user} from "./user";

interface SanitizedMatch {
    id: IMatch["id"];
    turn: IMatch["turn"];
    context: IMatch["context"];
    state: IMatch["state"];
    type: IMatch["type"];

    players: {
        id: string;
        username: string;
        avatar: string;
        user: Nullable<SanitizedUser>;
    }[];

    spectators: {
        id: string;
        username: string;
        avatar: string;
        user: Nullable<SanitizedUser>;
    }[];

    piles: {
        draw: number;
        discard: IMatch["piles"]["discard"];
    };
}

export const match = (m: IMatch): SanitizedMatch => {
    const players = m.players.map((player) => ({
        id: player.id,
        username: player.username,
        avatar: player.avatar,
        user: player.user && user(player.user),
        hand: {
            cards: player.hand.cards.length,
            marked: player.hand.marked,
        },
    }));

    const spectators = m.spectators.map((spectator) => ({
        id: spectator.id,
        username: spectator.username,
        avatar: spectator.avatar,
        user: spectator.user && user(spectator.user),
    }));

    return {
        players,
        spectators,
        id: m.id,
        state: m.state,
        context: m.context,
        turn: m.turn,
        type: m.type,
        piles: {
            draw: m.piles.draw.length,
            discard: m.piles.discard,
        },
    };
};
