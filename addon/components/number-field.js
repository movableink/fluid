import Component from '@ember/component';
import { set, get } from '@ember/object';
import { l } from '@movable/fluid/helpers/l';

const UP = 38;
const DOWN = 40;

/**
  A `{{number-field}}` is a drop in replacement
  for `<input type="number">`.

  The number field formats numbers in a friendly
  manner for users, making larger numbers easier
  to read.

  The simplest `{{number-field}}` would be:

  ```htmlbars
  {{number-field value=score onchange=(action (mut score))}}
  ```

  This would result in a free form number field that
  would allow users to choose any number. If we
  wanted to restrict the score to be from 0 to 100, we would
  add `min` and `max` properties:

  ```htmlbars
  {{number-field value=score min=0 max=100 onchange=(action (mut score))}}
  ```

  Say we have another use case, where we want to show
  allow users to enter percentages up to 2 decimals.
  The configuration that would allow this would be:

  ```htmlbars
  {{number-field value=percent min=0 max=100 precision=2 onchange=(action (mut percent))}}
  ```

  @public
  @class NumberField
 */
export default Component.extend({
  classNames: ['number-field', 'block'],

  /**
    Called whenever the field has focused out of
    the field

    @event focus-out
    */

  /**
    Called whenever the user changes the value.

    @event onchange
    @param {Number} value The floating point number
   */

  /**
    The `label` property is the floating label used
    by the `classy-input`.

    @property label
    @type String
    @default null
   */
  label: null,

  /**
    The `name` property of the `input` element.

    @property name
    @type String
    @default null
   */
  name: null,

  /**
    Whether or not the field is disabled.

    @property disabled
    @type Boolean
    @default false
   */
  disabled: false,

  /**
    The minimum possible number for the field.

    @property min
    @type Number
    @default Number.MIN_SAFE_INTEGER
   */
  min: Number.MIN_SAFE_INTEGER,

  /**
    The maximum possible number for the field.

    @property max
    @type Number
    @default Number.MAX_SAFE_INTEGER
   */
  max: Number.MAX_SAFE_INTEGER,

  /**
    When using arrow keys, the number will increment
    or decrement the amount that `step` defines. This
    is analagous to the `step` property on `input` fields
    native to browsers.

    @property step
    @type Number
    @default 1
   */
  step: 1,

  /**
    The precision of the number. This refers to the
    number of decimal places that should be allowed for
    the number.

    @property precision
    @type Number
    @default 0
   */
  precision: 0,

  didRender() {
    this._super(...arguments);
    this._updateDisplayValue(this._getValue());
  },

  _getValue() {
    return get(this, 'value');
  },

  _setValue(value) {
    if (value) {
      get(this, 'onchange')(parseFloat(value.toFixed(get(this, 'precision')), 10));
    } else {
      get(this, 'onchange')(value);
    }
    this._updateDisplayValue(value);
  },

  _stepValue(step) {
    this._setValue(this._clamp((this._getValue() || 0) + step));
  },

  _updateDisplayValue(number) {
    const precision = get(this, 'precision');
    const max = get(this, 'max');
    const input = get(this, 'element').querySelector('input');
    const cursorPosition = input.selectionStart;
    const lastDisplayValue = input.value;
    let displayValue = this._format(number);

    if (precision > 0 && parseFloat(number, 10) < max) {
      // this._format returns a rounded float; need to append the original decimal
      // values onto the new string
      displayValue = this._trimDecimals(lastDisplayValue, displayValue, precision);
    }

    input.value = displayValue;

    if (get(this, 'isFocused')) {
      this._moveCursor(cursorPosition, lastDisplayValue, displayValue);
    }
  },

  // Appends `precision` characters from old string
  _trimDecimals(oldString, newString, precision) {
    let trimmedString = newString;

    if (trimmedString.indexOf('.') === -1 && oldString.indexOf('.') !== -1) {
      trimmedString +=
        '.' +
        oldString
          .slice(oldString.indexOf('.'), oldString.indexOf('.') + precision + 1)
          .replace(/\./g, '');
    }

    return trimmedString;
  },

  _format(number) {
    const precision = get(this, 'precision');

    return (
      l('number', number, {
        precision,
        'strip-insignificant-zeros': true,
      }) || ''
    );
  },

  _moveCursor(previousCursorPosition, previousValue, newValue) {
    const input = get(this, 'element').querySelector('input');
    let newCursorPosition = previousCursorPosition;

    if (newCursorPosition !== null) {
      if (newCursorPosition === previousValue.length) {
        newCursorPosition = newValue.length;
      } else if (previousValue !== newValue) {
        const prevLength = (previousValue.match(/,/g) || []).length;
        const newLength = (newValue.match(/,/g) || []).length;
        // Adjust the newCursorPosition to be between the same
        // digits when the number of commas changes
        if (prevLength > newLength) {
          newCursorPosition--;
        } else if (prevLength < newLength) {
          newCursorPosition++;
        }
      }

      input.selectionStart = newCursorPosition;
      input.selectionEnd = newCursorPosition;
    }
  },

  _clamp(value, precision = 0) {
    const pow = Math.pow(10, precision);
    return Math.min(Math.max(value, get(this, 'min') * pow), get(this, 'max') * pow);
  },

  _removeExtraDecimals(string = '') {
    const firstDecimal = string.indexOf('.');
    if (firstDecimal !== -1) {
      const firstHalf = string.slice(0, firstDecimal + 1);
      const secondHalf = string.slice(firstDecimal + 1);

      return `${firstHalf}${secondHalf.replace(/[%.]/g, '')}`;
    }

    return string;
  },

  // Removes extra characters
  _applyPrecision(number) {
    const precision = get(this, 'precision');
    let value = this._removeExtraDecimals(number);
    let decimalPlaces = 0;

    // Drops any characters beyond `precision` decimal points
    const decimalPointIndex = value.indexOf('.');
    if (decimalPointIndex !== -1) {
      decimalPlaces = value.slice(decimalPointIndex).length - 1;

      decimalPlaces = Math.min(decimalPlaces, precision);

      value = value.slice(0, decimalPointIndex + 1 + precision);
    }

    let finalValue = this._clamp(parseInt(value.replace(/[,.]/g, ''), 10), decimalPlaces);

    if (isNaN(finalValue)) {
      finalValue = null;
    } else {
      finalValue = finalValue / Math.pow(10, decimalPlaces);
    }

    return finalValue;
  },

  actions: {
    handleArrowKeys(evt) {
      if (evt.which === UP) {
        this._stepValue(get(this, 'step'));
        return false;
      }
      if (evt.which === DOWN) {
        this._stepValue(get(this, 'step') * -1);
        return false;
      }
    },

    restrict(evt) {
      if (evt.which === 32 || evt.shiftKey) {
        return false;
      }

      if (evt.which <= 40) {
        return true;
      }

      return /[\d\s.,-]/.test(String.fromCharCode(evt.which));
    },

    // Cleans the input before submitting the value to the `onchange` function
    reformat() {
      const input = get(this, 'element').querySelector('input');
      const displayValue = input.value || '';

      const valueWithPrecision = this._applyPrecision(displayValue);

      this._setValue(valueWithPrecision);
    },

    onFocusOut() {
      if (get(this, 'focus-out')) {
        get(this, 'focus-out')(this._getValue());
      }
    },

    onFocusIn() {
      set(this, 'isFocused', true);
    },
  },
});
