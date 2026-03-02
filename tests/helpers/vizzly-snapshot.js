import { vizzlyScreenshot } from '@vizzly-testing/ember/test-support';

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
 * Drop-in replacement for percySnapshotWithLabel using Vizzly.
 *
 * @param {Assert|string} assert
 * @param {string|object} labelOrOptions
 * @param {object} optionsOrNothing
 */
export default function vizzlySnapshotWithLabel(assert, labelOrOptions, optionsOrNothing) {
  let label = labelOrOptions;
  let options = optionsOrNothing;

  // Handle options provided as second argument w/o additional label
  if (typeof labelOrOptions !== 'string') {
    options = label;
    label = undefined;
  }

  return vizzlyScreenshot(createSnapshotName(assert, label), options);
}
