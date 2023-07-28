import {PublicMatch} from "@modules/matches";

const p = (m: PublicMatch) => {
    const players = m.players.map(({id, username, marked, lost}) => ({
        id,
        username,
        marked,
        lost,
    }));

    return {
        players,
        id: m.id,
        state: m.state,
        context: m.context,
        turn: m.turn,
        spectators: m.spectators,
        piles: {
            draw: m.piles.draw.length,
            discard: m.piles.discard,
        },
    };
};

export const match = {public: p};
