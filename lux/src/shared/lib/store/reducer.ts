import {combineReducers} from "@reduxjs/toolkit";

import {themingModel} from "@shared/lib/theming";
import {authApi} from "@shared/api/auth";
import {authModel} from "@features/auth";

export const reducer = combineReducers({
    theming: themingModel.store,
    [authModel.slice.name]: authModel.slice.reducer,
    [authApi.local.reducerPath]: authApi.local.reducer,
    [authApi.oauth2.reducerPath]: authApi.oauth2.reducer,
});
