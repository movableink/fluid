import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('component:percent-field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(async function () {
    this.set('value', null);
    this.actions.change = (value) => {
      this.set('value', value);
    };
    this.actions.blur = () => {
      this.set('blurred', true);
    };
    await render(
      hbs`{{percent-field value=value onchange=(action 'change') focus-out=(action 'blur')}}`
    );
  });

  test('clean slate', async function (assert) {
    assert.dom('input').hasValue('');
  });

  test('displays percent', async function (assert) {
    await fillIn('input', '50');
    assert.dom('input').hasValue('50%');
  });

  test('values are multiplied by 100', async function (assert) {
    this.set('value', 0.25);
    assert.dom('input').hasValue('25%');

    this.set('value', 0.0125);
    assert.dom('input').hasValue('1.25%');
  });

  test('can enter 2-digit input when empty', async function (assert) {
    this.set('value', null);

    assert.dom('input').hasValue('');

    await fillIn('input', '52');

    assert.dom('input').hasValue('52%');
  });
});
