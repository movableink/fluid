/**
  @module fluid
 */
import Component from '@ember/component';

import { get } from '@ember/object';
import RSVP from 'rsvp';
import copy from '@movable/fluid/system/copy';
import { task, timeout } from 'ember-concurrency';
import $ from 'jquery';

const ESCAPE = 27;

function selectText(component) {
  const input = get(component, 'element').querySelector('input');
  const selection = window.getSelection();
  const range = document.createRange();

  selection.removeAllRanges();
  range.selectNode(input);
  selection.addRange(range);
}

function oncopy(component) {
  const input = get(component, 'element').querySelector('input');
  const { resolve, reject, promise } = RSVP.defer();
  document.addEventListener('mousedown', reject);
  $(input).on('copy', resolve);
  component.$().on('focusout', reject);

  return promise.finally(function () {
    document.removeEventListener('mousedown', reject);
    $(input).off('copy', resolve);
  });
}

/**
  The `{{copy-button}}` provides a way to copy text into
  a user's clipboard. It takes a `text` property which will
  be the text that will be copied to the clipboard.

  An `oncopy` action will be called when the user copies the
  text, either from a keyboard shortcut or from a click.

  `{{copy-button}}`s have support for Safari, which prevents
  programmatic copying, requiring users to use keyboard shortcuts
  to copy text. It provides a prompt for users, along with
  a successful message when it works.

  ```handlebars
  {{#copy-button text=html}}
    copy html
  {{/copy-button}}
  ```

  @public
  @class CopyButton
  @extends Ember.Component
 */
export default Component.extend({
  tabindex: 0,

  /**
    The text that will be copied to the clipboard.

    @property text
    @default ''
    @required
   */
  text: '',

  /**
    The `oncopy` property is called when
    text is copied to the clipboard.

    @event oncopy
    @param {Function} action The action to call when the text is copied
   */

  osx: navigator.platform.match(/Mac/),

  tagName: 'button',
  classNames: ['copy', 'whitespace-nowrap'],
  classNameBindings: ['copied.isRunning:copied', 'prompt.isRunning:prompt'],
  attributeBindings: ['disabled', 'tabindex'],

  lockSize() {
    $(this.element).css('minWidth', $(this.element).width());
    $(this.element).children('.liquid-container').css('minWidth', $(this.element).width());
  },

  copyText: task(function* (text) {
    try {
      yield copy(text);
      yield get(this, 'copied').perform();
      yield timeout(600);
    } catch (e) {
      yield get(this, 'prompt').perform();
    }
  }).drop(),

  prompt: task(function* () {
    selectText(this);
    yield oncopy(this);
    yield get(this, 'copied').perform();
  }).drop(),

  wait: task(function* () {
    yield timeout(750);
  }),

  copied: task(function* () {
    if (get(this, 'oncopy')) {
      get(this, 'oncopy')();
    }
    yield timeout(500);
  }),

  focusIn() {
    if (this._mayClick) {
      return;
    }

    this.focused = true;
    this.lockSize();

    get(this, 'prompt')
      .perform()
      .then(() => {
        return get(this, 'wait').perform();
      })
      .then(
        () => {
          if (this.focused) {
            return this.focusIn();
          }
        },
        function () {}
      );
  },

  focusOut() {
    this.focused = false;
  },

  mouseDown() {
    // Without this, when a user clicks on the button,
    // it will become focused and trigger the prompt.
    this._mayClick = true;
    const unsetMayClick = () => {
      $(document).off('mouseup', unsetMayClick);
      this._mayClick = false;
    };
    $(document).on('mouseup', unsetMayClick);
  },

  keyUp(evt) {
    switch (evt.which) {
      case ESCAPE:
        get(this, 'element').blur();
        window.getSelection().removeAllRanges();
        get(this, 'prompt').cancelAll();
    }
  },

  click(evt) {
    evt.preventDefault();
    if (this._finishingAnimation) {
      return;
    }

    this.lockSize();
    get(this, 'copyText').perform(get(this, 'text'));
  },
});
