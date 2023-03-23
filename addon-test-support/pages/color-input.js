import { create, value } from 'ember-cli-page-object';

export const ColorInput = {
  scope: '[data-test-color-input-container]',
  input: {
    scope: '[data-test-color-input]',
    value: value(),
  },
  alpha: {
    scope: '[data-test-color-alpha]',
    value: value(),
  },
};

export default create(ColorInput);
