module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'react-app',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  overrides: [],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'testing-library',
    'jest-dom',
    'unused-imports',
    'import',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'import/extensions': 'off',
    // react-redux
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    // import部分

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/order': [
      'error',
      {
        // グループごとの並び順
        groups: [
          'builtin', // 1. fsや path などの node "builtin" のモジュール
          'external', // 2. npm install したパッケージ
          'internal', // 3. webpack などでパス設定したモジュール
          ['parent', 'sibling'], // 4. 親階層と小階層のファイル
          'object', // object"-imports
          'type', // 型だけをインポートする type imports
          'index', // 同階層のファイル
        ],
        // グループごとに改行を入れる
        'newlines-between': 'never', // "never" を指定すると改行なし
        pathGroupsExcludedImportTypes: ['builtin'],
        // アルファベット順・大文字小文字を区別しない
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          // react 関連を external より前にする
          {
            pattern: 'react**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{@/store/**,@/domain/**}',
            group: 'internal',
            position: 'before',
          },
          // `@/components` の import をグルーピング
          {
            pattern: '{@/components/**,./**.style}',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
  },
};
