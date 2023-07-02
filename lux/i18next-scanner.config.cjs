const fs = require("fs");

const defaultNs = "common";
const defaultValue = "%!% :NOT TRANSLATED: %!%";
const languages = ["en", "de"];
const functions = ["t"];

module.exports = {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "public/locales",
    options: {
        debug: false,
        lngs: languages,
        defaultLng: "en",
        defaultValue,
        attr: false,
        resource: {
            loadPath: "/public/locales/{{lng}}/{{ns}}.json",
            savePath: "/public/locales/{{lng}}/{{ns}}.json",
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

        if (withNs) ns = match[0].split(/("|")/)[2];

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

        if (count > 0) {
            console.log(
                `i18next-scanner: file=${file.relative}, count=${count}`,
            );
        }

        done();
    },
};
