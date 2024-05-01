import {PlayerCard} from "./player-card";
import {useGameStore} from "../store";

export const BoardContent: React.FC = () => {
    const {boardSize} = useGameStore();

    const offset = (boardSize / 11) * 1.5;

    return (
        <div
            className="absolute"
            style={{
                left: offset,
                top: offset,
                right: offset,
                bottom: offset,
            }}
        >
            <div className="relative w-full h-full flex flex-col justify-between space-y-[3%] p-[2%]">
                <div className="flex rounded-xl justify-between items-center w-full h-[30%]">
                    <div className="flex w-[40%] h-full space-x-[5%]">
                        <PlayerCard username="iffypixy" color="ORANGE" />
                        <PlayerCard username="imanrzh" color="BLUE" />
                    </div>

                    <div className="w-[15%] h-full flex flex-col items-center justify-center space-y-4">
                        <div className="flex flex-col items-center text-paper-contrast uppercase font-bold">
                            <span>Round</span>

                            <span>#2</span>
                        </div>

                        <div className="w-full aspect-square rounded-md border bg-paper-primary border-paper-secondary relative">
                            <div className="absolute left-1 bottom-1 rounded-2xl w-[55%] h-[4px] translate-x-[2px] translate-y-[2px] bg-primary/30 -rotate-45 origin-bottom-left" />
                            <div className="absolute left-1 top-1 rounded-2xl w-[55%] h-[4px] translate-x-[2px] translate-y-[-2px] bg-secondary/30 rotate-45 origin-top-left" />
                            <div className="absolute right-1 bottom-1 rounded-2xl w-[55%] h-[4px] translate-x-[-2px] translate-y-[2px] bg-accent/30 rotate-45 origin-bottom-right" />
                            <div className="absolute right-1 top-1 rounded-2xl w-[55%] h-[4px] translate-x-[-2px] translate-y-[-2px] bg-primary/30 -rotate-45 origin-top-right" />
                        </div>
                    </div>

                    <div className="flex w-[40%] h-full space-x-[5%]">
                        <PlayerCard username="1an4ik" color="YELLOW" />

                        <PlayerCard username="akhan" color="GREEN" />
                    </div>
                </div>

                <div className="flex bg-paper-primary border border-paper-secondary w-full flex-1 rounded-md"></div>
            </div>
        </div>
    );
};
