import {AiOutlinePlusCircle} from "react-icons/ai";
import {GiPlayButton} from "react-icons/gi";

import {HomeTemplate} from "@shared/ui";

export const AuthenticatedHomePage: React.FC = () => {
    const stats = [
        {key: "Matches", value: 0},
        {key: "Wins", value: 0},
        {key: "Losses", value: 0},
        {key: "Winrate %", value: 0},
    ];

    return (
        <HomeTemplate>
            <div className="w-full h-full flex flex-row justify-between p-14">
                <div className="flex flex-col justify-center items-center w-[55%]">
                    <div className="flex flex-col space-y-6 justify-center items-center">
                        <div className="p-6 flex flex-col border-paper-secondary border-4 border-b-8 space-y-4 w-2/3 hover:border-paper-contrast transition-colors duration-200 cursor-pointer">
                            <GiPlayButton className="w-12 h-12 fill-primary" />
                            <span className="font-extrabold uppercase">
                                Play
                            </span>
                            <span className="text-sm font-normal opacity-70">
                                Tap this button to enter the matchmaking queue,
                                where you'll be matched with other players for a
                                game or match.
                            </span>
                        </div>

                        <div className="p-6 flex flex-col border-paper-secondary border-4 border-b-8 space-y-4 w-2/3 hover:border-paper-contrast transition-colors duration-200 cursor-pointer">
                            <AiOutlinePlusCircle className="w-12 h-12 fill-primary" />
                            <span className="font-extrabold uppercase">
                                Custom
                            </span>
                            <span className="text-sm font-normal opacity-70">
                                Select this option to create a customized room
                                or environment tailored to your preferences.
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-around border-l-4 border-paper-secondary w-[35%] p-8">
                    <div className="w-72 h-72 flex flex-col justify-center items-center border-accent border-[3rem] rounded-full shadow-even-md shadow-accent">
                        <span className="text-md font-medium uppercase opacity-70">
                            Rating
                        </span>
                        <span className="text-4xl font-extrabold text-accent">
                            1,200
                        </span>
                    </div>

                    <div className="flex flex-col space-y-4 w-full px-24">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex justify-between">
                                <span className="uppercase text-lg font-semibold text-paper-contrast">
                                    {stat.key}
                                </span>

                                <span className="uppercase text-lg font-semibold text-accent">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HomeTemplate>
    );
};
