module.exports = {
  env: {
  jest: true,
  node: true
  },
  extends: [
    'prettier'
  ],
  parser: "babel-eslint",
  plugins: ['simple-import-sort'],
  root: true,
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': ['error'],
    'sort-vars': ['error']
  },
};
