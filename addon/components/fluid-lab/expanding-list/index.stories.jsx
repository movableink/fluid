import { hbs } from 'ember-cli-htmlbars';

import ExpandingListDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Lab/Expanding List',
  parameters: {
    docs: {
      page: ExpandingListDocs,
    },
    actions: {
      handles: ['click', 'click .btn'],
    },
  },
};

const NestedToggleTemplate = (args) => ({
  template: hbs`
    <FluidLab::ExpandingList @expanded={{expanded}} @disabled={{disabled}} as |list|>
      <list.Header class='flex items-center'>
        <list.Toggle @label={{label}} />

        <h6>Ice Cream Flavors</h6>
      </list.Header>

      <list.Content>
        <ul class='pl-8'>
          <li>Chocolate</li>
          <li>Vanilla</li>
          <li>Mango</li>
        </ul>
      </list.Content>
    </FluidLab::ExpandingList>
  `,
  context: { ...args },
});

const SiblingToggleTemplate = (args) => ({
  template: hbs`
    <FluidLab::ExpandingList @expanded={{expanded}} as |list|>
      <list.Toggle @label={{label}} class='absolute' />

      <list.Header>
        <h6 class='pl-8'>Pizza Toppings</h6>
      </list.Header>

      <list.Content>
        <ul class='pl-8'>
          <li>Mushrooms</li>
          <li>Anchovies</li>
          <li>Ricotta</li>
        </ul>
      </list.Content>
    </FluidLab::ExpandingList>
  `,
  context: { ...args },
});

const MultipleTemplate = (args) => ({
  template: hbs`
    <FluidLab::ExpandingList @expanded={{false}} as |list|>
      <list.Header class='flex items-center'>
        <list.Toggle @label='Ice cream flavors' />

        <h6>Ice Cream Flavors</h6>
      </list.Header>

      <list.Content>
        <ul class='pl-8'>
          <li>Chocolate</li>
        </ul>
      </list.Content>
    </FluidLab::ExpandingList>

    <FluidLab::ExpandingList @expanded={{false}} as |list|>
      <list.Header class='flex items-center'>
        <list.Toggle />

        <h6>Pizza Toppings</h6>
      </list.Header>

      <list.Content>
        <ul class='pl-8'>
          <li>Mushrooms</li>
        </ul>
      </list.Content>
    </FluidLab::ExpandingList>
  `,
  context: { ...args },
});

export const Default = NestedToggleTemplate.bind({});
Default.args = {
  expanded: true,
  disabled: false,
  label: 'Ice cream flavors',
};

export const Collapsed = NestedToggleTemplate.bind({});
Collapsed.args = {
  expanded: false,
  disabled: false,
  label: 'Ice cream flavors',
};

export const Disabled = NestedToggleTemplate.bind({});
Disabled.args = {
  expanded: true,
  disabled: true,
  label: 'Ice cream flavors',
};

export const ToggleOutsideHeader = SiblingToggleTemplate.bind({});
ToggleOutsideHeader.args = {
  expanded: false,
  label: 'Pizza toppings',
};

export const LabelledAndUnlabelled = MultipleTemplate.bind({});
