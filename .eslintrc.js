module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: 'tsconfig.json', // Allow to use rules which require type information
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".json"],
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react/jsx-runtime',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react',
    'react-hooks',
    'moment-utc',
    'unused-imports',
    'simple-import-sort',
    '@emotion',
    'regex',
    'jsx-expressions',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'default',
    },
  },
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
    'no-console': 'warn',
    'no-nested-ternary': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'jsx-quotes': ['warn', 'prefer-double'],
    'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
    'react/prop-types': 'off',
    '@emotion/jsx-import': 'off',
    '@emotion/pkg-renaming': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
      },
    ],
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'next/link',
            message: 'Use custom linkTo components instead of next Link',
          },
        ],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-hook-form-4',
            message: 'Use react-hook-form (v7) instead of react-hook-form-4',
          },
        ],
      },
    ],
    'moment-utc/no-moment-without-utc': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-vars': 1,
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars-ts': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/ban-types': 0,
    curly: 'warn',
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\u0000'], ['^(?!@)\\w'], ['^@!?(?!src)\\w'], ['^@src\\w'], ['^'], ['^\\.']],
      },
    ],
    'simple-import-sort/exports': 'error',
    'regex/invalid': [
      'error',
      [
        {
          regex: '\\/\\*\\* \\@jsx jsx \\*\\/',
          message: 'Do not use /** @jsx jsx */',
          replacement: '',
          files: {
            inspect: 'src/(.*).[t,j]?sx$',
          },
        },
        {
          regex: "import React,\\s(.*)\\sfrom 'react'",
          message: 'Do not import React',
          replacement: { function: "return `import ${$[1]} from 'react'`" },
          files: {
            inspect: 'src/(.*).[t,j]?sx$',
          },
        },
        {
          regex: "import React from 'react'",
          message: 'Do not import React',
          replacement: '',
          files: {
            inspect: 'src/(.*).[t,j]?sx$',
          },
        },
        {
          regex: "'@hookform/resolvers/yup'",
          message: 'Use the new yupResolver import',
          replacement: "'@hookform/resolvers/yup/dist/yup'",
          files: {
            inspect: 'src/(.*).[t,j]?sx$',
          },
        },
        {
          regex: "\": \"[<>~^*]",
          message: 'Use exact version only.',
          files: {
            inspect: 'package.json',
          },
        },
      ],
    ],
    'jsx-expressions/strict-logical-expressions': 'error'
  },
  ignorePatterns: ['src/generated/'],
}
