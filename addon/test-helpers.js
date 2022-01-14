// TODO: This should move to the addon-test-support folder
import { click, fillIn, triggerEvent } from '@ember/test-helpers';

export function fillInClassyInput(selector, text) {
  click(selector);
  fillIn(`${selector} input, ${selector} textarea`, text);
  triggerEvent(selector, `blur`);
}
