module.exports = {
  root: true,
  globals: {
    "THREE": true
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'max-line-length': [true, 120],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 0,
    'prefer-destructuring': 0,
    'func-names': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
