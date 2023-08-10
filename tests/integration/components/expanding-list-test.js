import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';
import { render, click } from '@ember/test-helpers';

module('Integration | component | fluid-lab/expanding-list', function (hooks) {
  setupRenderingTest(hooks);

  test('the header and content subcomponents yield to a block', async function (assert) {
    await render(hbs`
      <FluidLab::ExpandingList as |list|>
        <list.Header>
          <div data-test-expanding-list-header-block>
            Header
          </div>
        </list.Header>
        <list.Content>
          <div data-test-expanding-list-content-block>
            Content
          </div>
        </list.Content>
      </FluidLab::ExpandingList>
    `);

    assert.dom('[data-test-expanding-list-header-block]').exists();
    assert.dom('[data-test-expanding-list-content-block]').exists();
  });

  test('the header expands the content on click', async function (assert) {
    await render(hbs`
      <FluidLab::ExpandingList
        @expanded={{false}} as |list|>
        <list.Header>
          <h2>Header</h2>
        </list.Header>
        <list.Content>
          <div data-test-expanding-list-content>
            Content
          </div>
        </list.Content>
      </FluidLab::ExpandingList>
    `);

    assert.dom('[data-test-expanding-list-content]').doesNotExist();
    await click('[data-test-fluid-lab-expanding-list-header]');
    assert.dom('[data-test-expanding-list-content]').exists();
  });

  test('the toggle expands the content on click', async function (assert) {
    await render(hbs`
      <FluidLab::ExpandingList @expanded={{false}} as |list|>
        <list.Toggle/>
        <list.Content>
          <div data-test-toggle-content>
            Content
          </div>
        </list.Content>
      </FluidLab::ExpandingList>
    `);

    assert.dom('[data-test-toggle-content]').doesNotExist();
    await click('[data-test-fluid-lab-expanding-list-toggle]');
    assert.dom('[data-test-toggle-content]').exists();
  });

  test('the toggle expands the content on click when nested inside the header', async function (assert) {
    await render(hbs`
      <FluidLab::ExpandingList @expanded={{false}} as |list|>
        <list.Header>
          <list.Toggle/>
        </list.Header>
        <list.Content>
          <div data-test-toggle-content>
            Content
          </div>
        </list.Content>
      </FluidLab::ExpandingList>
    `);

    assert.dom('[data-test-toggle-content]').doesNotExist();
    await click('[data-test-fluid-lab-expanding-list-toggle]');
    assert.dom('[data-test-toggle-content]').exists();
  });

  test('the component can be rendered DDAU', async function (assert) {
    this.set('expanded', false);
    const callback = sinon.fake();

    this.onChange = () => {
      this.set('expanded', !this.expanded);
      callback();
    };

    await render(hbs`
      <FluidLab::ExpandingList
        @expanded={{this.expanded}}
        @onChange={{action this.onChange}}
        as |list|
      >
        <list.Header/>
      </FluidLab::ExpandingList>
    `);

    await click('[data-test-fluid-lab-expanding-list-header]');
    await click('[data-test-fluid-lab-expanding-list-header]');
    assert.equal(callback.callCount, 2);
  });

  module('percy tests', function () {
    test('renders all possible states', async function (assert) {
      await render(hbs`
        <div class="cartridge-form studio-sidebar" style="margin:0 auto;">
          <FluidLab::ExpandingList as |list|>
            <list.Header>
              {{list.Toggle}}
              <h6>
                Expanded w/toggle
              </h6>
            </list.Header>
            <list.Content>
              <section data-test-expanded-with-toggle-content>
                <p>
                  Crew of the Planet Express:
                </p>
                <ul>
                  <li>
                    Leela
                  </li>
                  <li>
                    Bender
                  </li>
                  <li>
                    Fry
                  </li>
                </ul>
              </section>
            </list.Content>
          </FluidLab::ExpandingList>
          <FluidLab::ExpandingList @expanded={{false}} as |list|>
            <list.Header>
              {{list.Toggle}}
              <h6>
                Collapsed w/toggle
              </h6>
            </list.Header>
            <list.Content>
              <section data-test-collapsed-with-toggle-content>
                <p>
                  Crew of the Planet Express:
                </p>
                <ul>
                  <li>
                    Leela
                  </li>
                  <li>
                    Bender
                  </li>
                  <li>
                    Fry
                  </li>
                </ul>
              </section>
            </list.Content>
          </FluidLab::ExpandingList>
          <FluidLab::ExpandingList @disabled={{true}} as |list|>
            <list.Header>
              <h6>
                Expanded w/o toggle
              </h6>
            </list.Header>
            <list.Content>
              <section data-test-expanded-without-toggle-content>
                <p>
                  Crew of the Planet Express:
                </p>
                <ul>
                  <li>
                    Leela
                  </li>
                  <li>
                    Bender
                  </li>
                  <li>
                    Fry
                  </li>
                </ul>
              </section>
            </list.Content>
          </FluidLab::ExpandingList>
          <FluidLab::ExpandingList @disabled={{true}} as |list|>
            <list.Header>
              {{list.Toggle}}
              <h6>
                Disabled w/toggle
              </h6>
            </list.Header>
            <list.Content>
              <section data-test-disabled-with-toggle-content>
                <p>
                  Crew of the Planet Express:
                </p>
                <ul>
                  <li>
                    Leela
                  </li>
                  <li>
                    Bender
                  </li>
                  <li>
                    Fry
                  </li>
                </ul>
              </section>
            </list.Content>
          </FluidLab::ExpandingList>
        </div>
      `);

      assert.dom('[data-test-expanded-with-toggle-content]').isVisible();
      assert.dom('[data-test-collapsed-with-toggle-content]').isNotVisible();
      assert.dom('[data-test-expanded-without-toggle-content]').isVisible();
      assert.dom('.expanding-list-header__disabled svg').isNotVisible();
      assert
        .dom('.expanding-list-header__disabled .expanding-list-toggle__disabled.expanded')
        .exists();
      await percySnapshot(assert);
    });
  });
});
