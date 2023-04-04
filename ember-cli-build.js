/* eslint-env node */
const { resolve } = require('path');
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const postcssParser = require('postcss-scss');
const tailwind = require('tailwindcss');
const sass = require('@mozaic-ds/postcss-sass');
const autoprefixer = require('autoprefixer');
const colorModFunctions = require('@alexlafroscia/postcss-color-mod-function');

const TAILWIND_CONFIG_PATH = require.resolve('./tailwind.config');

function createPlugins({ tailwindConfigPath = TAILWIND_CONFIG_PATH, sassOptions = {} } = {}) {
  return [sass(sassOptions), tailwind(tailwindConfigPath), colorModFunctions(), autoprefixer()];
}

const isProductionLikeBuild =
  process.env.EMBER_ENV !== 'development' && process.env.EMBER_ENV !== 'test';

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    // Add options here
    autoImport: {
      webpack: {
        node: {
          global: true,
        },
      },
    },

    fingerprint: {
      enabled: isProductionLikeBuild,
    },

    svgJar: {
      strategy: 'inline',
      sourceDirs: ['public/assets/images/icons', 'public/assets/heroicons'],
      viewer: {
        enabled: true,
      },
    },

    postcssOptions: {
      compile: {
        extension: 'scss',
        parser: postcssParser,
        plugins: createPlugins({
          tailwindConfigPath: resolve(__dirname, 'tailwind.config.js'),
        }),
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
