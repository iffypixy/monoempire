import {useTranslation} from "react-i18next";
import {LanguageIcon} from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {cva} from "class-variance-authority";
import {useState} from "react";

import {Flag} from "@shared/ui/icons";

import {languages, Language} from "./config";

type Icon = React.FC<React.SVGProps<SVGSVGElement>>;

const context: Record<
    Language,
    {
        name: string;
        icon: Icon;
    }
> = {
    en: {
        name: "English",
        icon: Flag.UK,
    },
    ae: {
        name: "العربية",
        icon: Flag.UAE,
    },
    cn: {
        name: "中文",
        icon: Flag.China,
    },
    de: {
        name: "Deutsch",
        icon: Flag.Germany,
    },
    es: {
        name: "Español",
        icon: Flag.Spain,
    },
    fr: {
        name: "Français",
        icon: Flag.France,
    },
    il: {
        name: "עברית",
        icon: Flag.Israel,
    },
    jp: {
        name: "日本語",
        icon: Flag.Japan,
    },
    ru: {
        name: "Русский",
        icon: Flag.Russia,
    },
};

const styles = {
    item: cva(
        "flex p-3 bg-paper-primary rounded-lg items-center border-2 hover:border-accent transition-colors duration-300",
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

export const LanguageDropdown: React.FC = () => {
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
                <button>
                    <LanguageIcon
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
                                            <Icon className="w-5 text-primary mr-7" />

                                            <p className="font-semibold text-base text-paper-contrast">
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
