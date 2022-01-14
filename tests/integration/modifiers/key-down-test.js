import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import td from 'testdouble';

module('Integration | Modifier | key-down', function (hooks) {
  setupRenderingTest(hooks);

  test('it recognizes a key on an input', async function (assert) {
    this.onEnter = td.function();

    await render(hbs`<input {{key-down 'Enter' this.onEnter}}>`);

    await triggerKeyEvent('input', 'keydown', 'Enter', { altKey: true });

    assert.verify(
      this.onEnter(),
      { ignoreExtraArgs: true, times: 0 },
      'Did not call the handler when a modifier was provided'
    );

    await triggerKeyEvent('input', 'keydown', 'Enter');

    assert.verify(
      this.onEnter(td.matchers.argThat((arg) => arg.constructor.name === 'KeyboardEvent')),
      { times: 1 },
      'Called with the event as an argument'
    );
  });

  test('it can require a modifier for the input', async function (assert) {
    this.onEnter = td.function();

    await render(hbs`<input {{key-down 'Enter' this.onEnter altKey=true}}>`);

    await triggerKeyEvent('input', 'keydown', 'Enter');

    assert.verify(
      this.onEnter(),
      { ignoreExtraArgs: true, times: 0 },
      'Did not call the handler when the modifier is not part of the trigger'
    );

    await triggerKeyEvent('input', 'keydown', 'Enter', { altKey: true });

    assert.verify(
      this.onEnter(td.matchers.argThat((arg) => arg.constructor.name === 'KeyboardEvent')),
      { times: 1 },
      'Called with the event as an argument when the modifer is provided'
    );
  });
});
