export type Theme = "dark" | "light" | "night" | "dracula";

export const themes: Theme[] = ["light", "dark", "night", "dracula"];
const auto: Theme = "dark";

const key = "theme";

export const restoreTheme = () => {
    const theme = localStorage.getItem(key) as Theme;

    if (themes.includes(theme)) return theme;
    else return auto;
};

export const saveTheme = (theme: Theme) => {
    localStorage.setItem(key, theme);
};
