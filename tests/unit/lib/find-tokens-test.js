import { module, test } from 'qunit';
import findTokens from 'fluid/lib/find-tokens';

module('lib:find-tokens', function () {
  test('it finds a token in a string', function (assert) {
    const text = 'Hello, [mi_world]!';
    assert.deepEqual(findTokens(text), ['mi_world']);
  });

  test('it finds multiple tokens', function (assert) {
    const text = 'one, [two], red, [blue]';
    assert.deepEqual(findTokens(text), ['two', 'blue']);
  });

  test('it finds non-separated tokens', function (assert) {
    const text = '[foo][bar]';
    assert.deepEqual(findTokens(text), ['foo', 'bar']);
  });

  test('it returns an empty array when no tokens are found', function (assert) {
    const text = 'no tokens here!';
    assert.deepEqual(findTokens(text), []);
  });
});
