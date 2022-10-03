import { hbs } from 'ember-cli-htmlbars';
import Docs from './fluid-text-input.docs.mdx';

const Arguments = {
  value: {
    control: {
      type: 'text',
      required: true,
    },
    description: 'Value the input has',
    defaultValue: 'Some Value',
  },
  placeholder: {
    control: {
      type: 'text',
      required: false,
    },
    description: 'helper text to display while input has no value',
    defaultValue: 'Fill Me In!',
  },
  disabled: {
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
      required: false,
    },
    description: 'used to enable error state for the input',
    defaultValue: false,
  },
  hasWarning: {
    control: {
      type: 'boolean',
      required: false,
    },
    description: 'used to enable warning state for input',
    defaultValue: false,
  },
  useSmallSize: {
    control: {
      type: 'boolean',
      required: false,
    },
    description: 'reduces the size of the input box',
    defaultValue: false,
  },
};

export default {
  title: 'Components/Inputs/Fluid Text Input',
  argTypes: Arguments,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template = (args) => ({
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
  context: args,
});

const BlockTemplate = (args) => ({
  template: hbs`
    <FluidTextInput @value='Value' @placeholder='Fill me in!' as |ft|>
      <ft.input />
    </FluidTextInput>
  `,
  context: args,
});

const PairingsTemplate = (args) => ({
  template: hbs`
    <div class='flex items-center space-x-2 mb-2'>
      <FluidTextInput @value='Some Value' @placeholder='Fill Me In!' />
      <button class='fluid-button size:lg'>
        Click Me
      </button>
    </div>

    <div class='flex items-center space-x-2'>
      <FluidTextInput @value='Some Value' @placeholder='Fill Me In!' @useSmallSize={{true}} />
      <button class='fluid-button'>
        Click Me
      </button>
    </div>
  `,
  context: args,
});

const IconsTemplate = (args) => ({
  template: hbs`
    <div class='flex flex-col items-start space-y-2'>
      <FluidTextInput @value='Value' @placeholder='Fill me in!' as |ft|>
        <ft.icon @name='search' />
        <ft.input />
      </FluidTextInput>

      <FluidTextInput @useSmallSize={{true}} @value='Value' @placeholder='Fill me in!' as |ft|>
        <ft.icon @name='search' />
        <ft.input />
      </FluidTextInput>
    </div>
  `,
  context: args,
})

export const Default = Template.bind({});
Default.args = {
  value: 'Some Value',
  placeholder: 'Fill Me In!',
};
Default.storyName = 'Fluid Text Input';

export const Block = BlockTemplate.bind({});
Block.storyName = 'Fluid Text Input Block';

export const Pairings = PairingsTemplate.bind({});
Block.storyName = 'Fluid Text Input Pairings';

export const Icons = IconsTemplate.bind({});
Block.storyName = 'Fluid Text Input Icons';
