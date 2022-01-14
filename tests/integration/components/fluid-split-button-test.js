import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import td from 'testdouble';
import percySnapshot from '@percy/ember';

module('Integration | Component | fluid-split-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a primary button and menu items', async function (assert) {
    this.primaryAction = td.function();
    this.menuItemAction = td.function();

    await render(hbs`
      <FluidSplitButton as |s|>
        <s.PrimaryButton data-test-primary-button {{on 'click' this.primaryAction}}>
          Primary Button
        </s.PrimaryButton>

        <s.MenuItem data-test-menu-item {{on 'click' this.menuItemAction}}>
          First Item
        </s.MenuItem>

        <s.MenuItem>
          Second Item
        </s.MenuItem>
      </FluidSplitButton>
    `);

    await click('[data-test-primary-button]');

    assert.verify(
      this.primaryAction(td.matchers.isA(MouseEvent)),
      'The primary button click event was fired'
    );

    await click('[data-test-split-button-menu-trigger]');

    await percySnapshot(assert);

    await click('[data-test-menu-item]');

    assert.verify(
      this.menuItemAction(td.matchers.isA(MouseEvent)),
      'The primary button click event was fired'
    );
  });

  test('relating the primary and menu-trigger buttons to the menu', async function (assert) {
    await render(hbs`
      <FluidSplitButton as |s|>
        <s.PrimaryButton data-test-primary-button>
          Primary Button
        </s.PrimaryButton>

        <s.MenuItem>
          First Item
        </s.MenuItem>
      </FluidSplitButton>
    `);

    assert
      .dom('[data-test-primary-button]')
      .hasAria('haspopup', 'menu', 'Primary button claims to own a menu');
    assert
      .dom('[data-test-primary-button]')
      .hasAria('expanded', 'false', 'Primary button claims menu is not expanded');

    assert
      .dom('[data-test-split-button-menu-trigger]')
      .hasAria('haspopup', 'menu', 'Trigger button claims to own a menu');
    assert
      .dom('[data-test-split-button-menu-trigger]')
      .hasAria('expanded', 'false', 'Trigger button claims menu is not expanded');

    await click('[data-test-split-button-menu-trigger]');
    const { id: menuId } = find('[data-test-split-button-menu]');

    assert
      .dom('[data-test-primary-button]')
      .hasAria('expanded', 'true', 'Primary button claims menu is expanded');
    assert
      .dom('[data-test-primary-button]')
      .hasAria('owns', menuId, 'Primary button owns correct menu element');

    assert
      .dom('[data-test-split-button-menu-trigger]')
      .hasAria('expanded', 'true', 'Trigger button claims menu is expanded');
    assert
      .dom('[data-test-split-button-menu-trigger]')
      .hasAria('owns', menuId, 'Trigger button owns correct menu element');
  });

  test('it can override the tag for a menu item', async function (assert) {
    await render(hbs`
      <FluidSplitButton as |s|>
        <s.PrimaryButton>
          Primary Button
        </s.PrimaryButton>

        <s.MenuItem data-test-menu-button>
          First Item
        </s.MenuItem>

        <s.MenuItem @tagName="a" data-test-menu-link>
          Second Item
        </s.MenuItem>
      </FluidSplitButton>
    `);

    await click('[data-test-split-button-menu-trigger]');

    assert
      .dom('[data-test-menu-button]')
      .hasTagName('button', 'Menu items default to being a `button`');
    assert
      .dom('[data-test-menu-button]')
      .hasAttribute('type', 'button', '`button` menu items have the `type` attribute');

    assert
      .dom('[data-test-menu-link]')
      .hasTagName('a', 'The `@tagName` attribute can change the tag');
    assert
      .dom('[data-test-menu-link]')
      .hasNoAttribute('type', 'Non-`button` menu items have no `type` attribute');
  });

  module('menu operation', function () {
    test('it dismisses the menu when clicking outside of it', async function (assert) {
      await render(hbs`
        <button data-test-element-outside></button>

        <FluidSplitButton as |s|>
          <s.PrimaryButton>
            Button
          </s.PrimaryButton>

          <s.MenuItem>
            First
          </s.MenuItem>
        </FluidSplitButton>
      `);

      await click('[data-test-split-button-menu-trigger]');

      assert.dom('[data-test-split-button-menu]').exists('The menu is open');

      await click('[data-test-element-outside]');

      assert.dom('[data-test-split-button-menu]').doesNotExist('The menu has been dismissed');
    });

    test('navigating the menu with the keyboard', async function (assert) {
      await render(hbs`
        <FluidSplitButton data-test-split-button="" as |s|>
          <s.PrimaryButton>
            Button
          </s.PrimaryButton>

          <s.MenuItem data-test-menu-item="first">
            First
          </s.MenuItem>

          <s.MenuItem data-test-menu-item="second">
            Second
          </s.MenuItem>
        </FluidSplitButton>
      `);

      await triggerKeyEvent('[data-test-split-button]', 'keydown', 'ArrowDown', { altKey: true });

      assert.dom('[data-test-split-button-menu]').exists('The menu is open');
      assert
        .dom('[data-test-menu-item="first"]')
        .hasClass('appearance:focused', 'The first menu item is immediately pseudo-focused');

      await triggerKeyEvent('[data-test-split-button]', 'keydown', 'ArrowDown');

      assert
        .dom('[data-test-menu-item="second"]')
        .hasClass('appearance:focused', 'Navigating down pseudo-focuses the second menu item');

      await triggerKeyEvent('[data-test-split-button]', 'keydown', 'ArrowDown');

      assert
        .dom('[data-test-menu-item="first"]')
        .hasClass(
          'appearance:focused',
          'Navigating down loops pseudo-focus back to the first menu item'
        );

      await triggerKeyEvent('[data-test-split-button]', 'keydown', 'ArrowUp');

      assert
        .dom('[data-test-menu-item="second"]')
        .hasClass(
          'appearance:focused',
          'Navigating up loops pseudo-focus back to the second menu item'
        );

      await triggerKeyEvent('[data-test-split-button]', 'keydown', 'ArrowUp');

      assert
        .dom('[data-test-menu-item="first"]')
        .hasClass('appearance:focused', 'Navigating up pseudo-focuses the first menu item');

      // Focus second item to ensure reset correctly takes place
      await triggerKeyEvent('[data-test-split-button]', 'keydown', 'ArrowUp');

      // Hide the menu
      await triggerKeyEvent('[data-test-split-button]', 'keydown', 'ArrowUp', { altKey: true });

      assert.dom('[data-test-split-button-menu]').doesNotExist('The menu is closed');

      // Open it again
      await triggerKeyEvent('[data-test-split-button]', 'keydown', 'ArrowDown', { altKey: true });

      assert
        .dom('[data-test-menu-item="first"]')
        .hasClass('appearance:focused', 'Pseudo-focus is returned to the first menu item');
    });

    test('selecting menu items with the keyboard', async function (assert) {
      this.primaryAction = td.function();
      this.menuItemAction = td.function();

      await render(hbs`
        <FluidSplitButton as |s|>
          <s.PrimaryButton data-test-primary-button {{on 'click' this.primaryAction}}>
            Button
          </s.PrimaryButton>

          <s.MenuItem data-test-menu-item {{on 'click' this.menuItemAction}}>
            First
          </s.MenuItem>
        </FluidSplitButton>
      `);

      await triggerKeyEvent('[data-test-primary-button]', 'keydown', 'ArrowDown', { altKey: true });
      await triggerKeyEvent('[data-test-primary-button]', 'keydown', 'Enter');

      await triggerKeyEvent('[data-test-primary-button]', 'keydown', 'ArrowDown', { altKey: true });
      await triggerKeyEvent('[data-test-primary-button]', 'keydown', ' ');

      assert.verify(
        this.menuItemAction(td.matchers.isA(MouseEvent)),
        { times: 2 },
        'Runs the `click` handler for the menu item button'
      );
    });

    test('selecting menu items with the mouse', async function (assert) {
      this.menuItemAction = td.function();

      await render(hbs`
        <FluidSplitButton as |s|>
          <s.PrimaryButton>
            Button
          </s.PrimaryButton>

          <s.MenuItem data-test-menu-item {{on 'click' this.menuItemAction}}>
            First
          </s.MenuItem>
        </FluidSplitButton>
      `);

      await click('[data-test-split-button-menu-trigger]');
      await click('[data-test-menu-item]');

      assert.verify(this.menuItemAction(td.matchers.isA(MouseEvent)));
    });
  });
});
