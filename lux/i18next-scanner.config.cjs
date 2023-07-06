/*
@usage:

- const {t} = useTranslation("ns");
- const {t} = useTranslation(["ns1", "ns2", "ns3"]);

t("key") -> ns1:key
t("ns2:key") -> ns2:key
t("ns3:key") -> ns3:key
*/

const fs = require("fs");

const functions = ["t"];
const defaultValue = "%!% :NOT TRANSLATED: %!%";

// @dependency: i18n/config.ts
const defaultNs = "common";
const nss = ["common", "home"];
const languages = ["en", "de", "fr", "es", "ru", "cn", "jp", "il", "ae"];

module.exports = {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "./",
    options: {
        debug: false,
        lngs: languages,
        ns: nss,
        defaultLng: "en",
        defaultValue,
        defaultNs,
        attr: false,
        resource: {
            loadPath: "public/locales/{{lng}}/{{ns}}.json",
            savePath: "public/locales/{{lng}}/{{ns}}.json",
            jsonIndent: 4,
        },
        keySeparator: ".",
        nsSeparator: ":",
        interpolation: {
            prefix: "{{",
            suffix: "}}",
        },
    },
    transform: function customTransform(file, encoding, done) {
        const parser = this.parser;

        const content = fs.readFileSync(file.path, encoding);

        let ns = defaultNs;

        const match = content.match(/useTranslation\(.+\)/);
        const withNs = !!match;

        if (withNs) ns = match[0].split(/('|")/)[2];

        let count = 0;

        parser.parseFuncFromString(
            content,
            {list: functions},
            (key, options) => {
                parser.set(key, {
                    ...options,
                    ns: ns || defaultNs,
                    nsSeparator: ":",
                    keySeparator: ".",
                });

                count++;
            },
        );

        parser.parseTransFromString(
            content,
            {component: "Trans", i18nKey: "i18nKey"},
            (key, options) => {
                const split = key.split(":");

                parser.set(split[1], {
                    ...options,
                    ns: split[0],
                    nsSeparator: false,
                    keySeparator: false,
                });

                count++;
            },
        );

        if (count > 0) {
            console.log(
                `i18next-scanner: file=${file.relative}, count=${count}`,
            );
        }

        done();
    },
};
