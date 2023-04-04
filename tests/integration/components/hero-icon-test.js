import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hero-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <HeroIcon @icon="cog-8-tooth" class="w-4 h-4 text-aqua-400" data-test-outline-icon/>
      <HeroIcon @icon="cog-8-tooth" @type="solid" class="w-8 h-8 text-violet-400" data-test-solid-icon/>
    `);

    assert.dom('[data-test-outline-icon]').hasClass('text-aqua-400');
    assert.dom('[data-test-solid-icon]').hasClass('text-violet-400');
  });
});
