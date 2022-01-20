import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { get, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import equalsProperty from '@movable/fluid/computed/equals-property';

export default Component.extend({
  tagName: 'label',
  classNames: ['radio-block'],
  classNameBindings: ['isSelected:selected'],
  attributeBindings: ['for'],
  value: null,
  header: null,
  update() {},

  for: alias('inputId'),

  isSelected: equalsProperty('option', 'value'),

  inputId: computed(function () {
    return `${guidFor(this)}_${get(this, 'option')}`;
  }),
});
