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
