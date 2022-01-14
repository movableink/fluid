import { blur, fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('component:url-field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('triggers onchange with formatted url', async function (assert) {
    this.actions.onblur = function (url) {
      assert.equal(url, 'http://without.http.protocol');
    };

    await render(hbs`{{url-field type="url" onchange=(action 'onblur')}}`);

    await fillIn('input', 'without.http.protocol');
    await blur('input');
  });

  test('regression test that checks against https', async function (assert) {
    this.set('value', '');

    this.actions.onblur = function (url) {
      assert.equal(url, 'https://with.https.protocol');
      this.set('value', url);
    };

    await render(hbs`{{url-field value=value type="url" onchange=(action 'onblur')}}`);

    await fillIn('input', 'https://with.https.protocol');
    await blur('input');

    assert.dom('input').hasValue('https://with.https.protocol');
  });
});
