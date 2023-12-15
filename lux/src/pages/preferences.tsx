import * as Select from "@radix-ui/react-select";
import React from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {BiSolidChevronDown} from "react-icons/bi";

import {Center, HomeTemplate} from "@shared/ui";
import {Theme, themes, themingModel} from "@shared/lib/theming";
import {languages} from "@shared/lib/i18n";
import {useDispatch} from "@shared/lib/store";

export const PreferencesPage: React.FC = () => {
    const dispatch = useDispatch();

    const theme = useSelector(themingModel.selectors.theme);
    const {i18n} = useTranslation();

    const [settings, setSettings] = React.useState({
        theme: {
            selected: theme,
            options: themes,
        },
        language: {
            selected: i18n.language,
            options: languages,
        },
    });

    React.useEffect(() => {
        dispatch(
            themingModel.actions.setTheme({theme: settings.theme.selected}),
        );
    }, [dispatch, settings.theme.selected]);

    return (
        <HomeTemplate>
            <Center>
                <div className="flex flex-col w-1/3">
                    {Object.keys(settings).map((setting) => {
                        const context =
                            settings[setting as keyof typeof settings];

                        return (
                            <div
                                key={setting}
                                className="w-full flex flex-row justify-between items-center border-b border-paper-contrast/25 py-3"
                            >
                                <span className="uppercase font-semibold text-paper-contrast/70">
                                    {setting}
                                </span>

                                <Select.Root
                                    value={context.selected}
                                    onValueChange={(value) =>
                                        setSettings({
                                            ...settings,
                                            [setting]: {
                                                ...context,
                                                selected: value,
                                            },
                                        })
                                    }
                                >
                                    <Select.Trigger className="inline-flex items-center justify-center space-x-2 rounded text-primary font-extrabold">
                                        <Select.Value />

                                        <Select.Icon>
                                            <BiSolidChevronDown className="w-6 h-6" />
                                        </Select.Icon>
                                    </Select.Trigger>

                                    <Select.Portal>
                                        <Select.Content
                                            position="popper"
                                            className="w-40 py-4 bg-paper-secondary rounded-lg"
                                        >
                                            <Select.Viewport>
                                                {context.options.map(
                                                    (option, idx) => (
                                                        <Select.Item
                                                            key={idx}
                                                            value={option}
                                                            className="text-paper-contrast cursor-pointer font-semibold px-6 py-2 hover:bg-paper-primary"
                                                        >
                                                            <Select.ItemText>
                                                                {option}
                                                            </Select.ItemText>
                                                        </Select.Item>
                                                    ),
                                                )}
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                            </div>
                        );
                    })}
                </div>
            </Center>
        </HomeTemplate>
    );
};
