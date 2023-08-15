import {nanoid} from "nanoid";
import {User} from "@prisma/client";

import {Nullable} from "@lib/types";

import {Card} from "../types";
import {pile} from "./pile";

const ID_LENGTH = 13;

export type MatchStateType = "waiting-for-action";

export interface IMatch {
    id: string;
    turn: number;
    players: MatchPlayer[];
    spectators: MatchSpectator[];
    type: "competitive" | "public";

    piles: {
        draw: Card[];
        discard: Card[];
    };

    context: {
        isReversed: boolean;
        isNoped: boolean;
        attacks: number;
    };

    state: {
        type: MatchStateType;
        start: number;
        payload?: any;
    };
}

interface MatchPlayer {
    id: string;
    username: string;
    avatar: string;
    hasLost: boolean;
    user: Nullable<User>;
    hand: {
        cards: Card[];
        marked: string[];
    };
}

interface MatchSpectator {
    id: string;
    username: string;
    avatar: string;
    user: Nullable<User>;
}

type MatchType = "competitive" | "public";

interface MatchInitOptions {
    type: MatchType;
    players: {
        id: string;
        username: string;
        avatar: string;
        user: Nullable<User>;
    }[];
}

export class Match {
    id: IMatch["id"];
    turn: IMatch["turn"];
    type: IMatch["type"];
    players: IMatch["players"];
    spectators: IMatch["spectators"];
    piles: IMatch["piles"];
    context: IMatch["context"];
    state: IMatch["state"];

    constructor(match: IMatch) {
        this.id = match.id;
        this.players = match.players;
        this.spectators = match.spectators;
        this.piles = match.piles;
        this.turn = match.turn;
        this.context = match.context;
        this.state = match.state;
    }

    static hydrate(match: IMatch) {
        return new Match(match);
    }

    static init(options: MatchInitOptions) {
        const {deck, hands} = pile.generate({players: options.players.length});

        return new Match({
            id: nanoid(ID_LENGTH),
            turn: 0,
            type: options.type,
            spectators: [],
            context: {
                attacks: 0,
                isNoped: false,
                isReversed: false,
            },
            state: {
                type: "waiting-for-action",
                start: Date.now(),
            },
            piles: {
                draw: deck,
                discard: [],
            },
            players: options.players.map((user, idx) => ({
                ...user,
                hasLost: false,
                hand: {
                    cards: hands[idx],
                    marked: [],
                },
            })),
        });
    }

    nextTurn() {
        if (this.context.isReversed) {
            const previous = this.players[this.turn - 1];

            if (previous) this.turn--;
            else this.turn = this.players.length - 1;
        } else {
            const next = this.players[this.turn + 1];

            if (next) this.turn++;
            else this.turn = 0;
        }
    }

    updateTurn() {
        if (this.context.isReversed) {
            const previous = this.players[this.turn - 1];

            if (previous) this.turn--;
            else this.turn = this.players.length - 1;
        } else {
            const next = this.players[this.turn];

            if (!next) this.turn = 0;
        }
    }

    get nextPlayer() {
        if (this.context.isReversed) {
            const previous = this.players[this.turn - 1];

            if (previous) return previous;
            else return this.players[this.players.length - 1];
        } else {
            const next = this.players[this.turn + 1];

            if (next) return next;
            else return this.players[0];
        }
    }
}
