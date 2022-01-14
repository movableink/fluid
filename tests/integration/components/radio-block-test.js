import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('component:radio-block', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders properly', async function (assert) {
    const header = 'Header';
    const option = 'option';
    const body = 'This is the body.';
    const value = 'value';
    this.setProperties({ header, option, body, value });
    await render(hbs`{{#radio-block value=value header=header option=option}}
                      {{body}}
                    {{/radio-block}}`);

    assert.dom('.radio-block h2').hasText(header, 'it renders the header properly');

    assert.dom('.radio-block section').hasText(body, 'it yields the body into a section');

    assert.dom(`.radio-block input[value=${option}]`).hasValue(option);
  });

  test('it updates properly', async function (assert) {
    const value = 'foo';
    const option = value;
    const update = sinon.stub();
    this.setProperties({ option, update });

    await render(hbs`{{radio-block value=value option=option update=(action update)}}`);

    await click('.radio-block input');
    assert.ok(update.calledWith(option), 'clicking the element calls the update action');

    this.set('value', option);

    assert
      .dom('.radio-block')
      .hasClass('selected', 'it is selected when the option matches the value');
  });
});
