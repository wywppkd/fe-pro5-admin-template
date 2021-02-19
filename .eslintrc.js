module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-shadow': ['off'], // 当前作用域变量名不能与父级作用域变量同名
    'no-plusplus': 'off',
    'global-require': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'no-empty': 'off',
  },
};
