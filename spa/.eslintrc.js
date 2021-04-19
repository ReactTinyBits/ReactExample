const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
    parser:  "@typescript-eslint/parser",  // Specifies the ESLint parser
    extends:  [
        "plugin:@typescript-eslint/recommended",  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "prettier/@typescript-eslint",  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        "plugin:prettier/recommended",  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'airbnb',
        'prettier',
        'prettier/react'
    ],
    plugins: ["@typescript-eslint", 'prettier', 'redux-saga', 'react', 'jsx-a11y', "react-hooks"],
    parserOptions:  {
        ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
        sourceType:  "module",  // Allows for the use of imports
        project: "./tsconfig.json",
        ecmaFeatures:  {
            jsx:  true,  // Allows for the parsing of JSX
        },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    rules: {
        'prettier/prettier': ['error', prettierOptions],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/prefer-interface': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/member-ordering': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        'arrow-body-style': [2, 'as-needed'],
        'class-methods-use-this': 0,
        'comma-dangle': [2, 'always-multiline'],
        'import/first': 0,
        'import/imports-first': 0,
        'import/newline-after-import': 0,
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/no-unresolved': 0,
        'import/no-webpack-loader-syntax': 0,
        'import/prefer-default-export': 0,
        indent: [
            2,
            2,
            {
                SwitchCase: 1,
            },
        ],
        'jsx-a11y/aria-props': 2,
        'jsx-a11y/heading-has-content': 0,
        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/media-has-caption': 0,
        'jsx-a11y/mouse-events-have-key-events': 2,
        'jsx-a11y/role-has-required-aria-props': 2,
        'jsx-a11y/role-supports-aria-props': 2,
        'linebreak-style': 0,
        'max-len': 0,
        'newline-per-chained-call': 0,
        'no-bitwise': 0,
        'no-confusing-arrow': 0,
        'no-console': 0,
        'no-nested-ternary': 0,
        'no-underscore-dangle': 0,
        'no-use-before-define': 0,
        "no-shadow": 0,
        "no-unused-vars": 0,
        'prefer-template': 2,
        'react/destructuring-assignment': 0,
        'react/jsx-closing-tag-location': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-filename-extension': 0,
        'react/jsx-no-target-blank': 0,
        'react/no-did-mount-set-state': 0,
        'react/no-danger': 0,
        'react/require-default-props': 0,
        'react/require-extension': 0,
        'react/self-closing-comp': 0,
        'react/sort-comp': 0,
        'redux-saga/no-yield-in-race': 2,
        'redux-saga/yield-effects': 2,
        'require-yield': 0,
        "no-restricted-syntax": 'off',
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './internals/webpack/webpack.prod.babel.js',
            },
        },
    },
};
