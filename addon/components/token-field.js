import Ember from 'ember';
import Component from '@ember/component';
import { computed, set, get, getProperties } from '@ember/object';
import { empty } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { run } from '@ember/runloop';
import { htmlSafe } from '@ember/template';
import { computed as overridable } from 'ember-overridable-computed';
import { tokenRegex } from 'fluid/lib/find-tokens';
import $ from 'jquery';

const {
  Handlebars: {
    Utils: { escapeExpression },
  },
} = Ember;
export const baseClass = 'token-field';

export default Component.extend({
  classNames: [baseClass],
  classNameBindings: [`editing:${baseClass}--focus`, `showPlaceholder:${baseClass}--placeholder`],

  tokenRegex,
  editing: false,
  disabled: false,
  placeholder: '',
  update() {},

  inputId: overridable(function () {
    return `${guidFor(this)}_token-field`;
  }),

  showPlaceholder: empty('value'),

  valueAsHTML: computed('value', 'tokenRegex', 'placeholder', 'showPlaceholder', function () {
    const {
      value = '',
      placeholder,
      showPlaceholder,
    } = getProperties(this, 'value', 'placeholder', 'showPlaceholder');

    if (showPlaceholder) {
      return placeholder;
    }

    return htmlSafe(
      escapeExpression(value).replace(
        this.tokenRegex,
        `<span class="${baseClass}__token">$1</span>`
      )
    );
  }),

  focusIn() {
    set(this, 'editing', true);
  },

  didRender() {
    this._super(...arguments);
    run(() => {
      if (get(this, 'editing')) {
        $(this.element).children().focus();
      }
    });
  },

  actions: {
    focusOut() {
      if (!this.isDestroyed) set(this, 'editing', false);
    },
  },
});
