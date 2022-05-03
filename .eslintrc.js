module.exports = {
  root: true,
  extends: [
    '@movable/eslint-config',
    '@movable/eslint-config-ember',
    'plugin:storybook/recommended',
  ],
  rules: {
    'ember/no-get-with-default': 'error',
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'prettier.config.js',
        'tailwind.config.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
        'tests/dummy/config/deprecation-workflow.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        'node/no-unpublished-require': 'off',
      }),
    },
    {
      files: ['tests/**/*.js'],
      rules: {
        'qunit/require-expect': 'off',
      },
    },
    {
      files: ['.storybook/manager.js', '.storybook/preview.js', '.storybook/main.js'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        'node/no-unsupported-features/es-syntax': 'off',
      },
      settings: {
        node: {
          allowModules: ['@storybook/addons'],
        },
      },
    },
  ],
};
