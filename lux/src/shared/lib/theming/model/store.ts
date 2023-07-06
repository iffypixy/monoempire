import {createReducer, PayloadAction} from "@reduxjs/toolkit";

import {restoreTheme, Theme} from "../themes";
import * as a from "./actions";

interface ThemingState {
    theme: Theme;
}

export const store = createReducer<ThemingState>(
    {
        theme: restoreTheme(),
    },
    {
        [a.setTheme.type]: (
            state,
            {payload}: PayloadAction<a.SetThemePayload>,
        ) => {
            console.log(payload);

            state.theme = payload.theme;
        },
    },
);
