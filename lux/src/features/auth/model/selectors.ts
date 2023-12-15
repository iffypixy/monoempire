import {RootState} from "@shared/lib/store";

export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const credentials = (state: RootState) => state.auth.credentials;
