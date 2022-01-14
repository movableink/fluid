import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import percySnapshot from '@percy/ember';
import td from 'testdouble';
import sinon from 'sinon';

module('Integration | Component | fluid-date-input', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    // Ensure the "current date" is stable for Percy snapshots
    this.clock = sinon.useFakeTimers({
      now: new Date('11/30/2020'),
    });

    this.handleSelect = td.function();
  });

  test('displaying the selected date', async function (assert) {
    this.date = new Date('11/20/2020');

    await render(hbs`
      <FluidDateInput
        data-test-date-input=''
        @value={{this.date}}
        @onSelect={{this.handleSelect}}
      />
    `);

    await percySnapshot(assert);

    assert
      .dom('button')
      .containsText('Nov 20, 2020', 'Shows the selected date in the expected format');

    await click('[data-test-date-input]');

    assert
      .dom('[data-date="2020-11-20"]')
      .hasAttribute('data-test-selected', '', 'The current value is selected in the calendar');
  });

  test('displaying the placeholder', async function (assert) {
    await render(hbs`
      <FluidDateInput
        @placeholder="Select a Date"
        @onSelect={{this.handleSelect}}
      />
    `);

    await percySnapshot(assert);

    assert.dom('button').containsText('Select a Date', 'Shows the "placeholder" text');
  });

  test('navigating to different months', async function (assert) {
    this.date = new Date('11/20/2020');

    await render(hbs`
      <FluidDateInput
        data-test-date-input=''
        @value={{this.date}}
        @onSelect={{this.handleSelect}}
      />
    `);

    await click('[data-test-date-input]');

    assert.dom('[data-date="2020-11-20"]').exists('The calendar is centered on the selected date');

    await click('[data-test-calendar-nav-control="next"]');

    assert.dom('[data-date="2020-11-20"]').doesNotExist('The selected date is no longer visible');
    assert.dom('[data-date="2020-12-20"]').exists('The next month is visible');

    // Select another date and re-open the calendar
    await click('[data-date="2020-12-20"]');
    await click('[data-test-date-input]');

    assert
      .dom('[data-date="2020-11-20"]')
      .exists(
        'The calendar is centered on the selected date again, rather than the previous "center" selection'
      );
  });

  test('selecting a new date', async function (assert) {
    this.date = new Date('11/20/2020');

    await render(hbs`
      <FluidDateInput
        data-test-date-input=''
        @value={{this.date}}
        @onSelect={{this.handleSelect}}
      />
    `);

    await click('[data-test-date-input]');

    // Snapshot with the date picker open
    await percySnapshot(assert);

    await click('[data-date="2020-11-21"]');

    assert.verify(
      this.handleSelect(new Date('11/21/2020')),
      'Called the `onSelect` handler with the selected date'
    );

    assert
      .dom('[data-test-fluid-date-input-calendar]')
      .doesNotExist('Date picker is dismissed after selecting a value');
  });

  test('dismissing the popup when clicking outside', async function (assert) {
    this.date = new Date('11/20/2020');

    await render(hbs`
      <button data-test-some-outside-element></button>

      <FluidDateInput
        data-test-date-input=''
        @value={{this.date}}
        @onSelect={{this.handleSelect}}
      />
    `);

    // Open the picker
    await click('[data-test-date-input]');

    assert.dom('[data-test-fluid-date-input-calendar]').exists('Date picker is opened on click');

    // Open the picker again while it's already open
    await click('[data-test-date-input]');

    assert
      .dom('[data-test-fluid-date-input-calendar]')
      .exists('Date picker is still open after clicking the trigger again');

    // Click something inside the picker, that is *not* selecting a date
    await click('[data-test-calendar-nav-control="next"]');

    assert
      .dom('[data-test-fluid-date-input-calendar]')
      .exists('Date picker is still open after clicking something inside the picker');

    // Click something outside the picker elements
    await click('[data-test-some-outside-element]');

    assert
      .dom('[data-test-fluid-date-input-calendar]')
      .doesNotExist('Date picker is closed after clicking on an element outside the element');
  });

  test('setting a minimum date', async function (assert) {
    this.date = new Date('11/20/2020');
    this.minDate = new Date('11/19/2020');

    await render(hbs`
      <FluidDateInput
        data-test-date-input=''
        @value={{this.date}}
        @minDate={{this.minDate}}
        @onSelect={{this.handleSelect}}
      />
    `);

    await click('[data-test-date-input]');

    await percySnapshot(assert);

    assert.dom('[data-date="2020-11-19"]').isNotDisabled('The minimum date is still selectable');

    assert
      .dom('[data-date="2020-11-18"]')
      .isDisabled('Dates before the minimum date are not selectable');
  });

  test('setting a maximum date', async function (assert) {
    this.date = new Date('11/20/2020');
    this.maxDate = new Date('11/21/2020');

    await render(hbs`
      <FluidDateInput
        data-test-date-input=''
        @value={{this.date}}
        @maxDate={{this.maxDate}}
        @onSelect={{this.handleSelect}}
      />
    `);

    await click('[data-test-date-input]');

    await percySnapshot(assert);

    assert.dom('[data-date="2020-11-21"]').isNotDisabled('The maximum date is still selectable');

    assert
      .dom('[data-date="2020-11-22"]')
      .isDisabled('Dates after the maximum date are not selectable');
  });
});
