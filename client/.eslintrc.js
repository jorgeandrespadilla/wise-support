module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'react-app',
        'react-app/jest',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    rules: {
        '@typescript-eslint/no-empty-function': [
            'warn',
            { allow: ['arrowFunctions'] },
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
