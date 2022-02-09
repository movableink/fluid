import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FluidStepBreadcrumb extends Component {
  // object array of steps
  // {
  //   name: String
  //   completed: Boolean
  // }
  @tracked steps = [];
}
