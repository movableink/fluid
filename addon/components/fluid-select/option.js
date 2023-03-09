import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default class FluidSelectOption extends Component {
  tagName = '';

  @computed('option', 'labelPath')
  get optionLabel() {
    const path = get(this, 'labelPath');

    if (path) {
      return get(this, `option.${path}`);
    }

    return get(this, 'option');
  }

  @computed('multiple', 'dark')
  get selectedClass() {
    const dark = get(this, 'dark');
    const multiple = get(this, 'multiple');
    let selectedClass = ' fluid-select__option--selected';
    if (!multiple) {
      selectedClass = selectedClass.concat(' fluid-select__list-item--selected');
    }
    if (dark) {
      selectedClass = selectedClass.concat(' fluid-select__list-item--selected-dark');
    }

    return selectedClass;
  }

  @computed('multiple', 'selected.[]', 'option')
  get isSelected() {
    const multiple = get(this, 'multiple');
    const selected = get(this, 'selected');
    const option = get(this, 'option');

    if (multiple) {
      const equalityFn = get(this, 'equalityFn');
      if (equalityFn) return selected && equalityFn(selected, option);
      return selected && selected.includes(option);
    }

    return selected && selected === option;
  }
}
