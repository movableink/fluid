import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('helper:is-active', function (hooks) {
  setupApplicationTest(hooks);

  test('active namespaces', async function (assert) {
    await visit('test/is-active');
    assert.dom('#is-active').isChecked();
    assert.dom('#is-active_named').isNotChecked();
    assert.dom('#is-active_model').isNotChecked();
  });

  test('child namespaces', async function (assert) {
    await visit('test/is-active/named');
    assert.dom('#is-active').isChecked();
    assert.dom('#is-active_named').isChecked();
    assert.dom('#is-active_model').isNotChecked();
  });

  test('routes with a model 2', async function (assert) {
    await visit('test/is-active/model/2');
    assert.dom('#is-active').isChecked();
    assert.dom('#is-active_named').isNotChecked();
    assert.dom('#is-active_model').isChecked();
  });

  test('routes with a model 1', async function (assert) {
    await visit('test/is-active/model/1');
    assert.dom('#is-active').isChecked();
    assert.dom('#is-active_named').isNotChecked();
    assert.dom('#is-active_model').isNotChecked();
  });
});
