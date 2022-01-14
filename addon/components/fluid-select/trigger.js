import TriggerComponent from 'ember-basic-dropdown/components/basic-dropdown-trigger';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default class FluidSelectTrigger extends TriggerComponent {
  get shouldShowBadge() {
    const { selected } = this.args;

    return isArray(selected) && !isEmpty(selected);
  }
}
