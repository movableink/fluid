import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class FluidFormField extends Component {
  get id() {
    return this.args.id ?? guidFor(this);
  }

  get helpTextId() {
    return `${this.id}-help-text`;
  }

  get errorMessagesId() {
    return `${this.id}-error-messages`;
  }

  get warningMessagesId() {
    return `${this.id}-warning-messages`;
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

  // The ids of the descriptions rendered below the field, in the order they appear. Undefined when
  // there is nothing to describe, so `aria-describedby` never points at an element we didn't render.
  get describedBy() {
    const ids = [
      this.args.helpText ? this.helpTextId : null,
      this.hasError ? this.errorMessagesId : null,
      this.hasWarning ? this.warningMessagesId : null,
    ].filter(Boolean);

    return ids.length > 0 ? ids.join(' ') : undefined;
  }
}
