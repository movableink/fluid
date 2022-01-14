import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | fluid-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it does not render label without label param', async function (assert) {
    await render(hbs`<FluidTable />`);

    assert.dom('.fluid-table__label').doesNotExist();
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <FluidTable
        @label="Ember Component"
        as |table| >
        {{#let
          (component 'fluid-table/th')
          (component 'fluid-table/td')
          as |th td|}}
          <table.header>
            <th>CSS Selector</th>
            <th>Label</th>
            <th>Preview</th>
            <th>Type</th>
          </table.header>
          <table.body>
          <tr>
            <td>.pip-summary &gt; h1</td>
            <td>column-row</td>
            <td>Teal Ombre Reactive Glaze Vase</td>
            <td>Text</td>
          </tr>
          <tr>
            <td>.hero-container .hero-image #hero</td>
            <td>column-row</td>
            <td>{{svg-jar "picture-file"}}</td>
            <td>Image</td>
          </tr>
          <tr>
            <td>.accordion-component li</td>
            <td>column-row</td>
            <td>
              Handcrafted of china clay using a reactive technique that allows shades of green.
            </td>
            <td>Text</td>
          </tr>
          </table.body>
         {{/let}}
      </FluidTable>
    `);

    assert.dom('.fluid-table__th').exists({ count: 4 });
    assert.dom('.fluid-table__td').exists({ count: 12 });
  });

  test('it renders w/compressed', async function (assert) {
    await render(hbs`
      <FluidTable
        @isCompressed=true
        as |table| >
        {{#let
          (component 'fluid-table/th')
          (component 'fluid-table/td')
          as |th td|}}
          <table.header>
            <th>CSS Selector</th>
            <th>Label</th>
            <th>Preview</th>
            <th>Type</th>
          </table.header>
          <table.body>
          <tr>
            <td>.pip-summary &gt; h1</td>
            <td>column-row</td>
            <td>Teal Ombre Reactive Glaze Vase</td>
            <td>Text</td>
          </tr>
          </table.body>
         {{/let}}
      </FluidTable>
    `);

    assert.dom('.fluid-table--compressed').exists();
  });
});
