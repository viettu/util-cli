module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'arrow-spacing': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'no-multiple-empty-lines': 'warn',
    'prettier/prettier': 'warn',
    'prefer-arrow-callback': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};


// {
//     "root": true,
//     "parser": "@typescript-eslint/parser",
//     "plugins": [
//       "@typescript-eslint"
//     ],
//     "extends": [
//       "eslint:recommended",
//       "plugin:@typescript-eslint/eslint-recommended",
//       "plugin:@typescript-eslint/recommended"
//     ]
//   }