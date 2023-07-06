module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
    },
    overrides: [
        {
            files: "*.cjs",
            rules: {
                "@typescript-eslint/no-var-requires": "off",
            },
        },
    ],
};
