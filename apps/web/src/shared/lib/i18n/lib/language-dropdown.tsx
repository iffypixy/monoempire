import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {cva, VariantProps, cx} from "class-variance-authority";

import {Icon} from "@shared/lib/types";
import {Icons} from "@shared/ui/icons";

import {languages, type Language} from "../config";

const context: Record<
    Language,
    {
        name: string;
        icon: Icon;
    }
> = {
    en: {
        name: "English",
        icon: Icons.Flags.UK,
    },
    ae: {
        name: "العربية",
        icon: Icons.Flags.UAE,
    },
    cn: {
        name: "中文",
        icon: Icons.Flags.China,
    },
    de: {
        name: "Deutsch",
        icon: Icons.Flags.Germany,
    },
    es: {
        name: "Español",
        icon: Icons.Flags.Spain,
    },
    fr: {
        name: "Français",
        icon: Icons.Flags.France,
    },
    il: {
        name: "עברית",
        icon: Icons.Flags.Israel,
    },
    jp: {
        name: "日本語",
        icon: Icons.Flags.Japan,
    },
    ru: {
        name: "Русский",
        icon: Icons.Flags.Russia,
    },
};

const styles = {
    item: cva(
        "flex p-3 bg-paper-primary rounded-lg items-center border-4 hover:border-accent transition-colors duration-300",
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

interface LanguageDropdownProps
    extends Omit<VariantProps<typeof styles.button>, "isActive">,
        React.ComponentProps<"button"> {
    side?: React.ComponentProps<typeof DropdownMenu.Content>["side"];
    align?: React.ComponentProps<typeof DropdownMenu.Content>["align"];
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
    side,
    align,
    variant,
    className,
    ...props
}) => {
    const {i18n} = useTranslation();

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
                    <Icons.Language
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

                    <div className="grid grid-cols-1 gap-y-4 w-56 bg-paper-secondary rounded-lg p-5">
                        {languages.map((language) => {
                            const {name, icon: Icon} = context[language];

                            return (
                                <DropdownMenu.Item
                                    key={name}
                                    className="outline-none"
                                    onSelect={(event) => {
                                        event.preventDefault();
                                    }}
                                    onClick={() => {
                                        i18n.changeLanguage(language);
                                    }}
                                >
                                    <button className="w-full">
                                        <div
                                            className={styles.item({
                                                isSelected:
                                                    language === i18n.language,
                                            })}
                                        >
                                            <Icon className="w-5 text-primary mr-5" />

                                            <p className="lowercase font-semibold text-base text-paper-contrast">
                                                {name}
                                            </p>
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
