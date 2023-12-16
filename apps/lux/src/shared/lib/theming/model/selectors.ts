import {RootState} from "@shared/lib/store";

const state = (s: RootState) => s.theming;

export const theme = (s: RootState) => state(s).theme;
