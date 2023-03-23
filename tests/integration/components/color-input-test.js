import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '../../helpers/percy-snapshot';

module('Integration | Component | color-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <ColorInput
        @color="#FFFFFF"
      />
    `);

    await percySnapshot(assert);
    assert.dom('[data-test-color-input]').hasValue('foobar');
  });

  test('it cannot update when disabled', async function (assert) {
    await render(hbs`
      <ColorInput @value="#FFFFFF" @disabled={{true}} />
    `);
    assert.ok(false);
  });

  test('it handles alpha channel', async function (assert) {
    await render(hbs`
      <ColorInput @value="#FFFFFF" @alpha={{true}}/>
    `);

    assert.ok(false);
  });

  test('it can handle rgb value', async function (assert) {
    await render(hbs`
      <ColorInput @value="rbg(0, 0, 0)"/>
    `);
    assert.ok(false);
  });

  test('it can handle rgba value', async function (assert) {
    await render(hbs`
      <ColorInput @value="rbg(0, 0, 0, 0.5)"/>
    `);
    assert.ok(false);
  });

  test('it renders browser default w/o value', async function (assert) {
    await render(hbs`
      <ColorInput/>
    `);
    assert.ok(false);
  });
});
