import {ThemeChangeListener} from "@shared/lib/theming";

import {Routes} from "./pages";

export const App = () => (
    <ThemeChangeListener>
        <Routes />
    </ThemeChangeListener>
);
