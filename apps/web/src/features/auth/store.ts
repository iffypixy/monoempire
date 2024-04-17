import {create} from "zustand";

import {Nullable} from "@shared/lib/types";

import {Credentials} from "./types";

export const useAuthStore = create<{
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    credentials: Nullable<Credentials>;
    setCredentials: (credentials: Credentials) => void;
}>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
    credentials: null,
    setCredentials: (credentials: Credentials) => set({credentials}),
}));

export const useCredentials = () => useAuthStore((s) => s.credentials);
