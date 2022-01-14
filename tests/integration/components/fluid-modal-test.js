import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import percySnapshot from '@percy/ember';
import td from 'testdouble';

module('Integration | Component | FluidModal', function (hooks) {
  setupRenderingTest(hooks);

  test('rendering with a header and footer', async function (assert) {
    await render(hbs`
      <FluidModal @title="Header Content">
        <:default>
          Modal Content
        </:default>

        <:footer>
          <button class="fluid-button size:lg">
            Close
          </button>
        </:footer>
      </FluidModal>
    `);

    await percySnapshot(assert);

    assert.dom('header').hasText('Header Content');
    assert.dom('footer').hasText('Close');

    const { id } = find('h1');
    assert.dom('[role="dialog"]').hasAria('labelledby', id, 'Dialog is labeled by title element');
  });

  test('rendering without a header or footer', async function (assert) {
    await render(hbs`
      <FluidModal>
        <button>I am a bare modal</button>
      </FluidModal>
    `);

    await percySnapshot(assert);

    assert.dom('button').hasText('I am a bare modal');
  });

  test('rendering the header in block mode', async function (assert) {
    await render(hbs`
      <FluidModal>
        <:header as |Title Icon|>
          <Icon @name="alert" @class="text-yellow-400 fill-current" />
          <Title>Header Content</Title>
        </:header>

        <:default>
          Modal Content
        </:default>

        <:footer>
          <button class="fluid-button size:lg">
            Close
          </button>
        </:footer>
      </FluidModal>
    `);

    assert.dom('h1').hasText('Header Content');

    const { id } = find('h1');
    assert.dom('[role="dialog"]').hasAria('labelledby', id, 'Dialog is labeled by title element');
  });

  test('closing the modal when clicking outside of it', async function (assert) {
    this.onClose = td.function();

    await render(hbs`
      <FluidModal @onClose={{this.onClose}}>
        <:footer>
          <button class="fluid-button size:lg">
            Close
          </button>
        </:footer>
      </FluidModal>
    `);

    await click(this.element); // Click outside the modal

    assert.verify(this.onClose(), { ignoreExtraArgs: true }, 'Called the `onClose` callback');
  });

  // WARNING:
  // This is extremely flakey
  skip('setting the initial focus', async function (assert) {
    this.setButtonElement = (element) => {
      this.buttonElement = element;
    };

    await render(hbs`
      <FluidModal>
        <:footer>
          <button data-test-focus-button class="fluid-button size:lg" {{did-insert this.setButtonElement}}>
            Close
          </button>
        </:footer>
      </FluidModal>
    `);
    await settled(); // Wait for modifiers to all fire

    assert.dom('[data-test-focus-button ]').isFocused();
  });
});
