import {Session} from "express-session";

import {CardName} from "./lib/pile";
import {User} from "@prisma/client";

export interface Card {
    id: string;
    name: CardName;
}

export type MatchType = "waiting-for-action";

export interface PublicMatch {
    id: string;
    players: PublicMatchPlayer[];
    spectators: User[];
    turn: number;
    state: {
        type: MatchType;
        start: number;
        payload?: any;
    };
    context: {
        reversed: boolean;
        noped: boolean;
        attacks: number;
    };
    piles: {
        draw: Card[];
        discard: Card[];
    };
}

export interface PublicMatchPlayer {
    id: string;
    username: string;
    hand: Card[];
    marked: string[];
    lost: boolean;
}

export type PublicQueue = {
    id: Session["id"];
    username: string;
}[];
