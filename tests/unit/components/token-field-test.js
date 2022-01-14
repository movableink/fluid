import { set, get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('token-field', function (hooks) {
  setupTest(hooks);

  const tokenClass = 'token-field__token';

  test('valueAsHTML - no value', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    assert.equal(get(subject, 'valueAsHTML'), '', 'with no value, valueAsHTML is a blank string');
  });

  test('valueAsHTML - no tokens', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', 'this string has no tokens');
    assert.equal(
      get(subject, 'valueAsHTML'),
      'this string has no tokens',
      'without tokens, it spits out the same string as the value'
    );
  });

  test('valueAsHTML - one token', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', 'this string has one [token] in it');
    assert.equal(
      get(subject, 'valueAsHTML'),
      `this string has one <span class="${tokenClass}">token</span> in it`,
      'it wraps words surrounded by square brackets in a span, without the brackets'
    );
  });

  test('valueAsHTML - tokens with spaces', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', 'this string has no [valid tokens] in it');
    assert.equal(
      get(subject, 'valueAsHTML'),
      'this string has no [valid tokens] in it',
      'tokens cannot contain spaces'
    );
  });

  test('valueAsHTML - tokens with extra brackets', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', 'this string has [[[[[lots]]]]] of brackets in it');
    assert.equal(
      get(subject, 'valueAsHTML'),
      `this string has [[[[<span class="${tokenClass}">lots</span>]]]] of brackets in it`,
      'tokens are only recognized in the inner-most set of braces'
    );
  });

  test('valueAsHTML - tokens with numbers', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', 'this string has one [1token23] in it');
    assert.equal(
      get(subject, 'valueAsHTML'),
      `this string has one <span class="${tokenClass}">1token23</span> in it`,
      'tokens can contain numbers'
    );
  });

  test('valueAsHTML - multiple tokens', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', 'this string [has] three [simple] [tokens] in them');
    assert.equal(
      get(subject, 'valueAsHTML'),
      `this string <span class="${tokenClass}">has</span> three <span class="${tokenClass}">simple</span> <span class="${tokenClass}">tokens</span> in them`,
      'it renders multiple tokens if a string has them'
    );
  });

  test('valueAsHTML - token at start', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', '[this] string starts with a token');
    assert.equal(
      get(subject, 'valueAsHTML'),
      `<span class="${tokenClass}">this</span> string starts with a token`,
      'it renders tokens at the start of the string'
    );
  });

  test('valueAsHTML - token at end', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', 'this string ends with a [token]');
    assert.equal(
      get(subject, 'valueAsHTML'),
      `this string ends with a <span class="${tokenClass}">token</span>`,
      'it renders tokens at the end of the string'
    );
  });

  test('valueAsHTML - tokens with hyphens', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', '[this-string-uses] [some-tokens] with hyphens');
    assert.equal(
      get(subject, 'valueAsHTML'),
      `<span class="${tokenClass}">this-string-uses</span> <span class="${tokenClass}">some-tokens</span> with hyphens`,
      'bracketed words with hyphens are counted as tokens'
    );
  });

  test('valueAsHTML - tokens with underscores', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(subject, 'value', '[this_string_uses] [some_tokens] with underscores');
    assert.equal(
      get(subject, 'valueAsHTML'),
      `<span class="${tokenClass}">this_string_uses</span> <span class="${tokenClass}">some_tokens</span> with underscores`,
      'bracketed words with underscores are counted as tokens'
    );
  });

  test('valueAsHTML - tokens with hyphens and underscores', function (assert) {
    const subject = this.owner.factoryFor('component:token-field').create();

    set(
      subject,
      'value',
      'this string uses [hyphens-and] [some_underscores] [even-mixed_together]'
    );
    assert.equal(
      get(subject, 'valueAsHTML'),
      `this string uses <span class="${tokenClass}">hyphens-and</span> <span class="${tokenClass}">some_underscores</span> <span class="${tokenClass}">even-mixed_together</span>`,
      'tokens can mix hyphens and underscores as much as they want'
    );
  });
});
