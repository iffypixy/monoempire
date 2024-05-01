import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import "@shared/lib/i18n/init";

import {App} from "./app";

import "./index.css";

const root = document.getElementById("root")!;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryOnMount: false,
            refetchOnMount: false,
        },
    },
});

createRoot(root).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
);
