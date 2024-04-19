import {useState} from "react";
import {VariantProps, cva, cx} from "class-variance-authority";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {useTranslation} from "react-i18next";

import {Icons} from "@shared/ui/icons";
import {Icon} from "@shared/lib/types";

import {themes, Theme} from "../themes";
import {useThemeStore} from "../store";

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
                variant: {
                    contained: "bg-primary text-primary-contrast",
                    outlined: "",
                },
            },
            defaultVariants: {
                isActive: false,
                variant: "outlined",
            },
        },
    ),
};

interface ThemeDropdownProps
    extends Omit<VariantProps<typeof styles.button>, "isActive">,
        React.ComponentProps<"button"> {
    side?: React.ComponentProps<typeof DropdownMenu.Content>["side"];
    align?: React.ComponentProps<typeof DropdownMenu.Content>["align"];
}

export const ThemeDropdown: React.FC<ThemeDropdownProps> = ({
    side,
    align,
    className,
    variant,
    ...props
}) => {
    const {t} = useTranslation("common");

    const {theme: currentTheme, setTheme} = useThemeStore();

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
                <button {...props}>
                    <Icons.Swatch
                        className={cx(
                            styles.button({
                                isActive: isOpen,
                                variant,
                            }),
                            className,
                        )}
                    />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    loop
                    side={side || "top"}
                    align={align || "end"}
                    className="animate-slide-down-and-fade"
                >
                    <DropdownMenu.Arrow className="fill-paper-secondary w-6 h-3" />

                    <div className="grid grid-cols-1 gap-y-4 bg-paper-secondary rounded-lg p-5">
                        {themes.values.map((theme) => {
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
                                        setTheme(theme);
                                    }}
                                >
                                    <button className="w-full">
                                        <div
                                            data-theme={theme}
                                            className="grid grid-cols-[auto_auto_auto] gap-x-6 p-3 bg-paper-primary items-center"
                                        >
                                            <Icon className="w-5 fill-primary" />

                                            <p className="font-semibold text-base text-paper-contrast">
                                                {t(`theme.${theme}`)}
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
