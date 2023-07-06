import {
    MoonIcon,
    SunIcon,
    SwatchIcon,
    FireIcon,
    EyeDropperIcon,
} from "@heroicons/react/24/outline";
import {cva} from "class-variance-authority";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {useSelector} from "react-redux";

import {useDispatch} from "@shared/lib/store";

import {themes, Theme} from "./themes";
import {selectors, actions} from "./model";

type Icon = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
        title?: string;
        titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
>;

interface ThemeContext {
    icon: Icon;
}

const context: Record<Theme, ThemeContext> = {
    light: {
        icon: SunIcon,
    },
    dark: {
        icon: MoonIcon,
    },
    night: {
        icon: FireIcon,
    },
    dracula: {
        icon: EyeDropperIcon,
    },
};

const styles = {
    item: cva(
        "grid grid-cols-[auto_auto_auto] gap-x-6 p-3 bg-paper-primary rounded-lg items-center border-2 hover:border-primary transition-colors",
        {
            variants: {
                isSelected: {
                    true: "border-primary",
                },
            },
            defaultVariants: {
                isSelected: false,
            },
        },
    ),
};

export const ThemeDropdown: React.FC = () => {
    const dispatch = useDispatch();

    const currentTheme = useSelector(selectors.theme);

    return (
        <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild className="outline-none">
                <button>
                    <SwatchIcon className="w-14 text-primary rounded-lg p-2 hover:shadow-even-lg hover:shadow-primary hover:bg-primary hover:text-primary-contrast transition duration-500" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    loop
                    side="top"
                    align="end"
                    className="animate-slide-down-and-fade"
                >
                    <DropdownMenu.Arrow className="fill-paper-secondary w-6 h-3" />

                    <div className="grid grid-cols-1 gap-y-4 bg-paper-secondary rounded-lg p-5">
                        {themes.map((theme) => {
                            const Icon = context[theme].icon;

                            return (
                                <DropdownMenu.Item
                                    key={theme}
                                    data-theme={theme}
                                    className="outline-none"
                                    onSelect={(event) => {
                                        event.preventDefault();
                                    }}
                                    onClick={() => {
                                        dispatch(actions.setTheme({theme}));
                                    }}
                                >
                                    <button className="w-full">
                                        <div
                                            className={styles.item({
                                                isSelected:
                                                    theme === currentTheme,
                                            })}
                                        >
                                            <Icon className="w-5 text-primary" />

                                            <p className="font-semibold text-base text-paper-contrast">
                                                {theme}
                                            </p>

                                            <div className="grid grid-cols-[auto_auto_auto_auto] gap-x-1 m-auto">
                                                <div className="w-2 h-4 rounded-sm bg-primary" />
                                                <div className="w-2 h-4 rounded-sm bg-secondary" />
                                                <div className="w-2 h-4 rounded-sm bg-accent" />
                                                <div className="w-2 h-4 rounded-sm bg-paper-contrast" />
                                            </div>
                                        </div>
                                    </button>
                                </DropdownMenu.Item>
                            );
                        })}
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
