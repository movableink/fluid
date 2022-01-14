import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import moment from 'moment';
import { module, test } from 'qunit';

module('helper:l', function (hooks) {
  setupRenderingTest(hooks);

  test('localizing percentages', async function (assert) {
    await render(hbs`{{l 'percent' 100}}`);
    assert.dom(this.element).hasText('100%');
  });

  test('localizing currency', async function (assert) {
    await render(hbs`{{l 'currency' cash}}`);

    this.set('cash', 100);
    assert.dom(this.element).hasText('$100');

    this.set('cash', 1234567890);
    assert.dom(this.element).hasText('$1,234,567,890');
  });

  test('localizing numbers', async function (assert) {
    await render(hbs`{{l 'number' value}}`);

    this.set('value', 100);
    assert.dom(this.element).hasText('100');

    this.set('value', 1234567890);
    assert.dom(this.element).hasText('1,234,567,890');

    this.set('value', -123456789);
    assert.dom(this.element).hasText('-123,456,789');
  });

  test('localizing numbers with decimal places', async function (assert) {
    await render(hbs`{{l 'number' value}}`);

    this.set('value', 100.243);
    assert.dom(this.element).hasText('100.243');

    this.set('value', 1234567890.18);
    assert.dom(this.element).hasText('1,234,567,890.18');
  });

  test('localizing numbers with precision', async function (assert) {
    await render(hbs`{{l 'number' value precision=precision}}`);

    this.set('value', 100.243);
    this.set('precision', 2);
    assert.dom(this.element).hasText('100.24');

    this.set('value', 1.18);
    this.set('precision', 0);
    assert.dom(this.element).hasText('1');
  });

  test('numbers are rounded when precision is provide', async function (assert) {
    await render(hbs`{{l 'number' value precision=precision}}`);

    this.set('value', 100.245);
    this.set('precision', 2);
    assert.dom(this.element).hasText('100.25');

    this.set('value', 1.99);
    this.set('precision', 0);
    assert.dom(this.element).hasText('2');
  });

  test('numbers are padded with zeros when precision is provided', async function (assert) {
    await render(hbs`{{l 'number' value precision=precision}}`);

    this.set('value', 100);
    this.set('precision', 2);
    assert.dom(this.element).hasText('100.00');

    this.set('value', 3);
    this.set('precision', 0);
    assert.dom(this.element).hasText('3');
  });

  test('zeros are stripped when strip-insignificant-zeros is true', async function (assert) {
    await render(hbs`{{l 'number' value precision=2 strip-insignificant-zeros=true}}`);

    this.set('value', 100);
    assert.dom(this.element).hasText('100');

    this.set('value', 100.2);
    assert.dom(this.element).hasText('100.2');

    this.set('value', 100.245);
    assert.dom(this.element).hasText('100.25');
  });

  test('localizing dates', async function (assert) {
    await render(hbs`{{l 'date' value}}`);

    this.set('value', moment([2015, 11, 25, 14, 20]));
    assert.dom(this.element).hasText('Dec 25, 2015 at 2:20PM');

    this.set('value', moment([2016, 1, 13, 11, 15]));
    assert.dom(this.element).hasText('Feb 13, 2016 at 11:15AM');
  });

  test('localizing dates with a custom format', async function (assert) {
    await render(hbs`{{l 'date' value format='YYYY.MM.DD'}}`);

    this.set('value', moment([2015, 11, 25, 14, 20]));
    assert.dom(this.element).hasText('2015.12.25');

    this.set('value', moment([2016, 1, 13, 11, 15]));
    assert.dom(this.element).hasText('2016.02.13');
  });

  test('localizing durations', async function (assert) {
    await render(hbs`{{l 'duration' value}}`);

    this.set('value', 55000);
    assert.dom(this.element).hasText('55 seconds');

    this.set('value', 61000);
    assert.dom(this.element).hasText('1 minute 1 second');

    this.set('value', 7200000);
    assert.dom(this.element).hasText('2 hours');

    this.set('value', 345600000);
    assert.dom(this.element).hasText('4 days');
  });

  test('short durations', async function (assert) {
    await render(hbs`{{l 'duration' value format='short'}}`);

    this.set('value', 55000);
    assert.dom(this.element).hasText('55s');

    this.set('value', 62000);
    assert.dom(this.element).hasText('1m 2s');

    this.set('value', 7200000);
    assert.dom(this.element).hasText('2h');

    this.set('value', 345600000);
    assert.dom(this.element).hasText('4d');
  });

  test('truncated durations', async function (assert) {
    await render(hbs`{{l 'duration' value truncate=true}}`);

    this.set('value', 55000);
    assert.dom(this.element).hasText('55 seconds');

    this.set('value', 62000);
    assert.dom(this.element).hasText('1 minute');

    this.set('value', 7200000);
    assert.dom(this.element).hasText('2 hours');

    this.set('value', 345600000);
    assert.dom(this.element).hasText('4 days');
  });

  test('durations in units other than milliseconds', async function (assert) {
    await render(hbs`{{l 'duration' 1 in=unit}}`);

    this.set('unit', 'seconds');
    assert.dom(this.element).hasText('1 second');

    this.set('unit', 'minutes');
    assert.dom(this.element).hasText('1 minute');

    this.set('unit', 'hours');
    assert.dom(this.element).hasText('1 hour');

    this.set('unit', 'days');
    assert.dom(this.element).hasText('1 day');
  });

  test('precision of duration', async function (assert) {
    await render(hbs`{{l 'duration' 6032000 precision=precision}}`);

    assert.dom(this.element).hasText('1 hour 40 minutes 32 seconds');

    this.set('precision', 'minutes');
    assert.dom(this.element).hasText('1 hour 40 minutes');

    this.set('precision', 'hours');
    assert.dom(this.element).hasText('1 hour');
  });

  test('invalid formats', async function (assert) {
    await render(hbs`{{l 'cereal' 'is good'}}`);

    assert.dom(this.element).hasText('is good');
  });

  test('null values defer to the default', async function (assert) {
    await render(hbs`{{l '*' null default='--'}}`);
    assert.dom(this.element).hasText('--');
  });
});
