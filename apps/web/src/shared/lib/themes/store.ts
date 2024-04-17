import {create} from "zustand";

import {Theme, loadTheme, saveTheme} from "./themes";

export const useThemeStore = create<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>((set) => ({
    theme: loadTheme(),
    setTheme: (theme: Theme) => {
        saveTheme(theme);

        set({theme});
    },
}));
