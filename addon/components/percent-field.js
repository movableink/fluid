import { get } from '@ember/object';
import NumberField from './number-field';
import { l } from '../helpers/l';

export default NumberField.extend({
  classNames: ['percent-field'],

  min: 0,

  max: 100,

  precision: 2,

  _format(number) {
    const precision = get(this, 'precision');

    return (
      l('percent', number, {
        precision,
        'strip-insignificant-zeros': true,
      }) || ''
    );
  },

  _getValue() {
    const value = get(this, 'value');
    if (value != null) {
      return get(this, 'value') * 100;
    }
  },

  _setValue(value) {
    if (value != null) {
      get(this, 'onchange')(parseFloat((value / 100).toFixed(get(this, 'precision') + 2), 10));
    } else {
      get(this, 'onchange')(value);
    }
    this._updateDisplayValue(value);
  },

  _stepValue(step) {
    this._setValue(this._clamp((this._getValue() || 0) + step));
  },

  _trimDecimals(oldString, newString, precision) {
    let trimmedString = newString;

    if (trimmedString.indexOf('.') === -1 && oldString.indexOf('.') !== -1) {
      trimmedString =
        trimmedString.replace(/%/g, '') +
        '.' +
        oldString
          .slice(oldString.indexOf('.'), oldString.indexOf('.') + precision + 1)
          .replace(/[.%]/g, '') +
        '%';
    }

    return trimmedString;
  },

  _moveCursor(previousCursorPosition, previousValue, newValue) {
    const input = get(this, 'element').querySelector('input');

    if (parseFloat(previousValue, 10) > get(this, 'max')) {
      input.selectionStart = input.selectionEnd = newValue.length - 1;
    } else if (previousCursorPosition !== null && previousCursorPosition === previousValue.length) {
      input.selectionStart = newValue.length - 1;
      input.selectionEnd = newValue.length - 1;
    } else {
      this._super(previousCursorPosition, previousValue, newValue);
    }
  },
});
