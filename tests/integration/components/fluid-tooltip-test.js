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
});
