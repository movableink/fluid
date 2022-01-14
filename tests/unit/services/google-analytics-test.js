import EmberObject from '@ember/object';
import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';
import GoogleAnalytics from '../../mocks/google-analytics';

let ga;

module('service:google-analytics', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    ga = window.ga = new GoogleAnalytics();
  });

  hooks.afterEach(function () {
    ga = window.ga = null;
  });

  skip('sending a page even passes along the current route and page title', function (assert) {
    this.owner.register(
      'service:page-title-list',
      EmberObject.extend({
        toString() {
          return 'Campaign #2 - Movable Ink';
        },
      })
    );

    // WARNING:
    // This does not mock as expected see: https://github.com/ember-cli/ember-cli-qunit/issues/203
    this.owner.register(
      'service:router',
      EmberObject.extend({
        rootURL: '/agile/',
        currentURL: '/campaigns/2/edit',
      })
    );

    var service = this.owner.lookup('service:google-analytics');
    service.sendPageEvent();

    assert.deepEqual(ga.calledWith, [
      'send',
      'pageview',
      {
        page: '/agile/campaigns/2/edit',
        title: 'Campaign #2',
      },
    ]);
  });
});
