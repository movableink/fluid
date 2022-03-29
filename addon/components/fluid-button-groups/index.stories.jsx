import { hbs } from 'ember-cli-htmlbars';
import ButtonGroupDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Button/Groups',
  argTypes: {
    buttonGroup: {
      name: 'data',
    }
  },
  parameters: {
    docs: {
      page: ButtonGroupDocs,
    },
  },
}

const Template = (args) => ({
  template: hbs`
    <div class='fluid-button-group'>
      {{#each buttonGroup as |individual|}}
        <button class='fluid-button'>{{individual}}</button>
      {{/each}}
    </div>
  `,
  context: { ...args },
});

export const Default = Template.bind({});
Default.args = {
  buttonGroup: ['Left Button', 'Middle Button', 'Right Button'],
};