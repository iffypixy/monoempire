export type Theme = "dark" | "light" | "night" | "dracula";

export const themes: {
    values: Theme[];
    auto: Theme;
    storageKey: string;
} = {
    values: ["light", "dark", "night", "dracula"],
    auto: "dark",
    storageKey: "theme",
};

export const loadTheme = () => {
    const theme = localStorage.getItem(themes.storageKey) as Theme;

    if (themes.values.includes(theme)) return theme;
    else return themes.auto;
};

export const saveTheme = (theme: Theme) => {
    localStorage.setItem(themes.storageKey, theme);
};
