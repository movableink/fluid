import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';

import FluidRadioButtonDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Radio Button',
  parameters: {
    docs: {
      page: FluidRadioButtonDocs,
    }
  },
}

const Template = (args) => ({
  template: hbs`
    <FluidRadioButton
      @label='Option 1'
      @value='Option 1'
      @changed={{action (mut this.selectedValue)}}
      @groupValue={{this.selectedValue}}
    />

    <FluidRadioButton
      @label='Option 2'
      @value='Option 2'
      @changed={{action (mut this.selectedValue)}}
      @groupValue={{this.selectedValue}}
    />

    <dl class='mt-4'>
      <dt>Selected:</dt>
      <dd class='text-red-400'>{{this.selectedValue}}</dd>
    </dl>
  `,
  context: {
    ...args,
    changed: action(function (value) {}),
  }
});

export const Default = Template.bind({});
