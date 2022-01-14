import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('component:fluid-radio-button', function (hooks) {
  setupRenderingTest(hooks);

  let onSelect;
  let value;
  let groupValue;
  let label;
  hooks.beforeEach(async function () {
    onSelect = sinon.stub();
    value = 'foo';
    groupValue = 'bar';
    label = 'FooBarBaz';
    this.setProperties({ onSelect, value, groupValue, label });

    await render(
      hbs`<FluidRadioButton
            @groupValue={{this.groupValue}}
            @value={{this.value}}
            @label={{this.label}}
            @changed={{this.onSelect}}
          />`
    );
  });

  test('it renders properly', async function (assert) {
    assert.dom('.fluid__radio').hasText(label, 'it renders the lablel properly');
    assert
      .dom('.fluid__radio .radio__radio')
      .isNotChecked('it is not checked if value does not match groupValue');
  });

  test('it calls action when clicked', async function (assert) {
    await click('.fluid__radio');
    assert.ok(
      onSelect.calledWith(value),
      'clicking the element calls the changed action passing the clicked value'
    );
    assert
      .dom('.fluid__radio .radio__radio')
      .isChecked('clicking the element will check the button');
  });

  test('it updates the checked state when groupValue is changed', async function (assert) {
    assert.dom('.fluid__radio .radio__radio').isNotChecked();
    await this.set('groupValue', 'foo');
    assert.dom('.fluid__radio .radio__radio').isChecked();
    await this.set('groupValue', 'bar');
    assert.dom('.fluid__radio .radio__radio').isNotChecked();
  });
});
