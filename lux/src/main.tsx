import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

import {store} from "@shared/lib/store";
import "@shared/lib/i18n/init";

import {App} from "./app";

import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
