import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import td from 'testdouble';
import percySnapshot from '@percy/ember';

module('Integration | Component | fluid-drawer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.onClose = td.function();
  });

  test('when the drawer is closed', async function (assert) {
    await render(hbs`
      <FluidDrawer
        @isOpen={{false}}
        @onClose={{this.onClose}}
        data-test-drawer
      >
        <:content>
          Content!
        </:content>
      </FluidDrawer>
    `);

    await percySnapshot(assert);

    assert.dom('[data-test-drawer]').doesNotExist();
  });

  test('when the drawer is open', async function (assert) {
    await render(hbs`
      <FluidDrawer
        @isOpen={{true}}
        @onClose={{this.onClose}}
        data-test-drawer
      >
        <:title>Drawer Title</:title>

        <:content>
          Content!
        </:content>
      </FluidDrawer>
    `);

    await percySnapshot(assert);

    assert.dom('[data-test-drawer]').containsText('Content!');
  });

  test('the `onClose` action is called', async function (assert) {
    await render(hbs`
      <FluidDrawer
        @isOpen={{true}}
        @onClose={{this.onClose}}
        data-test-drawer
      >
        <:title>Drawer Title</:title>

        <:content>
          Content!
        </:content>
      </FluidDrawer>
    `);

    await click('[data-test-drawer-close]');

    assert.verify(
      this.onClose(td.matchers.isA(MouseEvent)),
      'Called by clicking the "close button"'
    );

    await click('[data-test-drawer-overlay]');

    assert.verify(this.onClose(), 'Called by clicking the overlay');
  });
});
