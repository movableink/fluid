import { hbs } from 'ember-cli-htmlbars';
import Docs from './fluid-text-input.docs.mdx';

const Arguments = {
  value: {
    control: {
      type: 'text',
      required: true
    },
    description: 'Value the input has',
    defaultValue: 'Some Value'
  },
  placeholder:{
    control: {
      type: 'text',
      required: false
    },
    description: 'helper text to display while input has no value',
    defaultValue: 'Fill Me In!'
  },
  disabled:{
    control: {
      type: 'boolean',
      required: false,
    },
    description: 'used to disable the input from user interaction',
    defaultValue: false,
  },
  hasError: {
    control: {
      type: 'boolean',
      required: false
    },
    description: 'used to enable error state for the input',
    defaultValue: false,
  },
  hasWarning: {
    control: {
      type: 'boolean',
      required: false
    },
    description: 'used to enable warning state for input',
    defaultValue: false,
  },
  useSmallSize:{
    control: {
      type: 'boolean',
      required: false
    },
    description: 'reduces the size of the input box',
    defaultValue: false,
  }
}

export default {
  title: 'Components/Inputs/Fluid Text Input',
  argTypes: Arguments,
  parameters: {
    docs: {
      page: Docs,
    }
  }
}

const Template = args => ({
  template: hbs`
    <FluidTextInput
      @value={{value}}
      @placeholder={{placeholder}}
      @disabled={{disabled}}
      @hasError={{hasError}}
      @hasWarning={{hasWarning}}
      @useSmallSize={{useSmallSize}}
    />
  `,
  context: args
});

export const Default = Template.bind({});
Default.args = {
  value: 'Some Value',
  placeholder: 'Fill Me In!'
}
Default.storyName = 'Fluid Text Input'