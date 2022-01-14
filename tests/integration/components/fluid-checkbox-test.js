import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import td from 'testdouble';
import percySnapshot from '@percy/ember';

module('Integration | Component | fluid-checkbox', function (hooks) {
  setupRenderingTest(hooks);

  module('rendering', function () {
    test('with a `@label` argument', async function (assert) {
      await render(hbs`
        <FluidCheckbox data-test-input @label="The label" />
      `);

      await percySnapshot(assert);

      assert.dom('[data-test-input]').hasText('The label', 'it renders the passed label');

      const { id: labelId } = find('label');
      assert
        .dom('[data-test-input] [role="checkbox"]')
        .hasAria('labelledby', labelId, 'It connects the label element to the checkbox');
    });

    test('with a block label', async function (assert) {
      await render(hbs`
        <FluidCheckbox data-test-input>
          The block label
        </FluidCheckbox>
      `);

      await percySnapshot(assert);

      assert.dom('[data-test-input]').hasText('The block label', 'it accepts the label as a block');
    });

    test('when `@checked` is `true`', async function (assert) {
      await render(hbs`
        <FluidCheckbox
          data-test-input
          @checked={{true}}
        />
      `);

      await percySnapshot(assert);

      assert.dom('[data-test-input] label').doesNotExist('The label is not rendered');
      assert.dom('[data-test-input] [role="checkbox"]').hasAria('checked', 'true');
    });

    test('when `@checked` is `false`', async function (assert) {
      await render(hbs`
        <FluidCheckbox
          data-test-input
          @checked={{false}}
        />
      `);

      await percySnapshot(assert);

      assert.dom('[data-test-input] [role="checkbox"]').hasAria('checked', 'false');
    });

    test('when `@disabled` is `true`', async function (assert) {
      await render(hbs`
        <FluidCheckbox
          data-test-input
          @disabled={{true}}
        />
      `);

      await percySnapshot(assert);

      assert.dom('[data-test-input] [role="checkbox"]').isDisabled();
    });
  });

  test('calling `@onchange` on click', async function (assert) {
    this.isChecked = false;
    this.onchange = td.function();

    await render(hbs`
      <FluidCheckbox
        data-test-input
        @checked={{this.isChecked}}
        @onchange={{this.onchange}}
      />
    `);

    // Click while not checked
    await click('[data-test-input] [role="checkbox"]');

    assert.verify(this.onchange(true));

    // Click while checked
    this.set('isChecked', true);
    await click('[data-test-input] [role="checkbox"]');

    assert.verify(this.onchange(false));
  });

  test('calling `@onchange` on key-press', async function (assert) {
    this.isChecked = false;
    this.onchange = td.function();

    await render(hbs`
      <FluidCheckbox
        data-test-input
        @checked={{this.isChecked}}
        @onchange={{this.onchange}}
      />
    `);

    // key press while not checked
    await triggerKeyEvent('[data-test-input] [role="checkbox"]', 'keyup', 32);

    assert.verify(this.onchange(true));

    // key press while checked
    this.set('isChecked', true);
    await triggerKeyEvent('[data-test-input] [role="checkbox"]', 'keyup', 32);

    assert.verify(this.onchange(false));
  });
});
