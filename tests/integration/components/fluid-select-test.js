import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { settled, findAll, click, render } from '@ember/test-helpers';
import { A } from '@ember/array';
import { hbs } from 'ember-cli-htmlbars';
import component from '@movable/fluid/test-support/pages/fluid-select';
import percySnapshot from '../../helpers/percy-snapshot';

module('Integration | Component | fluid-select', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('options', ['apple', 'banana', 'orange', 'cantaloupe', 'durian']);
    this.set('selected', null);
    this.set('select', (value) => this.set('selected', value));
  });

  test('it renders', async function (assert) {
    await render(hbs`<FluidSelect @options={{options}} @select={{select}} />`);

    assert.ok(component.trigger.isVisible, 'it renders a trigger button');
    assert.ok(component.popup.isHidden, 'the popup is not visible on render');

    await percySnapshot(assert, 'trigger');

    await component.open();

    await percySnapshot(assert, 'popup');

    assert.ok(component.popup.isVisible, 'the popup renders when the trigger is clicked');
    assert.ok(component.popup.list.isVisible, 'the list is visible inside the popup');
    assert.equal(component.popup.list.options.length, this.get('options.length'));
    assert.ok(component.popup.search.isHidden, 'it does not render a search bar by default');
  });

  test('the trigger displays the label', async function (assert) {
    this.set('label', 'hello label');
    await render(hbs`<FluidSelect @label={{label}} />`);

    assert.equal(component.trigger.text, 'hello label');
    this.set('label', 'a different label');

    await percySnapshot(assert);

    assert.equal(component.trigger.text, 'a different label');
  });

  test('clicking the trigger fires an onOpen action', async function (assert) {
    assert.expect(2);
    this.set('testOnOpen', () => {
      assert.ok(true, 'it calls testOnOpen');
    });

    await render(hbs`<FluidSelect @onOpen={{action testOnOpen}} />`);
    await component.open();
    assert.ok(component.popup.isVisible, 'the popup still opens');
  });

  test('it can be disabled', async function (assert) {
    await render(hbs`<FluidSelect @disabled={{true}} @options={{options}} @select={{select}} />`);

    await percySnapshot(assert);

    assert.ok(component.trigger.isDisabled, 'the trigger is disabled');
    assert.ok(
      component.popup.isHidden,
      'the popup does not open after clicking a disabled trigger'
    );
  });

  test('passing options as a Promise', async function (assert) {
    let resolvePromise;
    this.set(
      'promise',
      new Promise((resolve) => {
        resolvePromise = resolve;
        return resolve;
      })
    );

    await render(hbs`<FluidSelect @options={{promise}} />`);
    await component.open();

    assert.ok(
      component.popup.loading.isVisible,
      'it displays a loading message if `options` is passed as a Promise'
    );
    assert.equal(
      component.popup.list.options.length,
      0,
      'No options are visible while the promise loads'
    );

    resolvePromise(['one', 'two', 'three']);
    await settled();

    assert.ok(component.popup.loading.isHidden, 'it no longer displays the loading message');
    assert.equal(
      component.popup.list.options.length,
      3,
      'the options are visible when the promise resolves'
    );
  });

  test('clicking on an option in the list fires the select action', async function (assert) {
    assert.expect(3);
    await render(hbs`
      <FluidSelect @select={{select}} @options={{options}} @selected={{selected}} />
    `);
    await component.open();

    const firstOption = component.popup.list.options[0];
    this.set('select', (value) =>
      assert.equal(value, firstOption.text, 'it passes the correct value')
    );

    await firstOption.click();

    assert.ok(component.popup.isHidden, 'the popup closes after selecting an option');
    await component.open();

    const fourthOption = component.popup.list.options[3];
    this.set('select', (value) =>
      assert.equal(value, fourthOption.text, 'it passes the correct value')
    );

    await fourthOption.click();
  });

  test('objects as values', async function (assert) {
    assert.expect(4);
    this.set('options', [{ testLabel: 'one' }, { testLabel: 'two' }, { testLabel: 'three' }]);
    this.set('labelPath', 'testLabel');

    await render(hbs`
      <FluidSelect @options={{options}} @select={{select}} @labelPath={{labelPath}} />
    `);
    await component.open();

    const firstOption = component.popup.list.options[0];
    assert.equal(firstOption.text, 'one');
    assert.equal(component.popup.list.options[1].text, 'two');
    assert.equal(component.popup.list.options[2].text, 'three');

    this.set('select', (value) =>
      assert.equal(this.get('options.0'), value, 'it passes the object as the selected value')
    );

    await firstOption.click();
  });

  module('grouped options', function (hooks) {
    hooks.beforeEach(function () {
      this.set(
        'groups',
        A([
          { groupLabel: 'Group one', groupOptions: ['one', 'two', 'three'] },
          { groupOptions: ['four', 'five', 'six'] },
          { groupLabel: 'Group three', groupOptions: ['seven', 'eight', 'nine', 'ten'] },
        ])
      );
    });

    test('it renders the grouped options', async function (assert) {
      assert.expect(5);
      await render(hbs`
        <FluidSelect @options={{groups}} @select={{select}} @selected={{selected}} />
      `);
      await component.open();

      await percySnapshot(assert);

      assert.equal(component.popup.list.groupHeaders.length, 2);

      assert.equal(
        component.popup.list.groupHeaders[0].text,
        this.get('groups.0.groupLabel'),
        'it renders the groups label in upper case'
      );

      assert.equal(
        component.popup.list.groupHeaders[1].text,
        this.get('groups.2.groupLabel'),
        'it renders the groups label in upper case'
      );

      assert.equal(
        component.popup.list.options.length,
        10,
        'it renders an option for each group option'
      );

      this.set('select', (value) => assert.equal(value, 'seven', 'it selects the correct option'));

      await component.popup.list.options[6].click();
    });

    test('mixed groups', async function (assert) {
      this.get('groups').pushObjects(['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen']);

      await render(hbs`
        <FluidSelect @options={{groups}} @select={{select}} @selected={{selected}} />
      `);
      await component.open();

      assert.equal(
        component.popup.list.options.length,
        15,
        'it renders options if the options collection has grouped and ungrouped content'
      );
    });
  });

  module('multiple selection', function (hooks) {
    hooks.beforeEach(function () {
      this.set('selected', A([]));
      this.set('select', (value) => {
        const selected = this.get('selected');
        if (!selected.includes(value)) {
          selected.pushObject(value);
        }
      });
    });

    test('block mode with custom options and checkbox labels', async function (assert) {
      await render(hbs`<FluidSelect
        @options={{this.options}}
        @select={{this.select}}
        @selected={{this.selected}}
        @multiple={{true}}
        as |fs|
      >
        <fs.trigger @label='Fruit' />
        <fs.popup>
          <fs.list @multiple={{true}} as |options selectCheckbox|>
            {{#each options as |option|}}
              <FluidSelect::Option
                @dark={{@dark}}
                @option={{option}}
                @selected={{this.selected}}
                @multiple={{true}}
                @select={{action selectCheckbox}}
                as |fo|
              >
                <fo.checkbox>{{option}}</fo.checkbox>
              </FluidSelect::Option>
            {{/each}}
          </fs.list>
        </fs.popup>
      </FluidSelect>`);

      assert.ok(component.trigger.isVisible, 'the trigger renders');
      assert.equal(component.trigger.text, 'Fruit', 'the trigger has the passed label');
      assert.ok(component.popup.isHidden, 'the popup is hidden');

      await component.open();

      assert.equal(
        component.popup.list.options.length,
        this.get('options.length'),
        'the correct number of options render'
      );

      const firstOption = component.popup.list.options[0];
      await firstOption.click();

      const fourthOption = component.popup.list.options[3];
      await fourthOption.click();

      assert.equal(component.popup.list.selectedOptions.length, 2);
    });

    test('checkboxes', async function (assert) {
      await render(hbs`
        <FluidSelect @options={{options}} @selected={{selected}} @select={{select}} @multiple={{true}} />
      `);
      await component.open();

      await percySnapshot(assert);

      assert.equal(
        component.popup.list.options.filter((option) => option.hasCheckbox).length,
        this.get('options').length,
        'it renders a checkbox for each option'
      );
    });

    test('selecting multiple options', async function (assert) {
      this.set('selected', A([this.get('options')[0]]));
      await render(hbs`
        <FluidSelect @options={{options}} @selected={{selected}} @select={{select}} @multiple={{true}} />
      `);
      await component.open();

      assert.equal(component.popup.list.selectedOptions.length, 1);

      const firstOption = component.popup.list.options[0];
      assert.ok(firstOption.isSelected);

      const fourthOption = component.popup.list.options[3];
      await fourthOption.click();

      assert.equal(component.popup.list.selectedOptions.length, 2);
    });
  });

  module('searching', function (hooks) {
    hooks.beforeEach(function () {
      this.set('searchByName', (searchTerm) => {
        return this.get('options').filter((option) => option.startsWith(searchTerm));
      });
    });

    module('synchronous', function (hooks) {
      hooks.beforeEach(function () {
        this.set('search', function (searchTerm) {
          return this.get('searchByName')(searchTerm);
        });
      });

      test('searching by name', async function (assert) {
        await render(hbs`
          <FluidSelect @options={{options}} @search={{search}} @select={{action (mut selected)}} />
        `);
        await component.open();

        await percySnapshot(assert, 'no search term & results');

        assert.ok(
          component.popup.search.isVisible,
          'it renders a search bar if search is passed to the component'
        );

        this.set('search', (searchTerm) => {
          assert.ok(true, 'it calls the passed search action');
          assert.equal(searchTerm, 'app');
          return this.get('searchByName')(searchTerm);
        });

        await component.popup.search.fillIn('app');

        await percySnapshot(assert, 'search term & results');

        assert.equal(
          component.popup.list.options.length,
          1,
          'the list of options changes if the bound collection changes'
        );
        assert.ok(
          component.popup.noResultsMessage.isHidden,
          'it does not display a message when a search returns results'
        );

        await component.popup.search.fillIn('');

        assert.equal(
          component.popup.list.options.length,
          this.get('options.length'),
          'if the user clears their search, the original list is returned'
        );

        this.set('search', () => []);
        await component.popup.search.fillIn('anything');

        await percySnapshot(assert, 'no results');

        assert.ok(
          component.popup.noResultsMessage.isVisible,
          'it displays a message when a search returns no results'
        );
      });
    });

    module('asynchronous', function () {
      test('with promises', async function (assert) {
        let resolve;
        this.set('asyncSearch', (searchTerm) => {
          const promise = new Promise((promiseResolve) => {
            resolve = promiseResolve;
          });

          return promise.then(() => this.get('searchByName')(searchTerm));
        });

        await render(hbs`
          <FluidSelect @options={{options}} @search={{asyncSearch}} @select={{action (mut selected)}} />
        `);
        await component.open();
        await component.popup.search.fillIn('anything');

        assert.ok(
          component.popup.search.loadingIcon.isVisible,
          'it displays a loading spinner while searching'
        );
        assert.ok(
          component.popup.search.searchIcon.isHidden,
          'it displays a loading spinner while searching'
        );

        resolve();
        await settled();

        assert.ok(
          component.popup.search.loadingIcon.isHidden,
          'it displays a loading spinner while searching'
        );
        assert.ok(
          component.popup.search.searchIcon.isVisible,
          'it displays a loading spinner while searching'
        );
      });
    });
  });

  module('block mode', function (hooks) {
    hooks.beforeEach(function () {
      this.set('options', ['mario', 'luigi', 'yoshi', 'peach', 'bowser']);
      this.set('selectOption', function (value) {
        this.set('selected', value);
      });
    });

    test('usable in the simplest case', async function (assert) {
      assert.expect(8);

      await render(hbs`
        <FluidSelect @select={{action selectOption}} @selected={{selected}} as |select|>
          <select.trigger @label='Click Me!' />

          <select.popup>
            <select.list>
              {{#each options as |option|}}
                <select.option @option={{option}} />
              {{/each}}
            </select.list>
          </select.popup>
        </FluidSelect>
      `);

      assert.ok(component.trigger.isVisible, 'the trigger renders');
      assert.equal(component.trigger.text, 'Click Me!', 'the trigger has the passed label');
      assert.ok(component.popup.isHidden, 'the popup is hidden');

      await component.open();

      assert.ok(component.popup.isVisible, 'the popup shows when the custom trigger is clicked');
      assert.equal(
        component.popup.list.options.length,
        this.get('options.length'),
        'the correct number of options render'
      );
      assert.equal(component.popup.list.selectedOptions.length, 0);

      this.set('selectOption', function (value) {
        assert.equal(value, this.get('options.2'), 'it selects the correct value');
        this.set('selected', value);
      });

      await percySnapshot(assert);

      await component.popup.list.options[2].click();
      assert.ok(component.popup.isHidden, 'the popup closes when an item is selected');
    });

    test('block mode with custom trigger and options', async function (assert) {
      assert.expect(8);

      await render(hbs`
        <FluidSelect @select={{action selectOption}} @selected={{selected}} as |select|>
          <select.trigger>
            <a class='test-link'>Click Me!</a>
          </select.trigger>

          <select.popup>
            <select.list>
              {{#each options as |option|}}
                <select.option @option={{option}}>
                  <h4 class='custom-option {{if (eq selected option) 'custom-option--selected'}}'>{{option}}</h4>
                </select.option>
              {{/each}}
            </select.list>
          </select.popup>
        </FluidSelect>
      `);

      assert.ok(component.trigger.isVisible);
      assert.dom('[data-test-fluid-select-trigger] .test-link').hasText('Click Me!');
      assert.ok(component.popup.isHidden);

      await click('.test-link');

      assert.ok(component.popup.isVisible, 'the popup shows when the custom trigger is clicked');
      assert.equal(findAll('.custom-option').length, this.get('options.length'));

      this.set('selectOption', function (value) {
        assert.equal(value, this.get('options.2'), 'it selects the correct value');
        this.set('selected', value);
      });

      assert.dom('.custom-option--selected').doesNotExist();
      await click(findAll('.custom-option')[2]);
      assert.ok(
        component.popup.isHidden,
        'the popup closes if the yielded option is clicked and multiple is false'
      );
    });

    test('block mode with external trigger and options', async function (assert) {
      assert.expect(6);

      await render(hbs`
        <FluidSelect @select={{action selectOption}} @selected={{selected}} as |select|>
          <button {{on 'click' select.toggle}} class='test-link'>Click Me!</button>

          <select.popup>
            <select.list>
              {{#each options as |option|}}
                <select.option @option={{option}}>
                  <h4 class='custom-option {{if (eq selected option) 'custom-option--selected'}}'>{{option}}</h4>
                </select.option>
              {{/each}}
            </select.list>
          </select.popup>
        </FluidSelect>
      `);

      assert.ok(component.popup.isHidden);

      await click('.test-link');

      assert.ok(component.popup.isVisible, 'the popup shows when the custom trigger is clicked');
      assert.equal(findAll('.custom-option').length, this.get('options.length'));

      this.set('selectOption', function (value) {
        assert.equal(value, this.get('options.2'), 'it selects the correct value');
        this.set('selected', value);
      });

      assert.dom('.custom-option--selected').doesNotExist();
      await click(findAll('.custom-option')[2]);
      assert.ok(
        component.popup.isHidden,
        'the popup closes if the yielded option is clicked and multiple is false'
      );
    });
  });

  test('it can render ellipsis with block [ch53009]', async function (assert) {
    this.label = 'Metus molestie condimentum elit cursus magna primis velit imperdiet';
    await render(hbs`
      <label>Fluid Select with Block</label>
      <br />
      <FluidSelect
        class="w-20"
        as |select|
      >
        <select.trigger
          class="max-w-full"
        >
          <span data-test-overflow-span class="overflow-hidden overflow-ellipsis">
            {{this.label}}
          </span>
        </select.trigger>
      </FluidSelect>
    `);

    // NOTE:
    // The actual test is the percy test here as there is no real way to assert the `...` has show up.
    await percySnapshot(assert);
    assert.dom('[data-test-overflow-span]').hasClass('overflow-ellipsis');
  });
});
