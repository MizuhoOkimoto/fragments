module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {},
};
