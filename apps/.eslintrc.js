module.exports = {
  plugins: ['prettier', 'simple-import-sort'],
  extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js', '.prettierrc.js'],
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    eqeqeq: 'error',
    'max-depth': 'error',
    'max-lines': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-eval': 'error',
    'no-implicit-coercion': 'error',
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'no-negated-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-useless-concat': 'error',
    'no-void': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-template': 'error',
    yoda: 'error',
    'no-unused-vars': 'off',
  },
};