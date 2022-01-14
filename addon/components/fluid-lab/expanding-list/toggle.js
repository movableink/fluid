import Component from '@ember/component';
import { action } from '@ember/object';

export default class FluidLabExpandingListToggle extends Component {
  tagName = '';
  disabled = false;
  position = 'left';

  @action
  toggle() {
    this.ontoggle();
  }
}
