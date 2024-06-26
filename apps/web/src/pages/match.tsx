import {useEffect} from "react";

import {Center, Fullscreen} from "@shared/ui";
import {
    map,
    BoardCell,
    BoardContent,
    PlayerTokens,
    useGameStore,
} from "@entities/game";

export const MatchPage: React.FC = () => {
    const {setBoardSize} = useGameStore();

    useEffect(() => {
        const board = document.getElementById("board")!;

        setBoardSize(board.offsetWidth);
    }, [setBoardSize]);

    return (
        <Fullscreen className="bg-home">
            <Center>
                <div
                    id="board"
                    className="w-[min(90vw,90vh)] h-[min(90vw,90vh)] relative"
                >
                    <div className="absolute left-0 top-0 w-full h-full">
                        <div className="relative w-full h-full">
                            {map.map((_, idx) => (
                                <BoardCell key={idx} cellIndex={idx} />
                            ))}
                        </div>
                    </div>

                    <BoardContent />
                    <PlayerTokens />
                </div>
            </Center>
        </Fullscreen>
    );
};
