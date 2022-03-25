import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '@percy/ember';

module('Integration | Component | fluid-tooltip', function (hooks) {
  setupRenderingTest(hooks);

  test('the tooltip displays the correct text and attachment', async function (assert) {
    await render(hbs`
    <div class="m-40">
      <FluidTooltip>
        <:tooltip>
          template block text
        </:tooltip>

        <:default as |attachTooltip|>
          <button {{attachTooltip}}>
            Hover me!
          </button>
        </:default>
      </FluidTooltip>
    </div>
  `);
    assert.dom('button').hasText('Hover me!');
    await triggerEvent('button', 'mouseenter');
    assert.dom('[data-test-tooltip]').hasText('template block text');
    await percySnapshot(assert);
  });

  test('the tooltip is hidden by default', async function (assert) {
    await render(hbs`
      <div class="m-40">
        <FluidTooltip>
          <:tooltip>
            template block text
          </:tooltip>

          <:default as |attachTooltip|>
            <button {{attachTooltip}}>
              Hover me!
            </button>
          </:default>
        </FluidTooltip>
      </div>
    `);

    assert.dom('[data-test-tooltip]').doesNotExist('the tooltip is hidden by default');
    await percySnapshot(assert);
  });

  test('the tooltip displays on mousenter and disappears on mouseleave', async function (assert) {
    await render(hbs`
      <div class="m-40">
        <FluidTooltip>
          <:tooltip>
            additional information
          </:tooltip>

          <:default as |attachTooltip|>
            <button {{attachTooltip}}>
              Hover me!
            </button>
          </:default>
        </FluidTooltip>
      </div>
    `);

    assert.dom('[data-test-tooltip]').doesNotExist('the tooltip is hidden by default');

    await triggerEvent('button', 'mouseenter');
    assert.dom('[data-test-tooltip]').exists('hovering displays the tooltip');
    assert.dom('[data-test-tooltip]').hasText('additional information');

    await triggerEvent('button', 'mouseleave');
    assert.dom('[data-test-tooltip]').doesNotExist('tooltip disappears on mouseleave');
  });

  test('the tooltip has correct z-index when used in modal', async function (assert) {
    await render(hbs`
      <FluidModal @title="Header Content">
        <:default>
        <FluidTooltip>
        <:tooltip>
          template block text
        </:tooltip>

        <:default as |attachTooltip|>
          <button {{attachTooltip}}>
            Hover me!
          </button>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin magna nulla, laoreet eu tempus quis, rutrum a tortor. Proin in dolor non nisi tincidunt ultrices. Praesent sed tincidunt magna. Duis nisl ipsum, posuere non diam vel, feugiat viverra ipsum. Nulla sed libero sollicitudin, rutrum tortor a, luctus tortor. Integer non arcu eu tortor vehicula sollicitudin. Suspendisse nec molestie sapien. Morbi volutpat leo auctor tortor elementum, ac hendrerit nibh imperdiet. Praesent finibus lectus imperdiet lectus tincidunt, sed vestibulum lorem scelerisque. Quisque in tempor nunc, non ornare mauris. Duis condimentum, enim et rhoncus venenatis, tellus odio varius quam, vitae sodales est ligula nec nulla.</p>
        </:default>
      </FluidTooltip>
        </:default>

        <:footer>
          <button class="fluid-button size:lg">
            Close
          </button>
        </:footer>
      </FluidModal>
    `);
    await triggerEvent('button', 'mouseenter');
    await percySnapshot(assert);
    assert.expect(0);
  });
});
