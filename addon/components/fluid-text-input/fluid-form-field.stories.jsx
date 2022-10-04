import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import Docs from './fluid-form-field.docs.mdx';

export default {
  title: 'Components/Inputs/Fluid Form Field',
  argTypes: {
    textLabel: {
      name: 'Fluid Text Input Label',
      control: { type: 'text', required: false },
      defaultValue: 'Fluid Text Input',
      table: {
        category: 'Fluid Text Input',
      },
    },
    textPlaceholder: {
      name: 'Fluid Text Input Placeholder',
      control: { type: 'text', required: false },
      defaultValue: 'Placeholder Text',
      table: {
        category: 'Fluid Text Input',
      },
    },
    dateLabel: {
      name: 'Fluid Date Input Label',
      control: { type: 'text', required: false },
      defaultValue: 'Fluid Date Input',
      table: {
        category: 'Fluid Date Input',
      },
    },
    date: {
      name: 'Date Value',
      control: { type: 'text', required: false },
      defaultValue: '02/02/2022',
      table: {
        category: 'Fluid Date Input',
      },
    },
    maxValue: {
      name: 'Date Max Value',
      control: { type: 'text', required: false },
      table: {
        category: 'Fluid Date Input',
      },
    },
    minValue: {
      name: 'Date Min Value',
      control: { type: 'text', required: false },
      table: {
        category: 'Fluid Date Input',
      },
    },
  },
  parameters: {
    docs: {
      page: Docs,
    },
    actions: {
      handles: ['click', '[data-test-fluid-date-input]'],
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <div class="flex flex-row space-x-4">
      <FluidFormField @label={{textLabel}} as |f|>
        <f.Text @placeholder={{textPlaceholder}} />
      </FluidFormField>

      <FluidFormField @label={{dateLabel}} as |f|>
        <f.Date
          data-test-fluid-date-input
          @value={{date}}
          @onSelect={{onSelect}}
          @maxDate={{maxDate}}
          @minDate={{minDate}}
        />
      </FluidFormField>
    </div>
  `,
  context: {
    ...args,
    onSelect: action(function (value) {
      this.set('date', new Date(value));
    }),
    date: new Date(args.date),
    maxDate: args.maxDate ? new Date(args.maxDate) : undefined,
    minDate: args.minDate ? new Date(args.minDate) : undefined,
  },
});

const TextTemplate = (args) => ({
  template: hbs`
    <FluidFormField
      @label={{label}}
      @isRequired={{isRequired}}
      @isOptional={{isOptional}}
      @helpText={{helpText}}
      @errorMessages={{errorMessages}}
      @warningMessages={{warningMessages}}
      @useSmallSize={{useSmallSize}}
    as |f|>
      <f.Text @placeholder='Enter Some Text' />
    </FluidFormField>
  `,
  context: args,
});
const DateTemplate = (args) => ({
  template: hbs`
    <FluidFormField @label={{dateLabel}} as |f|>
      <f.Date
        data-test-fluid-date-input
        @value={{date}}
        @onSelect={{onSelect}}
        @maxDate={{maxDate}}
        @minDate={{minDate}}
      />
    </FluidFormField>
  `,
  context: {
    ...args,
    onSelect: action(function (value) {
      this.set('date', new Date(value));
    }),
    date: new Date(args.date),
    maxDate: args.maxDate ? new Date(args.maxDate) : undefined,
    minDate: args.minDate ? new Date(args.minDate) : undefined,
  },
});

export const Default = Template.bind({});
Default.storyName = 'Fluid Form Field';
export const TextType = TextTemplate.bind({});
TextType.args = {
  label: 'name',
  isRequired: false,
}
TextType.storyName = 'type Text';
export const DateType = DateTemplate.bind({});
DateType.storyName = 'type Date';

export const IsRequired = TextTemplate.bind({});
IsRequired.storyName = '@isRequired';
IsRequired.args = {
  ...TextType.args,
  isRequired: true,
};
export const IsOptional = TextTemplate.bind({});
IsOptional.storyName = '@isOptional';
IsOptional.args = {
  ...TextType.args,
  isOptional: true,
};
export const HelpText = TextTemplate.bind({});
HelpText.storyName = '@helpText';
HelpText.args = {
  ...TextType.args,
  helpText: "Here's a hint at how to fill this out",
};
export const ErrorMessages = TextTemplate.bind({});
ErrorMessages.storyName = '@errorMessages';
ErrorMessages.args = {
  ...TextType.args,
  errorMessages: [
    'first error message',
    'second error message',
  ]
};
export const WarningMessages = TextTemplate.bind({});
WarningMessages.storyName = '@warningMessages';
WarningMessages.args = {
  ...TextType.args,
  warningMessages: [
    'first warning message',
    'second warning message',
  ]
};

export const SmallSize = TextTemplate.bind({});
SmallSize.storyName = '@useSmallSize';
SmallSize.args = {
  ...TextType.args,
  useSmallSize: true,
};
