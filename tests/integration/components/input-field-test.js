import { fillIn, find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';

module('component:input-field', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the input', async function (assert) {
    const value = 'banana';
    this.set('value', value);
    await render(hbs`<InputField @value={{this.value}}/>`);
    assert.dom('.input-field input').hasValue(value);
  });

  test('it renders the label', async function (assert) {
    const label = 'hello';
    this.set('label', label);
    await render(hbs`<InputField @label={{this.label}}/>`);
    assert.dom('label').hasText(label);
  });

  test('it renders the sublabel', async function (assert) {
    const sublabel = 'goodbye';
    this.set('sublabel', sublabel);
    await render(hbs`<InputField @sublabel={{this.sublabel}}/>`);
    assert.dom('label.sub').hasText(sublabel);
  });

  test('it renders the monogram', async function (assert) {
    const monogram = 'Z';
    this.set('monogram', monogram);
    await render(hbs`<InputField @monogram={{this.monogram}}/>`);
    assert.dom('label.monogram').hasText(monogram);
  });

  test('the labels reference a unique id', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <InputField @label='foo' @sublabel='bar' @monogram='z'/>
    `);

    const id = find('input').id;

    findAll('.input-field label').forEach((el) => {
      assert.dom(el).hasAttribute('for', id);
    });
  });

  test('it passes the update action to the nested input', async function (assert) {
    let updated = false;
    this.set('update', function () {
      updated = true;
    });
    await render(hbs`
      <InputField @value='' @update={{this.update}}/>
    `);

    await fillIn('input', 'banana');
    assert.ok(updated);
  });

  test('it passes the onchange action to the nested input', async function (assert) {
    let onchanged = false;
    this.set('onchange', function () {
      onchanged = true;
    });
    await render(hbs`
      <InputField @value='' @onchange={{this.onchange}}/>
    `);

    await fillIn('input', 'banana');
    assert.ok(onchanged);
  });

  test('it yields to a block', async function (assert) {
    const id = 'banana';
    this.set('uniqueId', id);
    await render(hbs`
      <InputField @uniqueId={{this.uniqueId}} as |field| >
        <div id='unique-id'>{{field.id}}</div>
      </InputField>
    `);

    assert.dom('input').doesNotExist('it renders the block in place of the input');
    assert.dom('#unique-id').hasText(id, 'it passes the uniqueId property in the hash');
  });
});
