import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export type Language =
    | "en"
    | "de"
    | "fr"
    | "es"
    | "ru"
    | "cn"
    | "jp"
    | "il"
    | "ae";

export const languages: Language[] = [
    "en",
    "de",
    "fr",
    "es",
    "ru",
    "cn",
    "jp",
    "il",
    "ae",
];

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: import.meta.env.DEV,
        cleanCode: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        ns: ["home", "common"],

        detection: {
            order: ["localStorage"],
            caches: ["localStorage"],
        },
    });
