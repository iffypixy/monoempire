import {create} from "zustand";

export const useGameStore = create<{
    boardSize: number;
    setBoardSize: (size: number) => void;
}>((set) => ({
    boardSize: 0,
    setBoardSize: (size: number) => set({boardSize: size}),
}));

export const useCellSize = () => {
    const boardSize = useGameStore((s) => s.boardSize);

    return boardSize / 11;
};
