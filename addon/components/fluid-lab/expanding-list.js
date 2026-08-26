import Component from '@ember/component';
import { action } from '@ember/object';

/**
 * The `<FluidLab::ExpandingList />` is a contextual approach to an accordian component.
 *
 * It consists of 3 subcomponents, which are yielded out of the component in a hash:
 *  - list.Header
 *  - list.Content
 *  - list.Toggle
 *
 * Basic invocation:
 *
 * ```htmlbars
 * <FluidLab::ExpandingList as |list| >
 *   <list.Header>
 *     <h1>Ice Cream Flavors</h1>
 *     <list.Toggle @label="Ice cream flavors" />
 *   </list.Header>
 *
 *   <list.Content>
 *     <ul>
 *       <li>Chocolate</li>
 *       <li>Vanilla</li>
 *       <li>Mango</li>
 *     </ul>
 *   </list.Content>
 * </FluidLab::ExpandingList>
 * ```
 *
 * ## Accessibility
 *
 * `list.Toggle` is the keyboard-operable control — it renders a `<button>` carrying
 * `aria-expanded`. Always render one; `list.Header`'s own click handler is a mouse
 * convenience and is not reachable by keyboard, so a header without a toggle gives
 * keyboard and screen-reader users no way to expand the list.
 *
 * The chevron is decorative, so pass `@label` to name the button whenever a page has
 * more than one list. It falls back to a generic "Toggle section".
 *
 * For more advanced usage, the `expanded` property and `onChange`
 * actions are also yielded out of the component to be made available to
 * components rendered inside the `expanding-list`.
 *
 * These properties / actions can all be overridden. The following example has
 * the same functionality as the previous, but uses an `expanded` property
 * defined outside of the `expanding-list` component.
 *
 * ```htmlbars
 * <FluidLab::ExpandingList
       @expanded=expanded
 *     @onChange={{action newOnChange}}
       as |list| >
 *
 *   <list.Header>
 *     <h1>Pizza Toppings</h1>
 *     {{#if expanded}}
 *       <button onclick={{action list.onChange}}>Contract</button>
 *     {{else}}
 *       <button onclick={{action newOnChange}}>Expand</button>
 *     {{/if}}
 *   </list.Header>
 *
 *   <list.Content>
 *     <ul>
 *       <li>Mushrooms</li>
 *       <li>Anchovies</li>
 *       <li>Ricotta</li>
 *     </ul>
 *   </list.Content>
 *
 * </FluidLab::ExpandingList>
 * ```
 *
 * @public
 * @class ExpandingList
 * @extends Ember.Component
 */

export default class FluidLabExpandingList extends Component {
  tagName = '';

  /**
   * @property expanded
   * @type Boolen
   * @default true
   */
  expanded = true;

  /**
   * This property will disable expand regardless if toggle is passed in.
   * @property disabled
   * @type Boolen
   * @default true
   */
  disabled = false;

  /**
   * The `onChange` event is triggered when the `toggle` action is called
   *
   * If overridden, this event should toggle the `expanded` or call
   * an action with that effect.
   *
   * @event onChange
   * @optional
   */
  onChange() {
    this.toggleProperty('expanded', true);
  }

  @action
  toggle() {
    if (!this.disabled) {
      this.onChange();
    }
  }
}
