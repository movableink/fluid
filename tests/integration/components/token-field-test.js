import { blur, find, fillIn, focus, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import sinon from 'sinon';
import { setupRenderingTest } from 'ember-qunit';

const DISPLAY = '.token-field__input';
const INPUT = 'input';

module('component:token-field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (newText) => {
      this.set('value', newText);
    });
  });

  test('it renders its value', async function (assert) {
    const value = 'here is some text';
    this.set('value', value);

    await render(hbs`{{token-field value=value update=update}}`);

    assert.dom(DISPLAY).hasText(value, 'it renders the set value');
  });

  test('it renders text inside square brackets as tokens', async function (assert) {
    const value = 'Hello, [mi_name]';
    const valueAsHTML = 'Hello, <span class="token-field__token">mi_name</span>';

    this.set('value', value);
    await render(hbs`{{token-field value=value update=update}}`);

    assert.equal(find(DISPLAY).innerHTML, valueAsHTML);
  });

  test('it renders tokens without the surrounding brackets', async function (assert) {
    const value = '[token]';

    this.set('value', value);
    await render(hbs`{{token-field value=value update=update}}`);

    assert.dom(DISPLAY).hasText('token');
  });

  test('it renders a input when focused', async function (assert) {
    await render(hbs`{{token-field value=value update=update}}`);

    assert.dom(INPUT).doesNotExist();

    await focus(DISPLAY);

    assert.dom(INPUT).exists({ count: 1 });
  });

  test('it gets the --focus class when in edit mode', async function (assert) {
    await render(hbs`{{token-field value=value update=update}}`);

    const field = document.querySelector('.token-field');
    assert.dom(field).hasNoClass('token-field--focus');

    await focus(DISPLAY);

    assert.dom(field).hasClass('token-field--focus');
  });

  test('it renders the value without HTML inside the input', async function (assert) {
    const value = 'Hello, [mi_name]!';
    this.set('value', value);

    await render(hbs`{{token-field value=value update=update}}`);

    await focus(DISPLAY);

    assert.dom(INPUT).hasValue(value);
  });

  test('it updates the value', async function (assert) {
    assert.expect(2);
    const value = 'Hello!';
    const input = 'A';

    this.set('update', (newValue) => {
      assert.equal(newValue, value + input);
      assert.ok(true, 'it calls update when the input is typed into');
    });

    await render(hbs`{{token-field value=value update=update}}`);

    await focus(DISPLAY);

    await fillIn(INPUT, value + input);
  });

  test('when passed a block', async function (assert) {
    const value = 'hello!';
    const update = sinon.stub();
    this.setProperties({ value, update });

    await render(hbs`
    {{#token-field value=value update=(action update) as |field|}}
      <input
        value={{field.value}}
        onblur={{action field.focusOut}}
        oninput={{action field.update value="target.value"}} />
    {{/token-field}}
    `);

    await focus(DISPLAY);
    const input = document.querySelector('.token-field input');

    assert.equal(input.value, value, 'it yields the value');
    assert.ok(input, 'it renders the passed input when focused');
    assert.notOk(document.querySelector('.token-field__display'));

    const newValue = 'The Goog?';

    await fillIn(input, newValue);
    assert.ok(update.calledWith(newValue), 'it yields the update action');
    await blur(input);

    assert.ok(document.querySelector('.token-field__display'), 'it yields the focusOut action');
  });

  test('placeholder styling', async function (assert) {
    const value = '';
    const placeholder = 'Banana';
    this.setProperties({ value, placeholder });

    await render(hbs`{{token-field value=value placeholder=placeholder}}`);

    let field = document.querySelector('.token-field');
    assert.dom(field).hasClass('token-field--placeholder', 'it has the placeholder class');
    assert.equal(field.innerText.trim(), placeholder, 'it shows the placeholder');

    const newValue = 'A Value!';
    this.set('value', newValue);

    field = document.querySelector('.token-field');
    assert
      .dom(field)
      .hasNoClass('token-field--placeholder', 'it does not have the placeholder class');
    assert.equal(field.innerText.trim(), newValue, 'it shows the value');
  });
});
