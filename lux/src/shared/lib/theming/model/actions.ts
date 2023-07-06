import {PrepareAction, createAction} from "@reduxjs/toolkit";

import {saveTheme, Theme} from "../themes";

const prefix = "theming";

export interface SetThemePayload {
    theme: Theme;
}

// @note: it's better to use a thunk action creator but there's a problem with types
export const setTheme = createAction<PrepareAction<SetThemePayload>>(
    `${prefix}/setTheme`,
    (payload: SetThemePayload) => {
        saveTheme(payload.theme);

        return {payload};
    },
);
