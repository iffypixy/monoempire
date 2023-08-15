import {IMatch} from "@modules/matches";
import {Nullable} from "@lib/types";

import {SharedUser, user} from "./user";

interface SharedMatch {
    id: IMatch["id"];
    turn: IMatch["turn"];
    context: IMatch["context"];
    state: IMatch["state"];
    type: IMatch["type"];

    players: {
        id: string;
        username: string;
        avatar: string;
        user: Nullable<SharedUser>;
    }[];

    spectators: {
        id: string;
        username: string;
        avatar: string;
        user: Nullable<SharedUser>;
    }[];

    piles: {
        draw: number;
        discard: IMatch["piles"]["discard"];
    };
}

export const match = (m: IMatch): SharedMatch => {
    const players = m.players.map((player) => ({
        id: player.id,
        username: player.username,
        avatar: player.avatar,
        user: user(player.user),
        hand: {
            cards: player.hand.cards.length,
            marked: player.hand.marked,
        },
    }));

    const spectators = m.spectators.map((spectator) => ({
        ...spectator,
        user: user(spectator.user),
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
