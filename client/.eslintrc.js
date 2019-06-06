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
    'func-names': 0,
    'max-len': 0,
    'no-bitwise': 0,
    'import/extensions': 0,
    'no-plusplus': 0,
    'arrow-body-style': 0,
    'css-rcurlyexpected': 0,
    'no-underscore-dangle': 0,
    'no-mixed-operators': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
