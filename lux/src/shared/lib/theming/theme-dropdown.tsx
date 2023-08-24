import {useState} from "react";
import {useSelector} from "react-redux";
import {HiOutlineSwatch} from "react-icons/hi2";
import {cva} from "class-variance-authority";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {useDispatch} from "@shared/lib/store";
import {Icons} from "@shared/ui/icons";
import {Icon} from "@shared/lib/types";

import {themes, Theme} from "./themes";
import {selectors, actions} from "./model";

interface ThemeContext {
    icon: Icon;
}

const contexts: Record<Theme, ThemeContext> = {
    light: {
        icon: Icons.Sun,
    },
    dark: {
        icon: Icons.BatMoon,
    },
    night: {
        icon: Icons.CloudyMoon,
    },
    dracula: {
        icon: Icons.BloodKnife,
    },
};

const styles = {
    item: cva(
        "border-4 rounded-lg outline-none overflow-hidden hover:border-accent transition-colors duration-300",
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
    button: cva(
        "w-14 h-14 text-primary rounded-lg p-2 hover:shadow-even-lg hover:shadow-primary hover:bg-primary hover:text-primary-contrast transition duration-500",
        {
            variants: {
                isActive: {
                    true: "shadow-primary shadow-even-lg bg-primary text-primary-contrast",
                },
            },
            defaultVariants: {
                isActive: false,
            },
        },
    ),
};

export const ThemeDropdown: React.FC = () => {
    const dispatch = useDispatch();

    const currentTheme = useSelector(selectors.theme);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu.Root
            modal={false}
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
            }}
        >
            <DropdownMenu.Trigger asChild className="outline-none">
                <button>
                    <HiOutlineSwatch
                        className={styles.button({isActive: isOpen})}
                    />
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
                            const {icon: Icon} = contexts[theme];

                            return (
                                <DropdownMenu.Item
                                    key={theme}
                                    className={styles.item({
                                        isSelected: theme === currentTheme,
                                    })}
                                    onSelect={(event) => {
                                        event.preventDefault();
                                    }}
                                    onClick={() => {
                                        dispatch(actions.setTheme({theme}));
                                    }}
                                >
                                    <button className="w-full">
                                        <div
                                            data-theme={theme}
                                            className="grid grid-cols-[auto_auto_auto] gap-x-6 p-3 bg-paper-primary items-center"
                                        >
                                            <Icon className="w-5 fill-primary" />

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
