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
import {useState} from "react";

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
        "border-2 rounded-lg outline-none overflow-hidden hover:border-accent transition-colors duration-300",
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
        "w-14 text-primary rounded-lg p-2 hover:shadow-even-lg hover:shadow-primary hover:bg-primary hover:text-primary-contrast transition duration-500",
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
                    <SwatchIcon className={styles.button({isActive: isOpen})} />
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
                            const {icon: Icon} = context[theme];

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
