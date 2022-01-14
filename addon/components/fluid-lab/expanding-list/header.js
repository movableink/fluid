import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FluidLabExpandingListHeader extends Component {
  tagName = '';
  @tracked disabled = false;

  @action
  toggle() {
    this.ontoggle();
  }
}
