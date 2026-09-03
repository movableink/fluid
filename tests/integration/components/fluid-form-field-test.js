import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '@percy/ember';

module('Integration | Component | fluid-form-field', function (hooks) {
  setupRenderingTest(hooks);

  test('linking the `label` to the input', async function (assert) {
    await render(hbs`
      <FluidFormField @label="My Label" as |field|>
        <field.Text />
      </FluidFormField>
    `);
    await percySnapshot(assert);

    assert.dom('label').hasText('My Label', 'Passes along the `label` content');

    const label = find('label');
    const labelFor = label.getAttribute('for');

    assert.ok(labelFor, 'Label has a `for` attribute');
    assert
      .dom('input')
      .hasAttribute('id', labelFor, '`id` on the input and `for` on the label match');
  });

  test('displaying the `required` corner hint', async function (assert) {
    await render(hbs`
      <FluidFormField @isRequired={{true}} as |field|>
        <field.Text />
      </FluidFormField>
    `);
    await percySnapshot(assert);

    assert.dom().hasText('*', 'Has the `Required` text');
  });

  test('displaying error messages', async function (assert) {
    await render(hbs`
      <FluidFormField @errorMessages={{array "Foo" "Bar"}} as |field|>
        <field.Text />
      </FluidFormField>
    `);
    await percySnapshot(assert);

    assert.dom('li').exists({ count: 2 }, 'Renders 2 error messages');

    await render(hbs`
      <FluidFormField @errorMessage="Foo" as |field|>
        <field.Text />
      </FluidFormField>
    `);

    assert.dom('li').exists({ count: 1 }, 'Renders 1 error message');
  });

  test('displaying warning messages', async function (assert) {
    await render(hbs`
      <FluidFormField @warningMessages={{array "Foo" "Bar"}} as |field|>
        <field.Text />
      </FluidFormField>
    `);
    await percySnapshot(assert);

    assert.dom('li').exists({ count: 2 }, 'Renders 2 warning messages');

    await render(hbs`
      <FluidFormField @warningMessage="Foo" as |field|>
        <field.Text />
      </FluidFormField>
    `);

    assert.dom('li').exists({ count: 1 }, 'Renders 1 warning message');
  });

  test('associating error messages with the input', async function (assert) {
    await render(hbs`
      <FluidFormField @errorMessages={{array "Foo" "Bar"}} as |field|>
        <field.Text />
      </FluidFormField>
    `);

    const { id } = find('[data-test-error-messages-for]');

    assert.ok(id, 'Error list has an `id` to be referenced by');
    assert.dom('input').hasAria('describedby', id, 'Input is described by the error list');
    assert.dom('input').hasAria('invalid', 'true', 'Input is marked invalid');
  });

  test('associating help text with the input', async function (assert) {
    await render(hbs`
      <FluidFormField @helpText="Use your full name" as |field|>
        <field.Text />
      </FluidFormField>
    `);

    const helpText = find('[data-test-help-text-for] span');

    assert.dom('input').hasAria('describedby', helpText.id, 'Input is described by the help text');
    assert
      .dom('input')
      .doesNotHaveAttribute('aria-invalid', 'Help text alone does not make the field invalid');
  });

  test('describing the input by every message it renders', async function (assert) {
    await render(hbs`
      <FluidFormField
        @helpText="Use your full name"
        @errorMessage="Too short"
        @warningMessage="Unusual name"
        as |field|
      >
        <field.Text />
      </FluidFormField>
    `);

    const ids = [
      find('[data-test-help-text-for] span').id,
      find('[data-test-error-messages-for]').id,
      find('[data-test-warning-messages-for]').id,
    ];

    assert
      .dom('input')
      .hasAria(
        'describedby',
        ids.join(' '),
        'Input is described by the help text, errors and warnings in visual order'
      );
  });

  test('rendering without any messages', async function (assert) {
    await render(hbs`
      <FluidFormField @label="My Label" as |field|>
        <field.Text />
      </FluidFormField>
    `);

    assert
      .dom('input')
      .doesNotHaveAttribute(
        'aria-describedby',
        'Does not point at a description that was never rendered'
      );
    assert
      .dom('input')
      .doesNotHaveAttribute('aria-invalid', 'Is not marked invalid without an error');
  });

  test('associating error messages with an input rendered in block mode', async function (assert) {
    await render(hbs`
      <FluidFormField @errorMessage="Too short" as |field|>
        <field.Text as |text|>
          <text.input />
        </field.Text>
      </FluidFormField>
    `);

    const { id } = find('[data-test-error-messages-for]');

    assert.dom('input').hasAria('describedby', id, 'Input is described by the error list');
    assert.dom('input').hasAria('invalid', 'true', 'Input is marked invalid');
  });

  test('associating error messages with a date input', async function (assert) {
    await render(hbs`
      <FluidFormField @errorMessage="Pick a later date" as |field|>
        <field.Date />
      </FluidFormField>
    `);

    const { id } = find('[data-test-error-messages-for]');

    assert.dom('button').hasAria('describedby', id, 'Trigger is described by the error list');
    assert.dom('button').hasAria('invalid', 'true', 'Trigger is marked invalid');
  });

  test('dynamically selecting field type', async function (assert) {
    await render(hbs`
      <FluidFormField @type="date" as |Field|>
        <Field />
      </FluidFormField>
    `);
    await percySnapshot(assert);

    assert.dom('button').exists('Renders calendar button');
  });

  test('text overflow', async function (assert) {
    await render(hbs`
      <FluidFormField style="width:100px;border:1px solid black" @type="text" as |Field|>
        <Field @value="Value Is Very Very Very Very Very Very Very long" />
      </FluidFormField>
    `);

    await percySnapshot(assert);

    assert.dom('input').exists('Renders input');
  });
});
