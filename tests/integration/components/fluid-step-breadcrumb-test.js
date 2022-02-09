import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | fluid-step-breadcrumb', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders current completed steps', async function (assert) {
    this.mocksteps = [
      {
        name: 'step 1',
        completed: true,
      },
      {
        name: 'step 2',
        completed: false,
      },
      {
        name: 'step 3',
        completed: false,
      },
    ];

    await render(hbs`
      <FluidStepBreadcrumb
        @steps={{this.mocksteps}}
      />
    `);

    assert.dom('[data-test-breadcrumb]').exists({ count: this.mocksteps.length });

    assert.dom('[data-test-breadcrumb]').exists({ count: this.mocksteps.length });
  });

  test('it updates completed crumbs', async function (assert) {
    this.mocksteps = [
      {
        name: 'step 1',
        completed: true,
      },
      {
        name: 'step 2',
        completed: false,
      },
      {
        name: 'step 3',
        completed: false,
      },
    ];

    await render(hbs`
      <FluidStepBreadcrumb
        @steps={{this.mocksteps}}
      />
    `);

    assert.dom('[data-test-breadcrumb-badge-completed]').exists({ count: 1 });

    this.mocksteps = [
      {
        name: 'step 1',
        completed: true,
      },
      {
        name: 'step 2',
        completed: true,
      },
      {
        name: 'step 3',
        completed: false,
      },
    ];

    await render(hbs`
      <FluidStepBreadcrumb
        @steps={{this.mocksteps}}
      />
    `);

    assert.dom('[data-test-breadcrumb-badge-completed]').exists({ count: 2 });
  });
});
