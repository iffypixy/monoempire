import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import io from "socket.io-client";
import {useLocation} from "wouter";

import {Button, Center, FancyText, FullscreenWithNavbar} from "@shared/ui";

export const GuestHomePage: React.FC = () => {
    const {t} = useTranslation("home");

    const [, navigate] = useLocation();

    useEffect(() => {
        const socket = io("http://localhost:8000", {
            withCredentials: true,
        });

        socket.on("connect", () => {
            socket.connect();
        });

        socket.id;
    }, []);

    return (
        <FullscreenWithNavbar className="bg-paper-primary bg-home">
            <Center>
                <div className="grid gap-y-32 grid-cols-1 w-auto items-center justify-center">
                    <FancyText>{"{ mono/empire }"}</FancyText>

                    <div className="grid grid-cols-1 gap-y-12 w-full m-auto">
                        <div className="flex w-full justify-center">
                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                className="mr-6"
                            >
                                {t("button.play")}
                            </Button>

                            <Button
                                size="large"
                                color="secondary"
                                variant="outlined"
                                role="link"
                                onClick={() => navigate("/signup")}
                            >
                                {t("button.sign-up")}
                            </Button>
                        </div>
                    </div>
                </div>
            </Center>
        </FullscreenWithNavbar>
    );
};
