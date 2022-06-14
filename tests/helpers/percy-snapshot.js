import percySnapshot from '@percy/ember';

/**
 * @param {Assert|string} assert
 * @return {string}
 */
export function nameFromAssert(assert) {
  if (assert.test?.module?.name && assert.test?.testName) {
    return `${assert.test.module.name} | ${assert.test.testName}`;
  } else {
    return assert;
  }
}

/**
 * @param {Assert|string} assert
 * @param {string} label
 * @return {string}
 */
export function createSnapshotName(assert, label) {
  if (label) {
    return `${nameFromAssert(assert)} | ${label}`;
  }

  return nameFromAssert(assert);
}

/**
 * Wrapper for the default `percySnapshot` helper that allows for optionally
 * providing an extra label for your assertion. This is useful when putting multiple
 * snapshots in a single test.
 *
 * @param {Assert|string} assert
 * @param {string|object} labelOrOptions
 * @param {object} optionsOrNothing
 */
export default function percySnapshotWithLabel(assert, labelOrOptions, optionsOrNothing) {
  let label = labelOrOptions;
  let options = optionsOrNothing;

  // Handle options provided as second argument w/o additional label
  if (typeof labelOrOptions !== 'string') {
    options = label;
    label = undefined;
  }

  return percySnapshot(createSnapshotName(assert, label), options);
}
