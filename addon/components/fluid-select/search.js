import Component from '@ember/component';
import { action } from '@ember/object';

export default class FluidSelectSearch extends Component {
  tagName = '';

  /**
   * @param {HTMLInputElement} inputElement
   */
  @action autoFocusInput(inputElement) {
    inputElement.focus();
  }

  /**
   * @param {InputEvent} inputEvent
   */
  @action handleInput({ target: { value } }) {
    this.search(value);
  }
}
