import {ThemeChangeListener} from "@shared/lib/theming";
import {CredentialsLoader} from "@features/auth";

import {Routes} from "./pages";

export const App = () => (
    <ThemeChangeListener>
        <CredentialsLoader>
            <Routes />
        </CredentialsLoader>
    </ThemeChangeListener>
);
