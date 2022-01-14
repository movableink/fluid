import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const currentUserStub = Service.extend({
  features: {
    fake_video_uploads: true,
  },
  company: {
    products: {
      live_content: true,
      email_creation: true,
    },
  },
});

module('service:features', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:current-user', currentUserStub);
    this['current-user'] = this.owner.lookup('service:current-user');
  });

  test('it proxies properties to currentUser', function (assert) {
    var service = this.owner.lookup('service:features');
    assert.true(service.get('liveContent'));
    assert.true(service.get('emailCreation'));
    assert.true(service.get('fakeVideoUploads'));
    assert.false(service.get('betaFeature'));
  });

  test('it returns an array of enabled features / products', function (assert) {
    var service = this.owner.lookup('service:features');
    assert.deepEqual(service.get('enabled'), [
      'email_creation',
      'fake_video_uploads',
      'live_content',
    ]);
  });
});
