import {useState} from "react";
import tinycolor from "tinycolor2";

import {useCellSize} from "../store";
import {getCellSide, PLAYER_COLORS} from "../lib";

export const PlayerTokens: React.FC = () => {
    const [tokens] = useState([
        {id: "123", index: 0},
        {id: "456", index: 0},
        {id: "789", index: 0},
        {id: "123456", index: 0},
    ]);

    const cellSize = useCellSize();

    if (!cellSize) return null;

    const colors = [
        PLAYER_COLORS.BLUE,
        PLAYER_COLORS.GREEN,
        PLAYER_COLORS.ORANGE,
        PLAYER_COLORS.YELLOW,
    ];

    const edgeSize = cellSize * 1.5;

    return (
        <div className="w-full h-full absolute">
            <div className="w-full h-full relative">
                {tokens.map(({id, index: tokenIndex}, idx) => {
                    const side = getCellSide(tokenIndex);
                    const rowIndex = tokenIndex % 9;

                    const isEdge = tokenIndex % 9 === 0;
                    const edge = tokenIndex / 9;

                    const neighbours = tokens.filter(
                        (t) => t.index === tokenIndex,
                    );

                    const neighbourIndex = neighbours.findIndex(
                        (n) => n.id === id,
                    );

                    const width = isEdge
                        ? [0.4, 0.35, 0.3, 0.25][neighbours.length - 1] *
                          edgeSize
                        : [0.5, 0.4, 0.3, 0.25][neighbours.length - 1] *
                          cellSize;

                    const color = colors[idx];

                    return (
                        <div
                            key={idx}
                            className="absolute aspect-square bg-accent border-paper-contrast rounded-full transition-[left,top,width,height] ease duration-[2s] origin-bottom-left"
                            style={{
                                width,
                                color,
                                borderWidth: width * 0.15,
                                backgroundColor: color,
                                borderColor: tinycolor(color)
                                    .darken(25)
                                    .toHexString(),
                                left: isEdge
                                    ? {
                                          0:
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.5,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] -
                                              width / 2,
                                          1: `calc(100% - ${
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.5,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] +
                                              width / 2
                                          }px)`,
                                          2: `calc(100% - ${
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.5,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] +
                                              width / 2
                                          }px)`,
                                          3:
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.5,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] -
                                              width / 2,
                                      }[edge]
                                    : {
                                          0:
                                              cellSize *
                                                  Math.max(0, rowIndex - 1) +
                                              edgeSize *
                                                  Number(rowIndex !== 0) +
                                              cellSize / 2 -
                                              width / 2,
                                          1: `calc(100% - ${
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.3,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.75,
                                                      edgeSize * 0.5,
                                                      edgeSize * 0.25,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.8,
                                                      edgeSize * 0.6,
                                                      edgeSize * 0.4,
                                                      edgeSize * 0.2,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] +
                                              width / 2
                                          }px)`,
                                          2: `calc(100% - ${
                                              cellSize *
                                                  Math.max(0, rowIndex - 1) +
                                              edgeSize *
                                                  Number(rowIndex !== 0) +
                                              cellSize -
                                              cellSize / 2 +
                                              width / 2
                                          }px)`,
                                          3:
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.3,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.75,
                                                      edgeSize * 0.5,
                                                      edgeSize * 0.25,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.8,
                                                      edgeSize * 0.6,
                                                      edgeSize * 0.4,
                                                      edgeSize * 0.2,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] -
                                              width / 2,
                                      }[side],
                                top: isEdge
                                    ? {
                                          0:
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.5,
                                                      edgeSize * 0.5,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.7,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] -
                                              width / 2,
                                          1:
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.5,
                                                      edgeSize * 0.5,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.7,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] -
                                              width / 2,
                                          2: `calc(100% - ${
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.5,
                                                      edgeSize * 0.5,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.7,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] +
                                              width / 2
                                          }px)`,
                                          3: `calc(100% - ${
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.5,
                                                      edgeSize * 0.5,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.3,
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.7,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] +
                                              width / 2
                                          }px)`,
                                      }[edge]
                                    : {
                                          0:
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.3,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.75,
                                                      edgeSize * 0.5,
                                                      edgeSize * 0.25,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.8,
                                                      edgeSize * 0.6,
                                                      edgeSize * 0.4,
                                                      edgeSize * 0.2,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] -
                                              width / 2,
                                          1:
                                              cellSize *
                                                  Math.max(0, rowIndex - 1) +
                                              edgeSize *
                                                  Number(rowIndex !== 0) +
                                              cellSize / 2 -
                                              width / 2,
                                          2: `calc(100% - ${
                                              {
                                                  1: [edgeSize * 0.5],
                                                  2: [
                                                      edgeSize * 0.7,
                                                      edgeSize * 0.3,
                                                  ],
                                                  3: [
                                                      edgeSize * 0.75,
                                                      edgeSize * 0.5,
                                                      edgeSize * 0.25,
                                                  ],
                                                  4: [
                                                      edgeSize * 0.8,
                                                      edgeSize * 0.6,
                                                      edgeSize * 0.4,
                                                      edgeSize * 0.2,
                                                  ],
                                              }[neighbours.length]![
                                                  neighbourIndex
                                              ] +
                                              width / 2
                                          }px)`,
                                          3: `calc(100% - ${
                                              cellSize *
                                                  Math.max(0, rowIndex - 1) +
                                              edgeSize *
                                                  Number(rowIndex !== 0) +
                                              cellSize -
                                              cellSize / 2 +
                                              width / 2
                                          }px)`,
                                      }[side],
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
