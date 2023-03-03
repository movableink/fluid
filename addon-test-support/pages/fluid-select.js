import {
  findElementWithAssert,
  create,
  collection,
  fillable,
  hasClass,
  property,
  text,
} from 'ember-cli-page-object';
import { findOne } from 'ember-cli-page-object/extend';
import { click, settled } from '@ember/test-helpers';
import { assert } from '@ember/debug';

export const FluidSelect = {
  scope: '.fluid-select',

  async toggleOpen() {
    await this.trigger.toggle();
    return settled();
  },

  async select(name) {
    if (!this.popup.isVisible) {
      await this.open();
    }

    const options = this.popup.list.options;

    let option;
    if (name) {
      option = options.filter(({ text }) => text.includes(name))[0];
    } else {
      option = options.objectAt(0);
    }

    return option.click();
  },

  async containsOption(name) {
    if (!this.popup.isVisible) {
      await this.open();
    }

    const options = this.popup.list.options;

    assert('you must provide a name argument to `containsOption`', name);
    return !!options.filter(({ text }) => text.includes(name)).length;
  },

  trigger: {
    scope: '[data-test-fluid-select-trigger]',
    isDisabled: property('disabled'),
    text: text('.fluid-select__trigger-label'),
    badge: { scope: '.fluid-badge' },

    async toggle() {
      const button = findElementWithAssert(this)[0];
      click(button);
      return settled();
    },
  },

  popup: {
    resetScope: 'true',
    testContainer: '#ember-testing',
    scope: '.fluid-select__wrapper',

    noResultsMessage: { scope: '.fluid-select__list-item--placeholder' },
    loading: { scope: '.fluid-select__list-item--loading' },

    search: {
      scope: '.fluid-select__search',
      fillIn: fillable('input'),
      loadingIcon: { scope: 'svg.loading' },
      searchIcon: { scope: 'svg.search' },
    },

    list: {
      scope: '.fluid-select__list',
      options: collection('.fluid-select__option', {
        hasCheckbox: hasClass('fluid-checkbox'),
        isSelected: hasClass('fluid-select__option--selected'),

        click() {
          // If the list option is a `FluidCheckbox`, then we actually want to click the checkbox within the option
          // Otherwise, click the option's element itself
          if (this.hasCheckbox) {
            const checkbox = findOne(this, '[role="checkbox"]');
            checkbox.click();
          } else {
            const self = findOne(this);
            self.click();
          }

          return settled();
        },
      }),
      selectedOptions: collection('.fluid-select__option--selected'),
      groupHeaders: collection('.fluid-select__group-header'),
    },
  },
};

export default create(FluidSelect);
