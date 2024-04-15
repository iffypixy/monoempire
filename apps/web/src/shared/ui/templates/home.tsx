import React from "react";
import {LuCat} from "react-icons/lu";
import {BiUser} from "react-icons/bi";
import {AiOutlineTrophy} from "react-icons/ai";
import {TbSettings} from "react-icons/tb";
import {IoInformation} from "react-icons/io5";
import {useLocation} from "wouter";
import {cva, cx} from "class-variance-authority";

import {authModel} from "@features/auth";

import {FancyText} from "../molecules";
import {Fullscreen} from "./fullscreen";

const styles = {
    item: cva("flex h-16 pt-4 px-4 relative rounded-t-full", {
        variants: {
            active: {
                true: "bg-paper-primary",
                false: "",
            },
        },
    }),
    icon: cva("w-8 h-8 text-primary cursor-pointer m-auto", {
        variants: {
            active: {
                true: "",
                false: "opacity-30 text-paper-contrast",
            },
        },
    }),
};

interface HomeTemplateProps {
    children?: React.ReactNode;
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({children}) => {
    const credentials = authModel.useCredentials()!;

    const [location, navigate] = useLocation();

    const nav = [
        {Icon: LuCat, location: "/"},
        {Icon: BiUser, location: `/@/${credentials?.username}`},
        {Icon: AiOutlineTrophy, location: "/leaderboard"},
        {Icon: TbSettings, location: "/preferences"},
        {Icon: IoInformation, location: "/about"},
    ];

    return (
        <Fullscreen className="flex flex-col bg-paper-secondary pb-16 px-16">
            <div className="h-24 flex flex-row items-center justify-between">
                <FancyText className="text-lg">{"{mono:empire}"}</FancyText>

                <nav className="flex flex-row space-x-8 items-center mt-auto">
                    {nav.map(({Icon, location: loc}, idx) => (
                        <div
                            key={idx}
                            className={styles.item({active: location === loc})}
                        >
                            {location === loc && (
                                <>
                                    <div className="absolute w-8 h-8 bottom-0 -left-8 overflow-hidden before:absolute before:bottom-0 before:w-[200%] before:h-[200%] before:-left-[100%] before:rounded-full before:shadow-[10px_10px_5px_100px_blue] before:shadow-paper-primary" />
                                    <div className="absolute w-8 h-8 bottom-0 -right-8 overflow-hidden before:absolute before:bottom-0 before:w-[200%] before:h-[200%] before:rounded-full before:shadow-[10px_10px_5px_100px_blue] before:shadow-paper-primary" />
                                </>
                            )}

                            <Icon
                                onClick={() => navigate(loc)}
                                className={cx(
                                    styles.icon({active: location === loc}),
                                )}
                            />
                        </div>
                    ))}
                </nav>

                <img
                    src={credentials?.avatar}
                    alt="avatar"
                    className="w-14 h-14 rounded-full"
                />
            </div>

            <main className="w-full h-full bg-paper-primary rounded-xl shadow-even-md shadow-paper-primary">
                {children}
            </main>
        </Fullscreen>
    );
};
