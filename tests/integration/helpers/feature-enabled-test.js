import EmberObject from '@ember/object';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('helper:feature-enabled', function (hooks) {
  setupRenderingTest(hooks);

  test('feature-enabled queries the features service', async function (assert) {
    this.owner.register(
      'service:features',
      EmberObject.extend({
        cartridges: true,
        newUI: false,
      })
    );

    this.set('flag', 'cartridges');
    await render(hbs`{{if (feature-enabled flag) '✔' '✘'}}`);

    assert.dom(this.element).hasText('✔');

    this.set('flag', 'newUI');
    assert.dom(this.element).hasText('✘');
  });
});
