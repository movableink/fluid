/**
  @module fluid
 */
import { helper } from '@ember/component/helper';

import { A } from '@ember/array';
import moment from 'moment';
import formatDuration from '../lib/format-duration';

const formatters = {
  percent(value, hash) {
    return l('number', value, hash) + '%';
  },

  currency(value, hash) {
    return '$' + l('number', value, hash);
  },
  /* eslint-disable complexity */
  number(value, hash) {
    if (hash.precision != null) {
      value = parseFloat(value.toFixed(hash.precision), 10);
    }

    let sign = '';
    if (value < 0) {
      value = Math.abs(value);
      sign = '-';
    }
    let [wholeNumber, decimal] = value.toString().split('.');
    const groupings = [];
    while (wholeNumber.length) {
      groupings.unshift(wholeNumber.slice(-3));
      wholeNumber = wholeNumber.slice(0, -3);
    }

    if ((decimal || '').length < (hash.precision || 0) && !hash['strip-insignificant-zeros']) {
      decimal = decimal || '';
      decimal += Array(hash.precision - (decimal || '').length + 1).join('0');
    }

    return (
      sign +
      A([groupings.join(','), decimal])
        .compact()
        .join('.')
    );
  },
  /* eslint-enable complexity */
  date(value, hash) {
    return moment(value).format(hash.format || 'MMM D, YYYY [at] h:mmA');
  },

  duration(value, hash) {
    if (hash['in']) {
      value = moment.duration(value, hash['in']);
    }
    return formatDuration(value, hash);
  },
};

/**
  Localizes values according to type.

  This helper takes a value and type, and returns a string with
  the value formatted according to built-in configuration.

  Supported types are:

  | Type       | Description     |
  |------------|-----------------|
  | `number`   | Returns a number split with commas. Accepts `precision` as an option to trim decimal places
  | `percent`  | Returns a formatted number appended with a `%` sign.
  | `currency` | Returns a formatted number in USD. Numbers are expected to be in dollars instead of cents.
  | `date`     | Returns a human readable version of a full datetime. Accepts a `format` option in [moment.js](http://momentjs.com/docs/#/displaying/) style.
  | `duration` | Returns milliseconds as a human readable duration. Accepts a `format` option (either 'short' or 'long') and `truncate`, which will return the largest unit of time. If the duration provided is in a format other than milliseconds, providing the unit to `in` will fix it. Precision for durations is provided using the name of the unit (cf. 'minutes', 'hours')


  Example:

  ```handlebars
  {{l 'number' 12345}}
  {{! 12,345}}

  {{l 'percent' 12.75 precision=0}}
  {{! 13%}}

  {{l 'currency' 10000.43}}
  {{! $10,000.43}}

  {{l 'date' christmasEve}}
  {{! Dec 25, 2015 at 12:00am}}

  {{l 'date' groundhogDay format='MMMM D, YYYY'}}
  {{! February 3, 2016}}

  {{l 'duration' 345600000}}
  {{! 4 days}}
  ```

  @public
  @method l
  @param {String} type The type of localization to perform
  @param {Object} value The value of the object to localize
  @return {String} The localized value
  @for Helpers
 */
export function l(type, value, hash = {}) {
  if (value == null) {
    return hash.default;
  }

  if (formatters[type]) {
    return formatters[type](value, hash);
  }

  return value;
}

export default helper(function ([type, value], hash = {}) {
  return l(type, value, hash);
});
