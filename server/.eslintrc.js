const rules = {
  'import/prefer-default-export': 0, // I prefer named exports so never confusion

  // TODO: fix when https://github.com/benmosher/eslint-plugin-import/issues/807 solved
  // 'import/newline-after-import': ['error', { 'count': 1 }], // force 1 new line after imports
  // 'import/order': ['error', {
  // 'groups': ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'], // Ensure grouped imports
  // 'newlines-between': 'always', // Ensure newlines between groups
  // }],

  'arrow-parens': ['error', 'as-needed'], // only require parens on arrow function if needed
  'import/no-unresolved': 0, // This is handled by typescript
  'no-unused-vars': 0, // use typescript alternative
  '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '_.*' }], // using typescript alternative, allow unused vars if beginning with _
  'no-useless-constructor': 'off', // use typescript alternative
  '@typescript-eslint/no-useless-constructor': 'error', // using typescript alternative
};

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
  ],
  rules: rules,
  env: {
    'node': true,
  },
  overrides: [
    {
      files: [
        "**/*.tests.ts"
      ],
      env: {
        jest: true // now **/*.test.tsx files' env has both es6 *and* jest
      },
      extends: ['airbnb-base', 'plugin:jest/recommended'],
      plugins: ['jest'],
      rules: rules,
    }
  ],
}
