import {useEffect} from "react";
import {twMerge} from "tailwind-merge";
import {cx} from "class-variance-authority";

import {getCellSide, map} from "../lib";
import {useGameStore} from "../store";

interface BoardCellProps {
    cellIndex: number;
}

export const BoardCell: React.FC<BoardCellProps> = ({cellIndex}) => {
    const {boardSize, setBoardSize} = useGameStore();

    useEffect(() => {
        const board = document.getElementById("board")!;

        setBoardSize(board.offsetWidth);
    }, []);

    const cell = map[cellIndex];

    const sideIndex = cellIndex % 9;

    const isEdge = sideIndex === 0;

    const cellSize = boardSize / 11;
    const edgeSize = cellSize * 1.5;

    const side = getCellSide(cellIndex);

    const ifNotEdge = (value: any) => (!isEdge ? value : "initial");

    const isStatic =
        isEdge || cell.type == "POWER-TAX" || cell.type === "RIVAL-TOWER-TAX";

    const isSpecial =
        cell.type === "EMPIRE-CARD" ||
        cell.type === "CHANCE-CARD" ||
        cell.type === "ELECTRIC-COMPANY" ||
        cell.type === "WATER-WORKS";

    const edge = cellIndex / 9;

    return (
        <div
            style={{
                width: edgeSize,
                height: isEdge ? edgeSize : cellSize,
                transform: ifNotEdge(
                    {
                        0: `rotate(-90deg) translate(${
                            -cellSize / 2
                        }px, ${cellSize}px)`,
                        2: `rotate(-90deg) translateY(${cellSize * 1.5}px)`,
                    }[side],
                ),
                left: isEdge
                    ? {
                          0: 0,
                          3: 0,
                      }[edge]
                    : {
                          0:
                              cellSize * Math.max(0, sideIndex - 1) +
                              edgeSize * Number(sideIndex !== 0),
                          3: 0,
                      }[side],

                top: isEdge
                    ? {
                          0: 0,
                          1: 0,
                      }[edge]
                    : {
                          0: 0,
                          1:
                              cellSize * Math.max(0, sideIndex - 1) +
                              edgeSize * Number(sideIndex !== 0),
                      }[side],

                right: isEdge
                    ? {
                          1: 0,
                          2: 0,
                      }[edge]
                    : {
                          1: 0,
                          2:
                              cellSize * Math.max(0, sideIndex - 1) +
                              edgeSize * Number(sideIndex !== 0),
                      }[side],
                bottom: isEdge
                    ? {
                          2: 0,
                          3: 0,
                      }[edge]
                    : {
                          2: 0,
                          3:
                              cellSize * Math.max(0, sideIndex - 1) +
                              edgeSize * Number(sideIndex !== 0),
                      }[side],
            }}
            className="absolute origin-bottom-left p-1"
        >
            {!!cell.price && (
                <div
                    className="absolute h-8 px-1"
                    style={{
                        left: {
                            0: "calc(100% + 2rem)",
                            1: "calc(100% + 2rem)",
                            2: 0,
                            3: 0,
                        }[side],
                        top: {
                            0: 0,
                            1: 0,
                            2: 0,
                        }[side],
                        bottom: {
                            3: 0,
                        }[side],
                        transform: {
                            0: "rotate(90deg)",
                            1: "rotate(90deg)",
                            2: "rotate(90deg)",
                            3: "rotate(-90deg)",
                        }[side],
                        transformOrigin: {
                            0: "left top",
                            1: "left top",
                            2: "left top",
                            3: "left bottom",
                        }[side],
                        width: cellSize,
                    }}
                >
                    <div className="w-full h-full bg-paper-primary border border-paper-secondary rounded-md text-paper-contrast/60 text-center flex items-center justify-center text-xs">
                        {cell.price}
                    </div>
                </div>
            )}

            <div
                className={twMerge(
                    cx(
                        "w-full h-full text-paper-contrast bg-paper-primary border rounded-md flex justify-center items-center p-[15%]",
                        {
                            "border-primary/20": !isEdge,
                            "border-accent/20": isStatic,
                            "border-secondary/20": isSpecial,
                        },
                    ),
                )}
            >
                <cell.Icon
                    className={twMerge(
                        cx("w-full h-full", {
                            "fill-primary": !isEdge,
                            "fill-accent": isStatic,
                            "fill-secondary": isSpecial,
                        }),
                    )}
                />
            </div>
        </div>
    );
};
