import { hbs } from 'ember-cli-htmlbars';

import FluidModalDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Modal',
  parameters: {
    docs: {
      page: FluidModalDocs,
    },
    actions: {
      handles: ['click', 'click .btn'],
    },
  },
};

const BasicTemplate = (args) => ({
  template: hbs`
    <button class='fluid-button type:primary' {{on 'click' (set this 'basic' true)}}>
      Basic Modal
    </button>

    {{#if this.basic}}
      <FluidModal @onClose={{set this 'basic' false}}>
        <button>I am a bare modal</button>
      </FluidModal>
    {{/if}}
  `,
  context: { ...args },
});

const BlockTemplate = (args) => ({
  template: hbs`
    <button class='fluid-button type:primary' {{on 'click' (set this 'block' true)}}>
      Block Mode
    </button>

    {{#if this.block}}
      <FluidModal @onClose={{action (set this 'block' false)}}>
        <:header as |Title Icon|>
          <Icon @name='alert' @class='text-yellow-400 fill-current' />
          <Title>Header Content</Title>
        </:header>

        <:default>
          Modal Content
        </:default>

        <:footer>
          <button class='fluid-button size:lg' {{on 'click' (set this 'block' false)}}>
            Close
          </button>
        </:footer>
      </FluidModal>
    {{/if}}
  `,
  context: { ...args },
});

const HeaderAndFooterTemplate = (args) => ({
  template: hbs`
    <button class='fluid-button type:primary' {{on 'click' (set this 'header' true)}}>
      With Header & Footer
    </button>

    {{#if this.header}}
      <FluidModal @title='Header Content' @onClose={{action (set this 'header' false)}}>
        <:default>
          Modal Content
        </:default>

        <:footer>
          <button class='fluid-button size:lg' {{on 'click' (set this 'header' false)}}>
            Close
          </button>
        </:footer>
      </FluidModal>
    {{/if}}
  `,
  context: { ...args },
});

export const Basic = BasicTemplate.bind({});
export const Block = BlockTemplate.bind({});
export const HeaderAndFooter = HeaderAndFooterTemplate.bind({});
