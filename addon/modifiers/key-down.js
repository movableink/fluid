import { modifier } from 'ember-modifier';
import { assert } from '@ember/debug';

export default modifier(function keyPress(
  element,
  [desiredKey, handler],
  { altKey = false, ctrlKey = false, metaKey = false, shiftKey = false }
) {
  assert('`key-down` modifier must be provided with a key to bind to', desiredKey);

  /**
   * @param {KeyboardEvent} evt
   */
  function keydownListener(evt) {
    const keyMatch = desiredKey === evt.key;
    const modifierMatch =
      evt.altKey === altKey &&
      evt.ctrlKey === ctrlKey &&
      evt.metaKey === metaKey &&
      evt.shiftKey === shiftKey;

    if (keyMatch && modifierMatch) {
      handler(evt);
    }
  }

  element.addEventListener('keydown', keydownListener);

  return () => {
    element.removeEventListener('keydown', keydownListener);
  };
});
