module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "react-app",
        "react-app/jest",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    rules: {}
};
