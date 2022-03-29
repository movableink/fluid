import { hbs } from 'ember-cli-htmlbars';
import ButtonDocs from './docs.mdx';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/Fluid Button',
  argTypes: {
    type: {
      options: [
        'none',
        'primary',
        'destructive',
        'outline',
        'plain',
        'plain',
      ],
      control: { type: 'select' },
      table: {
        category: null,
      },
    },
    size: {
      options: ['none', 'xs', 'sm', 'lg', 'xl'],
      control: { type: 'radio'},
      table: {
        category: null
      }
    },
    tailwindClass: {
      control: { type: 'text' },
      table: {
        category: 'Additional Attributes'
      }
    },
    label: {
      control: { type: 'text'}
    },
    disabled: {
      control: { type: 'boolean' },
      table: {
        category: 'Additional Attributes'
      }
    }
  },
  parameters: {
    docs: {
      page: ButtonDocs,
    },
  },

};

const Template = (args) => ({
  template: hbs`
    <button
      class="fluid-button {{type}} {{size}} {{tailwindClass}}"
      disabled={{if disabled true}}
    >
      {{label}}
    </button>
  `,
  context: {
    ...args,
    type: args.type !== 'none' ? `type:${args.type}` : '',
    size: args.size !== 'none' ? `size:${args.size}` : 'size',
  },
})

export const Default = Template.bind({});
Default.args = {
  label: 'Basic',
  type: 'none',
  size: 'none'
}

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args,
  label: 'Primary',
  type: 'primary'
};

export const Destructive = Template.bind({});
Destructive.args = {
  ...Default.args,
  label: 'Destructive',
  type: 'destructive'
};

export const Outline = Template.bind({});
Outline.args = {
  ...Default.args,
  label: 'Outline',
  type: 'outline',
};

export const Plain = Template.bind({});
Plain.args = {
  ...Default.args,
  label: 'Plain',
  type: 'plain'
};

export const Customization = Template.bind({});
Customization.args = {
  ...Default.args,
  label: 'Customization',
  type: 'plain',
  tailwindClass: 'text-green-400 hover:text-green-600'
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  ...Default.args,
  label: 'Extra Small',
  size: 'xs'
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  label: 'Small',
  size: 'sm'
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  label: 'Large',
  size: 'lg'
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  ...Default.args,
  label: 'Extra Large',
  size: 'xl'
};
