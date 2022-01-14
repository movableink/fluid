import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class FluidLabExpandingListContent extends Component {
  tagName = '';
  @tracked expanded = true;
}
