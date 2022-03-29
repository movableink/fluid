import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import FluidDateInputDocs, { Arguments } from './fluid-date-input.docs.mdx'

export default {
  title: 'Components/Inputs/Fluid Date Input',
  argTypes: Arguments,
  parameters: {
    docs: {
      page: FluidDateInputDocs
    },
    actions: {
      handles: ['click', '[data-test-fluid-date-input]']
    }
  },
}

const Template = args => ({
  template: hbs`
    <FluidDateInput
      data-test-fluid-date-input
      @value={{value}}
      @onSelect={{onSelect}}
      @maxDate={{maxDate}}
      @minDate={{minDate}}
      @hasError={{hasError}}
      @hasWarning={{hasWarning}}
    />
  `,
  context: {
    ...args,
    onSelect: action(function (value) {
      this.set('value', new Date(value));
    }),
    value: new Date(args.value),
    maxDate: args.maxDate ? new Date(args.maxDate) : undefined,
    minDate: args.minDate ? new Date(args.minDate) : undefined,
  }
})

export const Default = Template.bind({});

export const WarningState = Template.bind({});
WarningState.args = {
  ...Default.args,
  hasError: false,
  hasWarning: true,
}
export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  hasError: true,
  hasWarning: false,
}