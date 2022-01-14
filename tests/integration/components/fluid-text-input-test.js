import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import td from 'testdouble';
import percySnapshot from '@percy/ember';

module('Integration | Component | fluid-text-input', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.handleInput = td.function();
  });

  test('oeprating like a text input', async function (assert) {
    await render(hbs`
      <FluidTextInput
        @value="Value"
        @placeholder="Placeholder"
        {{on 'input' this.handleInput}}
      />
    `);

    assert.dom('input').hasValue('Value', 'Passes the `@value` to the input');
    assert
      .dom('input')
      .hasAttribute('placeholder', 'Placeholder', 'Passes the `@placeholder` to the input');

    await fillIn('input', 'foobar');

    assert.verify(
      this.handleInput(td.matchers.isA(Event)),
      'Can listen for input events with the {{on}} modifier'
    );
    assert.verify(
      this.handleInput(td.matchers.contains({ target: { value: 'foobar' } })),
      'Event target is the input element'
    );
  });

  test('disabling the input', async function (assert) {
    await render(hbs`
      <FluidTextInput
        @value="Value"
        @placeholder="Placeholder"
        @disabled={{true}}
      />
    `);

    assert.dom('input').isDisabled();
  });

  test('it can render an icon in the input', async function (assert) {
    await render(hbs`
      <FluidTextInput as |ft|>
        <ft.icon @name="search" />
        <ft.input value="Value" />
      </FluidTextInput>
    `);
    await percySnapshot(assert);

    assert.dom('svg').exists('Renders an icon');
  });

  test('it can render a leading add-on', async function (assert) {
    await render(hbs`
      <FluidTextInput as |ft|>
        <ft.leading @letter="w" data-test-leading />
        <ft.input value="Value" />
      </FluidTextInput>
    `);
    await percySnapshot(assert);

    assert.dom('[data-test-leading]').hasText('w');
  });

  test('passing a type attribute changes the type of input', async function (assert) {
    await render(hbs`
      <FluidTextInput @type="password" />
    `);

    assert.dom('input').hasAttribute('type', 'password', 'Can provide custom type to input');
  });

  module('rendering the input in block mode', function () {
    test('passing properties to the FluidTextInput', async function (assert) {
      await render(hbs`
        <FluidTextInput @value="Value" @placeholder="Placeholder" @disabled={{true}} @type="password" as |ft|>
          <ft.input />
        </FluidTextInput>
      `);

      assert.dom('input').hasValue('Value', 'Passes along the `value` argument');
      assert
        .dom('input')
        .hasAttribute('placeholder', 'Placeholder', 'Passes along the `placeholder` argument');
      assert.dom('input').isDisabled('Passes along the `disabled` argument');
      assert.dom('input').hasAttribute('type', 'password', 'Passes along the `type` argument');
    });

    test('passing attributes directly to the input', async function (assert) {
      await render(hbs`
        <FluidTextInput as |ft|>
          <ft.input value="Value" />
        </FluidTextInput>
      `);

      assert.dom('input').hasValue('Value', 'Can provide attributes directly to the input');
    });
  });
});
