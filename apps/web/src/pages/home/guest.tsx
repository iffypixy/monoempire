import {useTranslation} from "react-i18next";
import {useLocation} from "wouter";

import {Button, Center, FancyText, FullscreenWithNavbar} from "@shared/ui";

export const GuestHomePage: React.FC = () => {
    const {t} = useTranslation("home");

    const [, navigate] = useLocation();

    return (
        <FullscreenWithNavbar className="bg-paper-primary bg-home">
            <Center>
                <div className="grid gap-y-32 grid-cols-1 w-auto items-center justify-center">
                    <FancyText>{"{mønøempire}"}</FancyText>

                    <div className="grid grid-cols-1 gap-y-12 w-full m-auto">
                        <div className="flex flex-col space-y-4 w-full m-auto items-center">
                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
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
