import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hero-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <div data-test-icon="outline">
        {{svg-jar "outline-cog-8-tooth" class="w-4 h-4 text-aqua-400"}}
      </div>

      <div data-test-icon="solid">
        {{svg-jar "solid-cog-8-tooth" class="w-8 h-8 text-violet-400"}}
      </div>
    `);

    assert.dom('[data-test-icon="outline"] svg').hasClass('text-aqua-400');
    assert.dom('[data-test-icon="solid"] svg').hasClass('text-violet-400');
    assert.dom('[data-test-icon="outline"] svg path').exists();
    assert.dom('[data-test-icon="solid"] svg path').exists();
  });
});
