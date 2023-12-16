import {useEffect} from "react";
import {useSelector} from "react-redux";

import {model} from "./model";

export const ThemeChangeListener: React.FCWC = ({children}) => {
    const theme = useSelector(model.selectors.theme);

    useEffect(() => {
        const html = document.documentElement;

        html.dataset.theme = theme;
    }, [theme]);

    return <>{children}</>;
};
