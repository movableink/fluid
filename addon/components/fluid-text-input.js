import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FluidTextInput extends Component {
  /** @prop {HTMLInputElement} */
  inputElementRef;

  @action focusInputElement() {
    this.inputElementRef.focus();
  }
}
