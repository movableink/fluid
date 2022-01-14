import Component from '@ember/component';
import { get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { computed as overridable } from 'ember-overridable-computed';

export default Component.extend({
  classNames: ['input-field'],
  classNameBindings: ['disabled:disabled'],
  type: 'text',
  disabled: false,
  placeholder: '',
  includeBlank: false,
  step: 1,

  monogram: null,
  label: null,
  sublabel: null,

  uniqueId: overridable(function () {
    return `${guidFor(this)}_input-field`;
  }),

  actions: {
    update(value) {
      const update = get(this, 'update');
      if (update) {
        update(value);
      }
    },
    onchange(value) {
      const onchange = get(this, 'onchange');
      if (onchange) {
        onchange(value);
      }
    },
  },
});
