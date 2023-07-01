import {combineReducers} from "@reduxjs/toolkit";

import {themingStore} from "@shared/lib/theming";

export const reducer = combineReducers({
    theming: themingStore,
});
