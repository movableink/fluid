import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { scheduleOnce } from '@ember/runloop';
import { getPopperForElement } from 'ember-popper-modifier';
import { TrackedSet } from 'tracked-maps-and-sets';

export default class FluidSplitButtonComponent extends Component {
  @tracked menuIsOpen = false;

  /**
   * Element ref for the pop-up menu
   *
   * Set by the `{{did-insert}}` modifier in the template
   *
   * @type {HTMLElement}
   */
  @tracked menuElementRef;

  /**
   * Keeps track of the active menu item
   *
   * Powers keyboard navigation (pseudo-focus) of the menu items.
   *
   * Defaults to `undefined` so that, by default, no menu items are psuedo-focused
   * This value will be set to `0` when the menu is opened through a keyboard event,
   * or when navigating items using the arrow keys.
   *
   * @type {HTMLElement|undefined}
   */
  @tracked activeMenuItemIndex = undefined;

  /**
   * Keeps track of all possible menu items
   *
   * @type {Set<import('./menu-item').default}>}
   */
  @tracked menuItems = new TrackedSet();

  /**
   * Unique ID for this component
   *
   * Used to generate unique IDs for accessibility in the template
   *
   * @type {string}
   */
  get guid() {
    return guidFor(this);
  }

  get lastMenuItemIndex() {
    return this.menuItems.size - 1;
  }

  /**
   * The menu item component that is currently pseudo-focused in the menu
   *
   * @type {import('./menu-item').default|undefined}
   */
  get activeMenuItem() {
    const menuItemArray = [...this.menuItems];

    if (typeof this.activeMenuItemIndex === 'undefined') {
      return undefined;
    }

    return menuItemArray[this.activeMenuItemIndex];
  }

  /**
   * Popper instance for the menu
   *
   * @type {import('@popperjs/core').Instance}
   */
  get popperInstance() {
    return getPopperForElement(this.menuElementRef);
  }

  updatePopperInstance() {
    this.popperInstance.update();
  }

  /**
   * @param {MouseEvent} event
   */
  @action toggleMenu(event) {
    if (this.menuIsOpen) {
      this.closeMenu(event);
    } else {
      this.openMenu(event);
    }
  }

  /**
   * @param {KeyboardEvent|MouseEvent|undefined} event
   */
  @action openMenu(event) {
    if (!this.menuIsOpen) {
      event?.preventDefault();

      this.menuIsOpen = true;

      // Automatically pseudo-select a menu item only if opened by keyboard
      if (event instanceof KeyboardEvent) {
        this.activeMenuItemIndex = 0;
      }
    }
  }

  /**
   * @param {KeyboardEvent|MouseEvent|FocusEvent|undefined} event
   */
  @action closeMenu(event) {
    if (this.menuIsOpen) {
      // If we are focusing a menu item within the menu by clicking on it, opt out of closing
      // the menu at this time. This method will be triggered again by the `click` handler on
      // the menu item itself
      if (
        event instanceof FocusEvent &&
        event.relatedTarget &&
        this.menuElementRef.contains(event.relatedTarget)
      ) {
        return;
      }

      event?.preventDefault();

      this.menuIsOpen = false;
      this.activeMenuItemIndex = undefined;
      this.menuItems = new TrackedSet();
    }
  }

  /**
   * Registers a menu items with the owning component
   *
   * Used to help with keyboard navigation
   *
   * @param {import('./menu-item').default} menuItemComponent
   */
  @action registerMenuItem(menuItemComponent) {
    if (!this.menuItems.has(menuItemComponent)) {
      menuItemComponent.index = this.menuItems.size;

      this.menuItems.add(menuItemComponent);
    }

    // Re-render the location of the Popper menu when menu items are inserted
    // Without this, the popper menu ends up in the wrong location because it is initially empty
    scheduleOnce('afterRender', this, 'updatePopperInstance');
  }

  /**
   * @param {KeyboardEvent} event
   */
  @action focusNextMenuItem(event) {
    // No-op if the menu is not open
    if (!this.menuIsOpen) {
      return;
    }

    event.preventDefault();

    if (typeof this.activeMenuItemIndex === 'undefined') {
      this.activeMenuItemIndex = 0;
    } else if (this.activeMenuItemIndex === this.lastMenuItemIndex) {
      this.activeMenuItemIndex = 0;
    } else {
      this.activeMenuItemIndex += 1;
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  @action focusPreviousMenuItem(event) {
    // No-op if the menu is not open
    if (!this.menuIsOpen) {
      return;
    }

    event.preventDefault();

    if (typeof this.activeMenuItemIndex === 'undefined') {
      this.activeMenuItem = this.lastMenuItemIndex;
    } else if (this.activeMenuItemIndex === 0) {
      this.activeMenuItemIndex = this.lastMenuItemIndex;
    } else {
      this.activeMenuItemIndex -= 1;
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  @action handleKeyboardTriggeredClick(event) {
    if (this.menuIsOpen && this.activeMenuItem) {
      event.preventDefault();

      this.activeMenuItem.elementRef.click();
    }
  }
}
