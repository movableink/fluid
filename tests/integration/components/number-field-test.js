import { blur, fillIn, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('component:number-field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(async function () {
    this.changed = 0;
    this.set('value', 1000000);
    this.set('min', 0);
    this.set('max', 1000000);
    this.set('step', 1);
    this.set('precision', 0);
    this.actions.change = (value) => {
      this.changed++;
      this.set('value', value);
    };
    this.actions.blur = () => {
      this.set('blurred', true);
    };
    await render(
      hbs`{{number-field value=value onchange=(action 'change') focus-out=(action 'blur') min=min max=max step=step precision=precision}}`
    );
  });

  test('values are formatted at a resting state with commas', async function (assert) {
    assert.dom('input').hasValue('1,000,000');
  });

  test('typing a number displays commas', async function (assert) {
    await fillIn('input', '200000');
    assert.dom('input').hasValue('200,000');
    assert.equal(this.get('value'), 200000);
  });

  test('focus-out is invoked when the field is blurred', async function (assert) {
    await fillIn('input', '100');
    await blur('input');

    assert.ok(this.get('blurred'));
  });

  test('maximum values', async function (assert) {
    await fillIn('input', '10,000,000');
    assert.equal(this.get('value'), this.get('max'));
    assert.dom('input').hasValue('1,000,000');
  });

  test('maximum values with precision', async function (assert) {
    this.set('precision', 2);
    await fillIn('input', '1,000,000.25');
    assert.equal(this.get('value'), this.get('max'));
    assert.dom('input').hasValue('1,000,000');
  });

  test('minimum values', async function (assert) {
    await fillIn('input', '-20');
    assert.equal(this.get('value'), this.get('min'));
    assert.dom('input').hasValue('0');
  });

  test('up arrow', async function (assert) {
    this.set('value', 10);
    await triggerKeyEvent('input', 'keydown', 38);
    assert.equal(this.get('value'), 11);

    await triggerKeyEvent('input', 'keydown', 38);
    assert.equal(this.get('value'), 12);
  });

  test('down arrow', async function (assert) {
    this.set('value', 10);
    await triggerKeyEvent('input', 'keydown', 40);
    assert.equal(this.get('value'), 9);

    await triggerKeyEvent('input', 'keydown', 40);
    assert.equal(this.get('value'), 8);
  });

  test('step', async function (assert) {
    this.set('value', 10);
    this.set('step', 5);
    await triggerKeyEvent('input', 'keydown', 40);
    assert.equal(this.get('value'), 5);

    await triggerKeyEvent('input', 'keydown', 38);
    assert.equal(this.get('value'), 10);
  });

  test('numbers with decimal places', async function (assert) {
    this.set('precision', 5);

    // Ensure zeros are kept
    await fillIn('input', '100.0000');
    assert.equal(this.get('value'), 100);
    assert.dom('input').hasValue('100.0000');

    // Decimal places!
    await fillIn('input', '100.00001');
    assert.equal(this.get('value'), 100.00001);
    assert.dom('input').hasValue('100.00001');

    // Don't allow more precise numbers
    await fillIn('input', '100.000005');
    assert.equal(this.get('value'), 100);
    assert.dom('input').hasValue('100.00000');

    await fillIn('input', '12.1.5');
    assert.equal(this.get('value'), 12.15);
    assert.dom('input').hasValue('12.15');
  });

  test('blank values', async function (assert) {
    await fillIn('input', '');
    assert.equal(this.get('value'), null);
  });

  test('floating point', async function (assert) {
    this.set('precision', 2);
    await fillIn('input', '10.2');
    assert.equal(this.get('value'), 10.2);
  });

  test('set value does not fire unnecessary calls to `onchange` if the value has not actually changed', function (assert) {
    this.set('value', 50);
    assert.equal(this.changed, 0);
  });
});
