import { hbs } from 'ember-cli-htmlbars';
import BadgeDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Badge',
  argTypes: {
    size: {
      options:['none', 'xl'],
      control: { type: 'radio' },
    },
    label: {
      control: { type: 'text' }
    },
    tailwindClasses: {
      control: { type: 'text' },
      table: {
        category: 'Additional Attributes'
      }
    }
  },
  parameters: {
    docs: {
      page: BadgeDocs
    }
  }
}

const Template = (args) => ({
  template: hbs`
    <div>
      <span class='fluid-badge {{size}} mr-2 {{tailwindClasses}}'>
        {{label}}
      </span>
    </div>
  `,
  context: {
    ...args,
    size: args.size !== 'none' ? `fluid-badge--${args.size}` : '',
  },
})


export const Default = Template.bind({});
Default.args = {
  size: 'none',
  label: '5'
}

export const XL = Template.bind({});
XL.args = {
  size: 'xl',
  label: '100'
}