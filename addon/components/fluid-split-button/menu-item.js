import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FluidSplitButtonMenuItemComponent extends Component {
  /**
   * The index into the list of menu items for this menu item
   *
   * @type {number}
   */
  @tracked index;

  get tagName() {
    return this.args.tagName ?? 'button';
  }

  get typeAttribute() {
    return this.tagName === 'button' ? 'button' : undefined;
  }

  /**
   * The element rendered by the menu item
   *
   * Set by the `did-insert` modifier in the template
   *
   * @type {HTMLElement}
   */
  elementRef;

  /**
   * Whether this menu item is the keyboard-selected one
   *
   * @type {boolean}
   */
  get isActive() {
    return this.index === this.args.activeIndex;
  }
}
