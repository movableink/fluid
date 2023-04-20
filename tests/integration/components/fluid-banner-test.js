import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '../../helpers/percy-snapshot';

module('Integration | Component | fluid-banner', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.mockAction = () => {};
  });

  test('it renders default type', async function (assert) {
    await render(hbs`
      <div class="flex flex-col gap-4">
        <FluidBanner
          @header="Default w/Icon & Close"
          @icon="fluid-banner-archive"
          @onClose={{this.mockAction}}
        >
          <p>
            Body Content
          </p>
        </FluidBanner>

        <FluidBanner
          @header="Default w/o Icon"
          @onClose={{this.mockAction}}
        >
          <p>
            Body Content
          </p>
        </FluidBanner>

        <FluidBanner
          @header="Default w/o Close"
          @icon="fluid-banner-archive"
        >
          <p>
            Body Content
          </p>
        </FluidBanner>

        <FluidBanner
          @header="Default w/o Icon or Close"
        >
          <p>
            Body Content
          </p>
        </FluidBanner>
      </div>
    `);

    await percySnapshot(assert);
    assert.dom('.fluid-banner').exists({ count: 4 });
    assert.dom('.fluid-banner--icon').exists({ count: 2 });
    assert.dom('.fluid-banner--close').exists({ count: 2 });
  });

  ['destructive', 'info', 'confirm', 'alert'].forEach((type) => {
    test(`it renders ${type} type`, async function (assert) {
      this.type = type;
      await render(hbs`
        <div class="flex flex-col gap-4">
          <FluidBanner
            @type={{this.type}}
            @header={{concat this.type " w/Icon & Close"}}
            @icon={{concat "fluid-banner-" this.type}}
            @onClose={{this.mockAction}}
          >
            <p>
              Body Content
            </p>
          </FluidBanner>

          <FluidBanner
            @type={{this.type}}
            @header={{concat this.type " w/o Icon"}}
            @onClose={{this.mockAction}}
          >
            <p>
              Body Content
            </p>
          </FluidBanner>

          <FluidBanner
            @type={{this.type}}
            @header={{concat this.type " w/o Close"}}
            @icon={{concat "fluid-banner-" this.type}}
          >
            <p>
              Body Content
            </p>
          </FluidBanner>

          <FluidBanner
            @type={{this.type}}
            @header={{concat this.type " w/o Icon or Close"}}
          >
            <p>
              Body Content
            </p>
          </FluidBanner>
        </div>
      `);

      await percySnapshot(assert);
      assert.dom('.fluid-banner').exists({ count: 4 });
      assert.dom('.fluid-banner').hasClass(`type:${this.type}`);
      assert.dom('.fluid-banner--icon').exists({ count: 2 });
      assert.dom('.fluid-banner--close').exists({ count: 2 });
    });
  });
});
