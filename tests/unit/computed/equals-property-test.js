import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import equals from 'fluid/computed/equals-property';

module('computed:equals-property', function (hooks) {
  hooks.beforeEach(function () {
    this.subject = EmberObject.extend({
      elephantLikes: 'peanuts',
      food: 'peanuts',
      doesElephantLikeFood: equals('elephantLikes', 'food'),
    }).create();
  });

  test('it looks up properties on the host object', function (assert) {
    assert.true(this.subject.get('doesElephantLikeFood'));
  });

  test('updating when dependent keys change', function (assert) {
    assert.true(this.subject.get('doesElephantLikeFood'));
    this.subject.set('food', 'pineapple');
    assert.false(this.subject.get('doesElephantLikeFood'));
    this.subject.set('food', 'peanuts');
    assert.true(this.subject.get('doesElephantLikeFood'));
  });
});
