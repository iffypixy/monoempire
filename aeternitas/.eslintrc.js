module.exports = {
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    env: {
        node: true,
    },
    rules: {},
    overrides: [
        {
            files: ".eslintrc.{js,cjs}",
            env: {
                node: true,
            },
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
};
