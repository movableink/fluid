import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { A } from '@ember/array';

import FluidSelectDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Select',
  parameters: {
    docs: {
      page: FluidSelectDocs,
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <FluidSelect
      @label={{this.label}}
      @selected={{this.selected}}
      @options={{this.options}}
      @select={{onSelect}}
      @multiple={{this.multiple}}
      @renderInPlace={{true}}
    />
  `,
  context: {
    onSelect: action(function (value) {
      if (this.get('multiple')) {
        const selected = this.get('selected') || A([]);
        if (!selected.includes(value)) {
          selected.pushObject(value);
        } else {
          selected.removeObject(value);
        }
        this.set('selected', selected);
      } else {
        this.set('selected', value);
      }
    }),
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {
  label: 'fruit',
  options: ['apple', 'banana', 'orange'],
};

export const GroupedOptions = Template.bind({});
GroupedOptions.args = {
  label: 'Grouped Options',
  options: [
    { groupLabel: 'Group one', groupOptions: ['one', 'two', 'three'] },
    { groupOptions: ['four', 'five', 'six'] },
    { groupLabel: 'Group three', groupOptions: ['seven', 'eight', 'nine', 'ten'] },
  ],
};

// TODO:
// - [ ] Multiple Action do not work with multiple inside of react
export const Multiple = Template.bind({});
Multiple.args = {
  ...Default.args,
  multiple: true,
  label: 'Multiple Options',
};
