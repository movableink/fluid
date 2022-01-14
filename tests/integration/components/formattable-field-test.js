import { blur, fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('component:formattable-field', function (hooks) {
  setupRenderingTest(hooks);

  test('calls the format method, but only updates displayed value on blur', async function (assert) {
    assert.expect(3);
    this.set('format', (val) => {
      assert.equal(val, 'Poke', 'called with string to format');
      this.set('value', val + 'Ball');
    });

    // format should be implemented through extending the component, but for testing purposes
    // it is just being passed in here
    await render(hbs`<FormattableField @value={{this.value}} @format={{this.format}}/>`);

    await fillIn('input', 'Poke'); // triggers only focus
    assert.dom('input').hasValue('Poke', 'display not updated');

    await blur('input');
    assert.dom('input').hasValue('PokeBall', 'display updated');
  });

  test('the input field is disabled if passed disabled', async function (assert) {
    await render(hbs`<FormattableField @value={{this.value}} @disabled={{true}}/>`);
    assert.dom('input').isDisabled();
  });

  test('renders a placeholder', async function (assert) {
    await render(hbs`<FormattableField @value={{this.value}} @placeholder={{"hold my place"}}/>`);
    assert.dom('input[placeholder="hold my place"]').exists();
  });
});
