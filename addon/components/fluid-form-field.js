import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class FluidFormField extends Component {
  get id() {
    return this.args.id ?? guidFor(this);
  }

  get errorMessages() {
    return this.args.errorMessages ?? (this.args.errorMessage ? [this.args.errorMessage] : []);
  }

  get warningMessages() {
    return (
      this.args.warningMessages ?? (this.args.warningMessage ? [this.args.warningMessage] : [])
    );
  }

  get hasError() {
    return this.errorMessages.length > 0;
  }

  get hasWarning() {
    return this.warningMessages.length > 0;
  }
}
