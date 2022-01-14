/* eslint-env node */
'use strict';

const { merge } = require('lodash');

module.exports = {
  name: require('./package').name,

  /**
   * Ensure `contentFor` hooks for nested addon are called
   *
   * @see https://github.com/cibernox/ember-power-select/blob/c36d826efd9bef2c732f6d1b6733af5bc76cef00/index.js#L39-L42
   */
  contentFor(type, config) {
    const emberBasicDropdown = this.addons.find((a) => a.name === 'ember-basic-dropdown');
    return emberBasicDropdown.contentFor(type, config);
  },

  /**
   * Ensure `ember-modal-dialog` configuration is passed on correctly
   *
   * @see https://github.com/yapplabs/ember-modal-dialog#using-as-a-nested-addon
   */
  config(environment, appConfig) {
    const initialConfig = merge({}, appConfig);
    const updatedConfig = this.addons.reduce((config, addon) => {
      if (addon.config) {
        merge(config, addon.config(environment, config));
      }

      return config;
    }, initialConfig);

    return updatedConfig;
  },
};
