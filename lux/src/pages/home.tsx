import {Button, Center, Fullscreen, H1, H4} from "@shared/ui";
import {ThemeDropdown} from "@shared/lib/theming";
import {LanguageDropdown} from "@shared/lib/i18n";

export const HomePage: React.FC = () => (
    <Fullscreen className="bg-paper-primary bg-home">
        <div className="grid grid-rows-2 gap-y-4 fixed right-2 bottom-2 sm:right-10 sm:bottom-10">
            <LanguageDropdown />
            <ThemeDropdown />
        </div>

        <Center>
            <div className="grid gap-y-32 grid-cols-1 w-full items-center">
                <H1 className="text-paper-contrast text-center font-extrabold">
                    e/kittens.
                </H1>

                <div className="grid grid-cols-1 gap-y-12 w-5/6 sm:w-1/2 md:w-2/3 xl:w-1/2 2xl:w-1/3 m-auto">
                    <H4 className="uppercase text-center">
                        <span className="text-primary font-bold italic">
                            Easiest
                        </span>{" "}
                        and
                        <span className="text-primary font-bold italic">
                            {" "}
                            fastest
                        </span>{" "}
                        way to have some fun
                    </H4>

                    <div className="grid grid-cols-2 gap-x-4 m-auto">
                        <Button
                            size="large"
                            color="primary"
                            variant="contained"
                        >
                            Play!
                        </Button>

                        <Button
                            size="large"
                            color="secondary"
                            variant="outlined"
                        >
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </Center>
    </Fullscreen>
);
