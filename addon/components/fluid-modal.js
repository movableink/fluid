import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class FluidModalComponent extends Component {
  /** Used to provide an ID for the label element of the dialog */
  titleId = `${guidFor(this)}-title`;
}
