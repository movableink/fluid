import { attribute, create, collection, text } from 'ember-cli-page-object';
import { find } from '@ember/test-helpers';

/**
 * @typedef DateInputDay
 * @property {string} date
 * @property {boolean|undefined} isDisabled
 */

const POPUP_SELECTOR = '[data-test-fluid-date-input-calendar]';

export const FluidDateInput = {
  value: text('span'),

  days: collection('[data-date]', {
    // Selector configuration
    resetScope: true,
    scope: POPUP_SELECTOR,

    // Properties
    date: attribute('data-date'),
    isDisabled: attribute('disabled'),
  }),

  /**
   * Returns a specific day in the `days` collection
   * @param {string} dateString
   * @returns {DateInputDay|undefined}
   */
  day(dateString) {
    return this.days.findOne((day) => day.date === dateString);
  },

  isOpen: {
    isDescriptor: true,

    get() {
      return !!find(POPUP_SELECTOR);
    },
  },

  async open() {
    if (!this.isOpen) {
      await this.click();
    }
  },

  async fillIn(value) {
    await this.open();
    await this.day(value).click();
  },
};

export default create(FluidDateInput);
