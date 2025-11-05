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
  argTypes: {
    small: {
      control: { type: 'boolean' },
      defaultValue: false,
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
      @small={{this.small}}
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

const SearchTemplate = (args) => ({
  template: hbs`
    <FluidSelect
      @searchQuery={{this.searchQuery}}
      @label={{this.label}}
      @selected={{this.selected}}
      @options={{this.options}}
      @select={{this.select}}
      @search={{this.search}}
      @renderInPlace={{true}}
    />
  `,
  context: {
    search: action(function (value) {
      return this.get('options').filter((option) => option.startsWith(value));
    }),
    select: action(function (selected) {
      this.set('searchQuery', '');
      this.set('selected', selected);
    }),
    ...args,
  },
});

const BlockTemplate = (args) => ({
  template: hbs`
    <FluidSelect
      @selected={{this.selected}}
      @options={{this.options}}
      @select={{onSelect}}
      @renderInPlace={{true}}
    as |select|>
      <select.trigger @label='Click Me!' />

      <select.popup>
        <select.list>
          {{#each options as |option|}}
            <select.option @option={{option}} />
          {{/each}}
        </select.list>
      </select.popup>
    </FluidSelect>
  `,
  context: {
    onSelect: action(function (value) {
      this.set('selected', value);
    }),
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {
  label: 'fruit',
  options: ['apple', 'banana', 'orange'],
  small: false,
};

export const Small = Template.bind({});
Small.args = {
  label: 'fruit',
  options: ['apple', 'banana', 'orange'],
  small: true,
};

export const GroupedOptions = Template.bind({});
GroupedOptions.args = {
  ...Default.args,
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

export const Search = SearchTemplate.bind({});
Search.args = {
  ...Default.args,
  label: 'fruit',
  options: ['apple', 'banana', 'orange', 'cantaloupe', 'durian'],
};

export const Block = BlockTemplate.bind({});
Block.args = {
  ...Default.args,
};
