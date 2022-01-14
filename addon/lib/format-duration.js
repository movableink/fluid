import moment from 'moment';

function format(value, name, options) {
  if (options.format === 'short') {
    return `${value}${name.charAt(0)}`;
  } else {
    if (value === 1) {
      return `${value} ${name.slice(0, -1)}`;
    } else {
      return `${value} ${name}`;
    }
  }
}

export default function (value, options = {}) {
  const parts = [];

  const duration = moment.duration(value);
  const precision = options.precision || 'seconds';

  const units = ['days', 'hours', 'minutes', 'seconds'];
  units.forEach(function (unit) {
    const value = Math.floor(duration[unit]());
    if (value && units.indexOf(unit) <= units.indexOf(precision)) {
      parts.push(format(value, unit, options));
      duration.subtract(value, unit);
    }
  });

  if (options.truncate) {
    return parts[0];
  } else {
    return parts.join(' ');
  }
}
