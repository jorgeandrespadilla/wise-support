module.exports = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: "avoid",
    rangeStart: 0,
    rangeEnd: Infinity,
    requirePragma: false,
    insertPragma: false,
    proseWrap: "preserve",
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: false,
    endOfLine: "lf",
    overrides: [
        {
            files: "*.css",
            options: {
                tabWidth: 4
            }
        },
        {
            files: "*.json",
            options: {
                tabWidth: 4
            }
        },
        {
            files: "*.{md,markdown}",
            options: {
                tabWidth: 4
            }
        }
    ]
};
