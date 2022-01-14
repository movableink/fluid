/**
  @module fluid
 */
import Component from '@ember/component';

import { computed, set, get } from '@ember/object';
import $ from 'jquery';

/**
  Formattable field is a generic base class
  for text fields so we can provide a consistent
  user experience when form fields require
  a specific format.

  Subclassed components must implement the `format`
  method. This method should transform the text
  provided by the user into a form suitable for
  data processing.

  For example, a field format Social Security Numbers
  would want to display text as 000-00-0000. To do
  this, the following code would work:

  ```js
  export default FormattableField.extend({
    format(ssn) {
      let parts = [ssn.slice(0, 3), ssn.slice(3, 5), ssn.slice(5)].without('');
      return parts.join('-');
    }
  });
  ```

  @private
  @class FormattableField
  @extends Ember.Component
 */
export default Component.extend({
  tagName: 'input',

  type: 'text',

  /**
    Value for the input
    @property value
    @type String
    @default ""
  */
  value: '',

  /**
    Placeholder for the input

    @property placeholder
    @type String
    @default null
  */
  placeholder: null,

  required: false,

  attributeBindings: [
    'autofocus',
    'disabled',
    'name',
    'placeholder',
    'readonly',
    'required',
    'type',
    'displayValue:value',
  ],

  didInsertElement() {
    this._super(...arguments);
    if (this._value) {
      set(this, 'value', this._value);
    }
  },

  /**
    Determines if input should be disabled

    @property disabled
    @type Boolean
    @default false
  */
  disabled: computed({
    get() {
      return null;
    },
    set(_, value) {
      if (value) {
        return 'disabled';
      } else {
        return null;
      }
    },
  }),

  displayValue: computed('value', 'focused', {
    get() {
      if (this.focused) {
        return $(this.element).val();
      }
      return get(this, 'value');
    },
  }),

  focusIn() {
    set(this, 'focused', true);
  },

  /**
    `onchange` should be invoked inside the `format` method on any extended component.

    @event onchange
    @param {String} value The new value of the input.
  */
  change() {
    this.format($(this.element).val());
  },

  focusOut() {
    set(this, 'focused', false);
  },
});
