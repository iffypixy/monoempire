import {nanoid} from "nanoid";

import {utils} from "@lib/utils";

export type CardName =
    | "exploding-kitten"
    | "defuse"
    | "attack"
    | "shuffle"
    | "skip"
    | "nope"
    | "favor"
    | "see-the-future-3x"
    | "see-the-future-5x"
    | "targeted-attack"
    | "alter-the-future-3x"
    | "alter-the-future-5x"
    | "draw-from-the-bottom"
    | "imploding-kitten-open"
    | "imploding-kitten-closed"
    | "reverse"
    | "streaking-kitten"
    | "garbage-collection"
    | "super-skip"
    | "swap-top-and-bottom"
    | "catomic-bomb"
    | "mark"
    | "bury"
    | "personal-attack"
    | "share-the-future-3x"
    | "cat-card-rainbow-ralphing-cat"
    | "cat-card-hairy-potato-cat"
    | "cat-card-tacocat"
    | "cat-card-cattermelon"
    | "cat-card-beard-cat"
    | "barking-kitten"
    | "ill-take-that"
    | "potluck"
    | "tower-of-power"
    | "feral-cat"
    | "zombie-kitten"
    | "clairvoyance"
    | "feed-the-dead"
    | "clone"
    | "grave-robber"
    | "dig-deeper"
    | "attack-of-the-dead"
    | "cat-card-vampire-cat"
    | "cat-card-de-cat-itated"
    | "cat-card-electrocat"
    | "cat-card-cat-o-lantern";

type DeckExpansion =
    | "streaking-kittens"
    | "imploding-kittens"
    | "barking-kittens"
    | "zombie-kittens";

interface Cards {
    all: CardName[];
    default: CardName[];
    core: CardName[];
    special: CardName[];
    expansions: Record<DeckExpansion, CardName[]>;
}

const cards: Cards = {
    all: [
        "exploding-kitten",
        "defuse",
        "attack",
        "shuffle",
        "skip",
        "nope",
        "favor",
        "see-the-future-3x",
        "see-the-future-5x",
        "targeted-attack",
        "alter-the-future-3x",
        "alter-the-future-5x",
        "draw-from-the-bottom",
        "imploding-kitten-open",
        "imploding-kitten-closed",
        "reverse",
        "streaking-kitten",
        "garbage-collection",
        "super-skip",
        "swap-top-and-bottom",
        "catomic-bomb",
        "mark",
        "bury",
        "personal-attack",
        "share-the-future-3x",
        "cat-card-rainbow-ralphing-cat",
        "cat-card-hairy-potato-cat",
        "cat-card-tacocat",
        "cat-card-cattermelon",
        "cat-card-beard-cat",
        "barking-kitten",
        "ill-take-that",
        "potluck",
        "tower-of-power",
        "feral-cat",
        "zombie-kitten",
        "clairvoyance",
        "feed-the-dead",
        "clone",
        "grave-robber",
        "dig-deeper",
        "attack-of-the-dead",
        "cat-card-vampire-cat",
        "cat-card-de-cat-itated",
        "cat-card-electrocat",
        "cat-card-cat-o-lantern",
    ],
    core: [
        "exploding-kitten",
        "defuse",
        "shuffle",
        "see-the-future-3x",
        "attack",
        "nope",
        "skip",
        "favor",
        "cat-card-beard-cat",
        "cat-card-cattermelon",
        "cat-card-hairy-potato-cat",
        "cat-card-rainbow-ralphing-cat",
    ],
    default: [
        "exploding-kitten",
        "defuse",
        "attack",
        "shuffle",
        "skip",
        "nope",
        "favor",
        "see-the-future-3x",
        "see-the-future-5x",
        "targeted-attack",
        "alter-the-future-3x",
        "alter-the-future-5x",
        "draw-from-the-bottom",
        "reverse",
        "garbage-collection",
        "super-skip",
        "swap-top-and-bottom",
        "catomic-bomb",
        "mark",
        "bury",
        "personal-attack",
        "share-the-future-3x",
        "cat-card-rainbow-ralphing-cat",
        "cat-card-hairy-potato-cat",
        "cat-card-tacocat",
        "cat-card-cattermelon",
        "cat-card-beard-cat",
        "potluck",
        "feral-cat",
        "clone",
        "dig-deeper",
        "cat-card-vampire-cat",
    ],
    special: [
        "defuse",
        "exploding-kitten",
        "streaking-kitten",
        "imploding-kitten-closed",
        "barking-kitten",
        "zombie-kitten",
    ],
    expansions: {
        "streaking-kittens": [
            "streaking-kitten",
            "super-skip",
            "see-the-future-5x",
            "alter-the-future-5x",
            "swap-top-and-bottom",
            "garbage-collection",
            "catomic-bomb",
            "mark",
        ],
        "imploding-kittens": [
            "imploding-kitten-closed",
            "reverse",
            "draw-from-the-bottom",
            "feral-cat",
            "alter-the-future-3x",
            "targeted-attack",
        ],
        "barking-kittens": [
            "barking-kitten",
            "bury",
            "personal-attack",
            "share-the-future-3x",
            "tower-of-power",
            "ill-take-that",
            "super-skip",
            "potluck",
        ],
        "zombie-kittens": [
            "zombie-kitten",
            "clairvoyance",
            "attack-of-the-dead",
            "feed-the-dead",
            "clone",
            "grave-robber",
            "dig-deeper",
            "cat-card-cat-o-lantern",
            "cat-card-de-cat-itated",
            "cat-card-electrocat",
            "cat-card-vampire-cat",
        ],
    },
};

const distribution: Partial<Record<CardName, (players: number) => number>> = {
    defuse: (n) => Math.floor(n * 1.2),
    "exploding-kitten": (n) => n - 1,
    "streaking-kitten": (n) => Math.floor(n / 5),
    "imploding-kitten-closed": (n) => Math.floor(n / 5),
    "barking-kitten": (n) => Math.floor(n / 4) * 2,
    "zombie-kitten": (n) => n,
};

const CARDS_PER_HAND = 8;

interface PileGenerateOptions {
    players: number;
    deck?: "default" | "random" | "core";
    expansions?: DeckExpansion[];
}

const generate = (options: PileGenerateOptions) => {
    const {players, deck: type = "default", expansions = []} = options;

    let deck: CardName[];

    if (type === "default") deck = cards.default;
    else if (type === "core")
        deck = [
            ...cards.core,
            ...expansions
                .map((expansion) => cards.expansions[expansion])
                .flat(),
        ].filter((card, idx, deck) => deck.indexOf(card) === idx);
    else if (type === "random")
        deck = [
            ...utils
                .shuffle(cards.all)
                .slice(0, Math.floor(Math.random() * cards.all.length) + 1),
            "exploding-kitten",
        ].filter((card, idx, deck) => deck.indexOf(card) === idx) as CardName[];

    const special = cards.special.filter((card) => deck.includes(card));
    const regular = deck.filter((card) => !special.includes(card));

    const total = players * 5;

    const pile = new Array(total).map(() => utils.random(regular));

    special.forEach((card) =>
        pile.push(...new Array(distribution[card](players)).fill(card)),
    );

    const hands = new Array(players).map(() => [
        ...new Array(CARDS_PER_HAND - 1).map(() => utils.random(regular)),
        "defuse",
    ]) as CardName[][];

    return {
        deck: utils.shuffle(pile.map((name) => ({name, id: nanoid()}))),
        hands: hands.map((hand) =>
            utils.shuffle(hand.map((name) => ({name, id: nanoid()}))),
        ),
    };
};

export const pile = {generate};
