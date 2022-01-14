const baseConfig = require('@movable/prettier-config');

module.exports = {
  ...baseConfig,
  overrides: [
    {
      files: '*.hbs',
      options: {
        parser: 'glimmer',
        singleQuote: false,
      },
    },
  ],
};
