import tinycolor from "tinycolor2";

import {Icons} from "@shared/ui";

import {PLAYER_COLORS} from "../lib";

interface PlayerCardProps {
    username: string;
    color: keyof typeof PLAYER_COLORS;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
    username,
    color: colorKey,
}) => {
    const color = PLAYER_COLORS[colorKey];

    const border = tinycolor(color).setAlpha(0.6).toRgbString();

    return (
        <div
            style={{fill: color, borderColor: border}}
            className="flex flex-col rounded-md border items-center w-[50%] h-full"
        >
            <div
                style={{borderColor: border}}
                className="w-full text-center py-2 bg-paper-primary border-b rounded-t-lg"
            >
                <span
                    style={{color}}
                    className="font-bold uppercase text-[0.75rem]"
                >
                    {username}
                </span>
            </div>

            <div className="w-full h-full flex flex-col bg-paper-primary rounded-b-lg space-y-0.5 py-2 px-3">
                <div className="flex items-center space-x-3">
                    <Icons.Money className="w-4 h-auto" />

                    <span className="font-normal text-[0.7rem] text-white/75">
                        1000
                    </span>
                </div>

                <div className="flex items-center space-x-3">
                    <Icons.Prize className="w-4 h-auto" />

                    <span className="font-normal text-[0.7rem] text-white/75">
                        50
                    </span>
                </div>
            </div>
        </div>
    );
};
