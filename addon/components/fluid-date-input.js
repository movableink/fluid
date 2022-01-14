import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { arg } from 'ember-arg-types';
import { func, instanceOf } from 'prop-types';

/**
 * @callback onSelect
 * @param {Date} selectedDate
 */

export default class FluidDateInputComponent extends Component {
  /**
   * The value to display in the date picker
   * @type {Date=}
   */
  @arg(instanceOf(Date)) value;

  /**
   * The maximum date that can be selected by the picker
   * @type {Date=}
   */
  @arg(instanceOf(Date)) maxDate;

  /**
   * The minimum date that can be selected by the user
   * @type {Date=}
   */
  @arg(instanceOf(Date)) minDate;

  /**
   * The function to invoke when a date is selected
   * @type {onSelect}
   */
  @arg(func.isRequired) onSelect;

  /**
   * The HTML element for the trigger
   *
   * Set by the `did-insert` modifier in the template
   *
   * @type {HTMLButtonElement}
   */
  buttonElement;

  /**
   * The HTML element for the calendar
   *
   * Set by the `did-insert` modifier in the template
   *
   * @type {HTMLDivElement}
   */
  calendarElement;

  /**
   * Whether or not the calendar is visible
   */
  @tracked calendarIsVisible = false;

  /**
   * The month that is visible in the calendar
   *
   * If empty, the calendar will center on the selected date
   *
   * @type {Date=}
   */
  @tracked calendarCenter;

  /**
   * Dismiss the calendar if the click target is outside of either the trigger button or calendar
   * @param {MouseEvent} event
   */
  @action dismissCalendarOnClickOutside({ target }) {
    if (
      this.calendarIsVisible &&
      !this.buttonElement.contains(target) &&
      !this.calendarElement.contains(target)
    ) {
      this.calendarIsVisible = false;
    }
  }

  /**
   * Dismiss the calendar when pressing `escape` with the trigger or calendar focused
   * @param {KeyboardEvent} event
   */
  @action dismissCalendarOnEscape(event) {
    if (this.calendarIsVisible && event.key.toLowerCase() === 'escape') {
      event.preventDefault();

      this.calendarIsVisible = false;
    }
  }
}
