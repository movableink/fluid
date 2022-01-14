/* global QUnit */

function intersects(actual, expected) {
  return Object.keys(expected).every(function (key) {
    return QUnit.equiv(actual[key], expected[key]);
  });
}

QUnit.extend(QUnit.assert, {
  contains(actual, expected, message) {
    this.push(actual.indexOf(expected) !== -1, actual, expected, message);
  },
  intersects(actual, expected, message) {
    let ok = true;
    if (Array.isArray(expected)) {
      for (let i = 0, len = expected.length; i < len; i++) {
        ok = ok && intersects(actual[i], expected[i]);
      }
    } else {
      ok = intersects(actual, expected);
    }
    this.push(ok, actual, expected, message);
  },
});
