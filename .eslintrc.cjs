/**
 * @type {import('eslint-define-config').ESLintConfig}
 */
module.exports = {
  root: true,
  env: { node: true },
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  rules: {
    'prefer-template': 'error',
    'import/order': 'error',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-console': 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  overrides: [
    {
      files: 'src/**/*.{ts,tsx}',
      env: { node: false, browser: true },
      rules: {
        'no-console': ['warn', { allow: ['error'] }],
      },
    },
    {
      files: ['script/**/*.{js,ts}'],
      env: { node: true, browser: false },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
