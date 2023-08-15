const redis = {
    matchmaking: {
        PUBLIC_QUEUE: "public-matchmaking-queue",
        COMPETITIVE_QUEUE: "competitive-matchmaking-queue",
    },
    MATCH: "match",
};

const MAX_PLAYERS = 10;
const MIN_PLAYERS = 2;

const MATCHMAKING_INTERVAL = 3000;

export const constants = {
    redis,
    MAX_PLAYERS,
    MIN_PLAYERS,
    MATCHMAKING_INTERVAL,
};
