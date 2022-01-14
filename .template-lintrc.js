'use strict';

module.exports = {
  plugins: ['@movable/template-lint-plugin', 'ember-template-lint-plugin-prettier'],
  extends: [
    'ember-template-lint-plugin-prettier:recommended',
    '@movable/template-lint-plugin:base',
  ],

  ignore: ['blueprints/**'],

  rules: {
    'no-implicit-this': true,
    'no-restricted-invocations': ['mut'],
    'no-curly-component-invocation': [
      'error',
      {
        noImplicitThis: 'error',
        requireDash: 'off',
      },
    ],
  },
};
