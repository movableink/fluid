import { hbs } from 'ember-cli-htmlbars';
import FluidDrawerDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Drawer',
  parameters: {
    docs: {
      page: FluidDrawerDocs,
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <button class='fluid-button type:primary' {{on 'click' (set this 'isOpen' true)}}>
      Title Drawer
    </button>

    {{#if this.isOpen}}
      <FluidDrawer @isOpen={{true}} @onClose={{set this 'isOpen' false}}>
        <:title>{{title}}</:title>

        <:content>
          {{content}}
        </:content>
      </FluidDrawer>
    {{/if}}
  `,
  context: {
    ...args,
  },
});

export const Default = Template.bind();
Default.args = {
  title: 'Drawer Title',
  content: 'Content!',
};
