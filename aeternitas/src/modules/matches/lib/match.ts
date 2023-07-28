import {nanoid} from "nanoid";

import {PublicMatch as PMatch, PublicQueue} from "../types";
import {pile} from "./pile";

const ID_LENGTH = 13;

export class PublicMatch implements PMatch {
    id: PMatch["id"];
    players: PMatch["players"];
    spectators: PMatch["spectators"];
    piles: PMatch["piles"];
    turn: PMatch["turn"];
    context: PMatch["context"];
    state: PMatch["state"];

    constructor(match: PMatch) {
        this.id = match.id;
        this.players = match.players;
        this.spectators = match.spectators;
        this.piles = match.piles;
        this.turn = match.turn;
        this.context = match.context;
        this.state = match.state;
    }

    static hydrate(match: PMatch) {
        return new PublicMatch(match);
    }

    static init(players: PublicQueue) {
        const {deck, hands} = pile.generate({players: players.length});

        return new PublicMatch({
            id: nanoid(ID_LENGTH),
            turn: 0,
            spectators: [],
            context: {
                attacks: 0,
                noped: false,
                reversed: false,
            },
            state: {
                type: "waiting-for-action",
                start: Date.now(),
            },
            piles: {
                draw: deck,
                discard: [],
            },
            players: players.map((user, idx) => ({
                ...user,
                hand: hands[idx],
                lost: false,
                marked: [],
            })),
        });
    }

    nextTurn() {
        if (this.context.reversed) {
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
        if (this.context.reversed) {
            const previous = this.players[this.turn - 1];

            if (previous) this.turn--;
            else this.turn = this.players.length - 1;
        } else {
            const next = this.players[this.turn];

            if (!next) this.turn = 0;
        }
    }

    get nextPlayer() {
        if (this.context.reversed) {
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
