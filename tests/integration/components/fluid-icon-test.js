import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { defaultTitles } from '@movable/fluid/components/fluid-icon';

module('Integration | Component | fluid-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('linking the `label` to the input', async function (assert) {
    this.iconName = 'alert';

    await render(hbs`
      <FluidIcon @name={{this.iconName}} />
    `);

    assert
      .dom('title')
      .hasText(
        defaultTitles[this.iconName],
        'a default title tag is included when no aria label is passed'
      );

    await render(hbs`
      <FluidIcon @name={{this.iconName}} @ariaLabel="descriptive explanation of functionality" />
    `);

    assert.dom('title').doesNotExist('when an aria label is passed, no title tag will be included');
  });
});
