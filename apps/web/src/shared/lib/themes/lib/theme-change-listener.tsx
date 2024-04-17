import {useEffect} from "react";

import {useThemeStore} from "../store";

export const ThemeChangeListener: React.FCWC = ({children}) => {
    const theme = useThemeStore((s) => s.theme);

    useEffect(() => {
        const html = document.documentElement;

        html.dataset.theme = theme;
    }, [theme]);

    return <>{children}</>;
};
